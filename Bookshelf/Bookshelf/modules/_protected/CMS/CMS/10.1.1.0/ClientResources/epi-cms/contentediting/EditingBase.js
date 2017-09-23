//>>built
define("epi-cms/contentediting/EditingBase",["dojo/_base/array","dojo/_base/connect","dojo/_base/declare","dojo/_base/Deferred","dojo/_base/event","dojo/_base/json","dojo/_base/lang","dojo/aspect","dojo/date/stamp","dojo/dom-attr","dojo/query","dojo/topic","dojo/when","epi/dependency","epi/datetime","epi/string","epi/shell/DestroyableByKey","epi-cms/contentediting/_View","epi-cms/contentediting/AutoSaveButton","epi-cms/contentediting/MappingManager","epi-cms/contentediting/RenderManager","epi-cms/contentediting/UpdateController","epi-cms/widget/overlay/overlayFactory","epi/i18n!epi/cms/nls/episerver.cms.contentediting"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13,_14,_15,_16,_17,res){return _3([_12,_11],{toolbar:null,editorFactory:null,activePropertyOnStartup:null,createOverlays:true,_renderManager:null,_mappingManager:null,_activeEditorWrapper:null,_autoSaveButton:null,_deferredReloadHandle:null,_eventHandlers:null,_isCreatingWrapper:null,constructor:function(){this.defaultQueryParameters={epieditmode:true};},postMixInProperties:function(){this.inherited(arguments);this.editorFactory=this.editorFactory||_e.resolve("epi.cms.contentediting.EditorFactory");this._mappingManager=new _14();this._eventHandlers=[];},postCreate:function(){this.inherited(arguments);this.subscribe("/epi/cms/action/disableundoredoactions",this._toggleUndoRedoActions);},destroy:function(){this._stopActiveEditorWrapper();if(this._renderManager){this._renderManager.destroy();}if(this._autoSaveButton){this._autoSaveButton.destroyRecursive();}this._mappingManager.clear();if(this.toolbar){this.toolbar=null;}this.overlay.destroyDescendants();this.inherited(arguments);},_setCommandEnabled:function(_18,_19){if(this.toolbar){this.toolbar.setItemProperty(_18,"disabled",!_19);}},onContentLinkSyncChange:function(){this.inherited(arguments);this._setButtonState();},onReloadRequired:function(){this.inherited(arguments);setTimeout(function(){this._renderManager.suspend();this._renderManager.clear();}.bind(this),0);},_setViewModelAttr:function(_1a){if(_1a===this.viewModel){return;}this.inherited(arguments);this.destroyByKey("viewModel");this.ownByKey("viewModel",_2.connect(this.viewModel,"onContentChange",this,this._stopActiveEditorWrapper));this.ownByKey("viewModel",_2.connect(this.viewModel,"onSetActiveProperty",this,this.onSetActiveProperty));this.ownByKey("viewModel",_2.connect(this.viewModel,"onPropertyReverted",this,this._onPropertyReverted));this.ownByKey("viewModel",_c.subscribe("/dnd/start",_7.hitch(this.viewModel,"beginOperation")));this.ownByKey("viewModel",_c.subscribe("/dnd/stop",_7.hitch(this,function(){if(this._activeEditorWrapper){return;}this.viewModel.endOperation();})));},_stopActiveEditorWrapper:function(){if(this._activeEditorWrapper!=null){_d(this._activeEditorWrapper.tryToStopEditing(),_7.hitch(this,function(){this._activeEditorWrapper=null;}));}},onSetActiveProperty:function(_1b){},onPreviewReady:function(_1c,doc,_1d){if(_1d||_1c!==this.viewModel){this.set("viewModel",_1c);this.setupEditMode(doc);}else{if(_1c){this.remapEditMode(doc);}}},_setButtonState:function(){this._setCommandEnabled("reverttopublished",this.viewModel&&!this.viewModel.contentData.isPendingPublish);},setupEditMode:function(doc){this.viewModel.reload().then(_7.hitch(this,function(){this._mappingManager.clear();if(this._renderManager){this._renderManager.destroy();}this._renderManager=new _15();if(this.toolbar&&!this._autoSaveButton){this._autoSaveButton=new _13({button:this.toolbar._getWidget("autosave")});this.own(_8.after(this._autoSaveButton,"onLayoutChanged",_7.hitch(this,function(){this.mainLayoutContainer.layout();})));}this._autoSaveButton.set("model",this.viewModel);var _1e=_7.hitch(this,function(){this._toggleUndoRedoActions(this.viewModel.hasUndoSteps,this.viewModel.hasRedoSteps);});this.viewModel.resetNotifications();this._destroyOverlay();this.ownByKey("viewModel",this.viewModel.watch("hasUndoSteps",_1e),this.viewModel.watch("hasRedoSteps",_1e));_1e();this.onReadySetupEditMode(doc);doc=null;this._setButtonState();this.onPrepareOverlayComplete();}));},remapEditMode:function(doc){this.viewModel.reload().then(_7.hitch(this,function(){this._renderManager.resume();if(doc){setTimeout(_7.hitch(this,function(){this._remapUpdateControllers(doc);this.onPrepareOverlayComplete();this._toggleUndoRedoActions(this.viewModel.hasUndoSteps,this.viewModel.hasRedoSteps);this._autoSaveButton.set("model",this.viewModel);}),1);}}));},_destroyOverlay:function(){this.destroyByKey("overlay");},onReadySetupEditMode:function(doc){this._createUpdateControllers(doc);},onSetupEditModeComplete:function(){if(this.activePropertyOnStartup){this.onSetActiveProperty(this.activePropertyOnStartup);this.activePropertyOnStartup=null;}},_getPropertyNodes:function(doc){var _1f=_b("[data-epi-property-name]",doc);var _20=_b("[data-epi-property-name] [data-epi-property-name]",doc);return _1.filter(_1f,function(_21){return _20.indexOf(_21)===-1;});},_getEditableNodes:function(doc){if(!doc||!this.viewModel.canChangeContent()){return [];}var _22=this._getPropertyNodes(doc);var _23=[];_1.forEach(_22,function(_24){var _25=_10.pascalToCamel(_a.get(_24,"data-epi-property-name"));var _26=this.viewModel.getPropertyMetaData(_25);if(!_26){return;}if(_26.settings&&_26.settings.readOnly){return;}var _27=_10.pascalToCamel(_26.getName());var _28=_a.get(_24,"data-epi-property-display-name");if(_28){_26=_7.delegate(_26,{displayName:_28});}if(_26!=null&&_26.showForEdit){var _29={cacheResults:true,rerenderOnCancel:false,propertyRenderSettings:_a.get(_24,"data-epi-property-rendersettings")||undefined,useMvc:_a.has(_24,"data-epi-use-mvc")?_a.get(_24,"data-epi-use-mvc").toLowerCase()==="true":false};_29=_7.mixin(_29,_26.additionalValues.renderSettings);var _2a=_a.has(_24,"data-epi-property-editorsettings")?_6.fromJson(_a.get(_24,"data-epi-property-editorsettings")):null;var _2b=_a.has(_24,"data-epi-property-overlaysettings")?_6.fromJson(_a.get(_24,"data-epi-property-overlaysettings")):null;_2b=_7.mixin(_2b,_26.overlaySettings);_23.push({node:_24,disabled:(_a.get(_24,"data-epi-disabled")==="true"),useOverlay:(_a.get(_24,"data-epi-useoverlay")==="true"),overlayZIndex:parseInt(_a.get(_24,"data-epi-overlay-z-index"),10)||0,property:{name:_27,contentLink:this.viewModel.contentLink,contentModel:this.viewModel.contentModel,type:_a.get(_24,"data-epi-property-type"),wrapperType:_a.get(_24,"data-epi-property-edittype"),editorParams:_2a,overlayParams:_2b,editorWidgetType:_a.get(_24,"data-epi-property-editor"),renderSettings:_29,rendererClass:(_a.get(_24,"data-epi-property-render")==="client")?"epi-cms/contentediting/ClientRenderer":_26.customEditorSettings.rendererClass,metadata:_26,propertyNodeName:_25}});}},this);_23.sort(function(a,b){if(a.overlayZIndex<b.overlayZIndex){return -1;}else{if(a.overlayZIndex>b.overlayZIndex){return 1;}else{return 0;}}});return _23;},_createUpdateControllers:function(doc){var _2c=this._createFullPageUpdateController(doc);if(_2c){this._connectUpdateControllerAndOverlayEvents(_2c,null);this._mappingManager.add({updateController:_2c});}var _2d=this._getEditableNodes(doc);_1.forEach(_2d,function(_2e){var _2f=_2e.property;var _30=_2e.node.innerHTML;var _31=this._createNodeUpdateController(_2e);_d(this._createNodeOverlay(_2e),_7.hitch(this,function(_32){this._connectUpdateControllerAndOverlayEvents(_31,_32);this._mappingManager.add({blockPropertyInfo:_2f,node:_2e.node,updateController:_31,overlayItem:_32});}));this._renderManager.cacheRender(_2f.name,_2f.renderSettings,this.viewModel.getProperty(_2f.name),_30);},this);},_createNodeOverlay:function(_33){var _34=new _4();if(!this.createOverlays){_34.resolve(null);return _34;}_d(_17.create(_33),_7.hitch(this,function(_35){this.overlay.addChild(_35);_34.resolve(_35);}));return _34;},_createNodeUpdateController:function(_36){var _37=_36.property;var _38=_37.metadata;var _39=new _16({displayName:_38.displayName,renderManager:this._renderManager,contentModel:_37.contentModel,contentLink:_37.contentLink,modelPropertyName:_37.name,nodePropertyName:_37.propertyNodeName,renderSettings:_37.renderSettings,rendererClass:_37.rendererClass,displayNode:_36.node});return _39;},_createFullPageUpdateController:function(doc){var _3a=[];if(doc){var _3b=_b("input[data-epi-full-refresh-property-names][type='hidden']",doc);_1.forEach(_3b,function(tag){_1.forEach(_a.get(tag,"data-epi-full-refresh-property-names").split(","),function(_3c){if(!_1.some(_3a,function(p){return p===_3c;})){_3a.push(_10.pascalToCamel(_3c));}});});}_1.forEach(this.viewModel.metadata.properties,function(_3d){if(_3d.additionalValues["reloadOnChange"]===true){_3a.push(_10.pascalToCamel(_3d.name));}});if(!_3a.length){return null;}var _3e=new _16({displayName:"",renderManager:this._renderManager,contentModel:this.viewModel.contentModel,modelPropertyName:_3a,renderSettings:{isFullReload:true}});return _3e;},_remapUpdateControllers:function(doc){var _3f=this._getEditableNodes(doc);var _40=this._mappingManager.remap(_3f);_1.forEach(_40,function(_41){var _42=_41.property;var _43=this._createNodeUpdateController(_41);var _44=this._mappingManager.find(function(m){return (!m.updateController)&&(m.propertyName.indexOf(_42.name)===0);});_d(this._createNodeOverlay(_41),_7.hitch(this,function(_45){this._connectUpdateControllerAndOverlayEvents(_43,_45);if(_44&&_44.length){this._mappingManager.update(_44[0],{updateController:_43,overlayItem:_45,node:_41.node,wrapper:null});}else{this._mappingManager.add({blockPropertyInfo:_42,node:_41.node,updateController:_43,overlayItem:_45});}}));this._renderManager.cacheRender(_42.name,_42.renderSettings,this.viewModel.getProperty(_42.name),_41.node.innerHTML);},this);var _46=this._createFullPageUpdateController(doc);if(_46){this._connectUpdateControllerAndOverlayEvents(_46,null);this._mappingManager.add({updateController:_46});}},_connectUpdateControllerAndOverlayEvents:function(_47,_48){if(_47){this.ownByKey("overlay",_8.after(_47,"onReloadRequired",_7.hitch(this,this._onBlockReloadRequired),true),_8.after(_47,"onRender",_7.hitch(this,this._onBlockRender),true));}if(_48){this.ownByKey("overlay",_8.after(_48,"onClick",_7.hitch(this,this._onOverlayItemClick),true),_8.after(_48,"onValueChange",_7.hitch(this,function(_49){this._onOverlayValueChange(_48,_49);}),true));}},_getEditor:function(_4a){var _4b=this._mappingManager.findOne("overlayItem",_4a);return (_4b.wrapper&&_4b.wrapper.editorWidget)?_4b.wrapper.editorWidget:null;},onEditorWrapperCreated:function(_4c){},_onOverlayItemClick:function(_4d){if(this._isCreatingWrapper){return;}this._isCreatingWrapper=true;var _4e=this._mappingManager.findOne("overlayItem",_4d);var _4f=_4e.blockPropertyInfo;var val=this.viewModel.getProperty(_4e.propertyName);var _50=_7.clone(val,true);var _51;var _52=_7.hitch(this,function(_53){_4e.wrapper=_53;this._activeEditorWrapper=_53;_c.publish("/epi/layout/pinnable/propertyEditor/show",null);_1.forEach(this._mappingManager.find(),function(m){if(m.overlayItem){m.overlayItem.set("active",false);}});_4e.overlayItem.set("active",true);var _54={value:_50,parent:_53};_d(_53.startEdit(_54)).always(_7.hitch(this,function(){this._isCreatingWrapper=null;}));this.overlay.set("readOnly",_53.isOverlayDisabled);this.viewModel.set("disableUndo",_53.isUndoDisabled);});if(_4e.wrapper){_51=_4e.wrapper;if(_51&&_51.editorWidget&&!_51.editorWidget.overlayItem){_51.editorWidget.overlayItem=_4d;}_51.set("blockDisplayNode",_4e.node);_52(_51);}else{_d(this._createEditorWrapper(_4f,_4d,_4e.node,_50),_7.hitch(this,function(_55){_52(_55);this.onEditorWrapperCreated(_55);}));}},_createEditorWrapper:function(_56,_57,_58,_59){var def=new _4(),_5a={overlayItem:_57};_d(this.editorFactory.createEditor(_56,_58,_59,_5a),_7.hitch(this,function(_5b){this.ownByKey("overlay",_8.after(_5b,"onValueChange",_7.hitch(this,this._onWrapperValueChange),true),_8.after(_5b,"onCancel",_7.hitch(this,this._onWrapperCancel),true),_8.after(_5b,"onStopEdit",_7.hitch(this,this._onWrapperStopEdit),true));def.resolve(_5b);}),def.reject);return def;},_onBlockReloadRequired:function(_5c){var _5d=function(){if(this._activeEditorWrapper&&this._activeEditorWrapper.hasInlineEditor){return;}if(this._deferredReloadHandle){this._deferredReloadHandle.remove();this._deferredReloadHandle=null;}this._toggleUndoRedoActions(false,false);this.onReloadRequired();}.bind(this);if(this.viewModel.isSaved){_5d();}else{if(!this._deferredReloadHandle){this.own(this._deferredReloadHandle=_8.after(this.viewModel,"onPropertySaved",_5d,true));}}},_onBlockRender:function(_5e){var _5f=this._mappingManager.findOne("updateController",_5e);if(_5f&&_5f.overlayItem){_5f.overlayItem.refresh();}},_saveEditorChanges:function(_60,_61){var _62=this._getEditor(_60);if(_62&&!_62.overlayItem){_62.overlayItem=_60;}if(_62&&_62.saveChanges){_62.saveChanges(_62,_61);}},_onOverlayValueChange:function(_63,_64){this._saveEditorChanges(_63,_64.value);this.viewModel.setProperty(_64.propertyName,_64.value);},_onWrapperValueChange:function(_65,_66,_67){var _68=this._mappingManager.findOne("wrapper",_65),_69=_68.propertyName;if(_68.overlayItem){_68.overlayItem.set("updated",true);}this.viewModel.beginOperation();this.viewModel.setProperty(_69,_66,_67);},_onWrapperStopEdit:function(_6a,_6b,_6c,_6d){var _6e=this._mappingManager.findOne("wrapper",_6a);this.viewModel.endOperation();if(_6e.overlayItem){_6e.overlayItem.set("active",false);}this._activeEditorWrapper=null;this.overlay.set("readOnly",false);this.viewModel.set("disableUndo",false);},_onWrapperCancel:function(_6f,_70){var _71=this._mappingManager.findOne("wrapper",_6f),_72=_71.updateController;this.viewModel.abortOperation();if(_72&&_72.renderSettings&&_72.renderSettings.rerenderOnCancel){_72.render();}if(_71.overlayItem){_71.overlayItem.set("active",false);}this._activeEditorWrapper=null;this.overlay.set("readOnly",false);this.viewModel.set("disableUndo",false);},_onPropertyReverted:function(_73,_74){this._mappingManager.find("propertyName",_73).forEach(function(_75){var _76=_75.wrapper,_77;if(_76){_77=_76.get("editing");_76.set("editing",false);_76.set("value",_74);_76.set("editing",_77);}});},_toggleUndoRedoActions:function(_78,_79){this._setCommandEnabled("undo",!!_78);this._setCommandEnabled("redo",!!_79);}});});