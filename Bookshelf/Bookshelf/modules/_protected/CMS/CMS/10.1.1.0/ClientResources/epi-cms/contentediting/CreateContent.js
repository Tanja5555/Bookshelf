//>>built
require({cache:{"url:epi-cms/contentediting/templates/CreateContent.html":"<div class=\"epi-createContent\">\n    <div data-dojo-attach-point=\"layoutContainer\" data-dojo-type=\"dijit/layout/BorderContainer\" data-dojo-props=\"gutters: false, livesplitters: false\">\n        <div class=\"epi-static-node\" data-dojo-attach-point=\"topPanel\" data-dojo-type=\"dijit/layout/ContentPane\" data-dojo-props=\"region:'top'\">\n            <div data-dojo-attach-point=\"headingPanel\">\n                <h1><span data-dojo-attach-point=\"headingTextNode\"></span>:&nbsp;<span data-dojo-attach-point=\"contentTypeNameNode\"></span></h1>\n            </div>\n            <div data-dojo-attach-point=\"toolbar\" class=\"epi-localToolbar epi-viewHeaderContainer\" data-dojo-type=\"epi/shell/widget/ToolbarSet\" data-dojo-props=\"region:'top'\"></div>\n            <div data-dojo-attach-point=\"namePanel\">\n                <label>${sharedResources.header.name}</label>\n                <input data-dojo-attach-point=\"nameTextBox\"\n                       data-dojo-type=\"dijit/form/ValidationTextBox\"\n                       data-dojo-props=\"selectOnClick: true, required: true, trim:true\"\n                       data-dojo-attach-event=\"onChange: _onContentNameChange, onBlur: _onBlurVerifyContent\"\n                       maxlength=\"255\" />\n                <span data-dojo-attach-point=\"contentNameHelpTextNode\" class=\"dijitInline dgrid-no-data\"></span>\n            </div>\n        </div>\n        <div class=\"epi-newContentContainer epi-animation-node\" data-dojo-attach-point=\"stackContainer\" data-dojo-type=\"dijit/layout/StackContainer\" data-dojo-props=\"region: 'center'\">\n            <div data-dojo-attach-point=\"contentTypeList\" data-dojo-type=\"epi-cms/widget/ContentTypeList\" data-dojo-attach-event=\"onContentTypeSelected: _onContentTypeSelected\">\n                <div data-dojo-attach-point='subHeadingPanel' class=\"push-padding--left\">\n                    <h1 data-dojo-attach-point=\"subHeadingTextNode\"></h1>\n                    <p data-dojo-attach-point=\"subHeadingDescNode\"></p>\n                </div>\n            </div>\n            <div data-dojo-attach-point=\"propertiesForm\" data-dojo-type=\"epi-cms/widget/PropertiesForm\" data-dojo-attach-event=\"onPropertyValidStateChange: _onPropertyValidStateChange\">\n            </div>\n        </div>\n    </div>\n</div>"}});define("epi-cms/contentediting/CreateContent",["dojo/_base/declare","dojo/_base/lang","dojo/aspect","dojo/dom-style","dojo/dom-class","dojo/topic","dojo/when","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/form/ValidationTextBox","dijit/layout/_LayoutWidget","dijit/layout/BorderContainer","dijit/layout/ContentPane","dijit/layout/StackContainer","epi/dependency","epi/shell/widget/_ModelBindingMixin","epi/shell/widget/dialog/Dialog","epi-cms/contentediting/NewContentNameInputDialog","epi-cms/contentediting/viewmodel/CreateContentViewModel","epi-cms/widget/ContentTypeList","epi-cms/widget/PropertiesForm","epi-cms/widget/Breadcrumb","epi-cms/widget/BreadcrumbCurrentItem","dojo/text!./templates/CreateContent.html","epi/i18n!epi/nls/episerver.shared"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13,_14,_15,_16,_17,_18,_19){return _1([_b,_8,_9,_10],{templateString:_18,sharedResources:_19,modelType:_13,_contextService:null,_beingSuspended:null,modelBindingMap:{parent:["parent"],requestedType:["requestedType"],metadata:["metadata"],isContentTypeSelected:["isContentTypeSelected"],headingText:["headingText"],createAsLocalAssetHelpText:["createAsLocalAssetHelpText"],contentName:["contentName"],contentNameHelpText:["contentNameHelpText"],wizardStep:["wizardStep"],showAllProperties:["showAllProperties"],createAsLocalAsset:["createAsLocalAsset"],seamlessTopPanel:["seamlessTopPanel"],namePanelIsVisible:["namePanelIsVisible"],headingPanelIsVisible:["headingPanelIsVisible"],saveButtonIsVisible:["saveButtonIsVisible"],saveButtonDisabled:["saveButtonDisabled"],showCurrentNodeOnBreadcrumb:["showCurrentNodeOnBreadcrumb"],notificationContext:["notificationContext"],actualParentLink:["actualParentLink"],propertyFilter:["propertyFilter"],allowedTypes:["allowedTypes"],restrictedTypes:["restrictedTypes"]},_setParentAttr:function(_1a){if(_1a){this.toolbar.setItemProperty("currentcontent","currentItemInfo",{name:_1a.name,dataType:_1a.typeIdentifier});}},_setPropertyFilterAttr:function(_1b){this._set("propertyFilter",_1b);this.propertiesForm.propertyFilter=_1b;},_setAllowedTypesAttr:function(_1c){this.contentTypeList.set("allowedTypes",_1c);},_setRestrictedTypesAttr:function(_1d){this.contentTypeList.set("restrictedTypes",_1d);},_setRequestedTypeAttr:function(_1e){this.contentTypeList.set("requestedType",_1e);},_setMetadataAttr:function(_1f){if(_1f){this.propertiesForm.set("metadata",_1f);}},_setHeadingTextAttr:function(_20){this.headingTextNode.textContent=this.subHeadingTextNode.textContent=_20;},_setContentNameHelpTextAttr:{node:"contentNameHelpTextNode",type:"innerText"},_setCreateAsLocalAssetAttr:function(_21){this._set("createAsLocalAsset",_21);var _22=this.model.get("parent");if(_22){this.toolbar.setItemProperty("breadcrumbs","contentLink",_21?_22.assetsFolderLink:_22.contentLink);}this.contentTypeList.set("localAsset",_21);},_setCreateAsLocalAssetHelpTextAttr:{node:"subHeadingDescNode",type:"innerHTML"},_setContentNameAttr:function(_23){this.nameTextBox.set("value",_23);},_setWizardStepAttr:function(_24){var _25;var _26;if(_24<0||_24===this.wizardStep){return;}_25=this.stackContainer.getChildren();if(_24<_25.length){_26=_25[_24];this.stackContainer.selectChild(_26);this._set("wizardStep",_24);}},_setShowAllPropertiesAttr:function(_27){this._set("showAllProperties",_27);this.propertiesForm.set("showAllProperties",_27);},_setSeamlessTopPanelAttr:function(_28){_5.toggle(this.topPanel.domNode,"epi-listingTopContainer",_28);},_setNamePanelIsVisibleAttr:function(_29){_4.set(this.namePanel,"display",_29?"":"none");},_setHeadingPanelIsVisibleAttr:function(_2a){_4.set(this.headingPanel,"display",_2a?"":"none");_4.set(this.subHeadingPanel,"display",_2a?"none":"");},_setSaveButtonIsVisibleAttr:function(_2b){this.toolbar.setItemVisibility("saveButton",_2b);},_setSaveButtonDisabledAttr:function(_2c){this.toolbar.setItemProperty("saveButton","disabled",_2c);},_setShowCurrentNodeOnBreadcrumbAttr:function(_2d){this.toolbar.setItemProperty("breadcrumbs","showCurrentNode",_2d);this.toolbar.setItemVisibility("currentcontent",!_2d);},_setNotificationContextAttr:function(_2e){this.toolbar.setItemProperty("notificationCenter","notificationContext",_2e);},_setActualParentLinkAttr:function(_2f){this.contentTypeList.set("parentLink",_2f);},_setContentTypeNameAttr:{type:"innerHTML",node:"contentTypeNameNode"},postMixInProperties:function(){this.inherited(arguments);this.model=new this.modelType();this.own(this.model.on("saveSuccess",_2.hitch(this,this._onSaveSuccess)));this.own(this.model.on("saveError",_2.hitch(this,this._onSaveError)));this.own(this.model.on("invalidContentName",_2.hitch(this,this._onInvalidContentName)));},postCreate:function(){this.inherited(arguments);this._contextService=this._contextService||_f.resolve("epi.shell.ContextService");this._setupToolbar();},layout:function(){if(this._started){this.layoutContainer.resize(this._containerContentBox||this._contentBox);_5.add(this.stackContainer.domNode,"epi-animation-node-reset");}},updateView:function(_30){if(_30&&((_30.parent&&_30.requestedType)||(_30.contentData&&_30.languageBranch))){this.view=_30.view;this._setCreateMode();this._beingSuspended=false;this.set("contentTypeName","");_7(this.model.update(_30),_2.hitch(this,function(){this.layout();if(this.nameTextBox){this.nameTextBox.focus();this.nameTextBox.textbox.select();}}),function(err){});}},_onSaveSuccess:function(_31){this._clearCreateMode();this._beingSuspended=true;if(_31.changeContext){this._changeContext(_31.newContentLink);}else{this._backToCurrentContext();}if(this.createAsLocalAsset===true){_6.publish("/epi/cms/action/createlocalasset");}},_onSaveError:function(){this._clearCreateMode();_6.publish("/epi/cms/action/showerror");},_onInvalidContentName:function(_32){var _33=new _12({defaultContentName:_32});var _34=new _11({defaultActionsVisible:false,autofocus:true,content:_33,title:_33.title});this.own(_3.after(_34,"onExecute",_2.hitch(this,function(){var _35=_33.get("value");if(_35===_32){this.model.set("ignoreDefaultNameWarning",true);}this.model.set("contentName",_35);this.model.save();}),true),_3.after(_34,"onCancel",_2.hitch(this,function(){if(this.contentTypeList.shouldSkipContentTypeSelection){this._cancel();}else{this.model.set("isContentTypeSelected",false);}}),true));_34.show();},_onContentTypeSelected:function(_36){if(!this.isContentTypeSelected){this.model.set("contentTypeId",_36.id);this.set("contentTypeName",_36.localizedName);}},_onPropertyValidStateChange:function(_37,_38){if(_38){this.model.addInvalidProperty(_37,_38);}else{this.model.removeInvalidProperty(_37);}},_onBlurVerifyContent:function(){if(this.nameTextBox.get("value")===""){this.nameTextBox.set("value",this.model.defaultName);}},_onContentNameChange:function(_39){this.model.set("contentName",_39);},_onSave:function(){if(this._beingSuspended){return;}this.propertiesForm.validate();this.model.set("properties",this.propertiesForm.get("value"));this.model.save();},_onCancel:function(){this._cancel();},_cancel:function(){this._clearCreateMode();this.model.cancel();this._backToCurrentContext();},_setupToolbar:function(){var _3a=[{name:"leading",type:"toolbargroup",settings:{region:"leading"}},{name:"trailing",type:"toolbargroup",settings:{region:"trailing"}}];var _3b=[{parent:"leading",name:"breadcrumbs",widgetType:"epi-cms/widget/Breadcrumb",settings:{showCurrentNode:false}},{parent:"leading",name:"currentcontent",widgetType:"epi-cms/widget/BreadcrumbCurrentItem"},{parent:"trailing",name:"notificationCenter",widgetType:"epi-cms/widget/NotificationStatusBar"},{parent:"trailing",name:"saveButton",title:_19.action.create,label:_19.action.create,type:"button",action:_2.hitch(this,this._onSave),settings:{"class":"epi-button--bold epi-primary"}},{parent:"trailing",name:"cancelButton",title:_19.action.cancel,label:_19.action.cancel,type:"button",action:_2.hitch(this,this._onCancel),settings:{"class":"epi-button--bold"}}];_7(this.toolbar.add(_3a),_2.hitch(this,function(){this.toolbar.add(_3b);}));},_changeContext:function(_3c){_6.publish("/epi/shell/context/request",{uri:"epi.cms.contentdata:///"+_3c},{sender:this,viewName:this.view,forceContextChange:true,forceReload:true});},_backToCurrentContext:function(){_6.publish("/epi/shell/action/changeview/back");},_setCreateMode:function(){_2.mixin(this._contextService.currentContext,{currentMode:"create"});_6.publish("/epi/cms/action/togglecreatemode",true);},_clearCreateMode:function(){_5.remove(this.stackContainer.domNode,"epi-animation-node-reset");_2.mixin(this._contextService.currentContext,{currentMode:undefined});_6.publish("/epi/cms/action/togglecreatemode",false);}});});