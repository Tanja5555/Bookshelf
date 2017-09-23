//>>built
require({cache:{"url:epi-cms/widget/templates/Trash.html":"<div class=\"epi-trash\">\n    <div class=\"epi-listingTopContainer\">\n        <h1 class=\"dijitInline\">${resources.heading}</h1>\n        <div class=\"epi-mediumButton epi-button--bold epi-emptyCommand\" data-dojo-attach-point=\"emptyTrashMenu\" data-dojo-type=\"epi-cms/widget/EmptyTrashMenu\"\n            data-dojo-props=\"title: '${resources.emptytrash.tooltip}'\"></div>\n    </div>\n    <div data-dojo-attach-point=\"stackContainer\">\n        <div data-dojo-type=\"dijit/layout/TabContainer\" data-dojo-attach-point=\"tabContainer\" data-dojo-props=\"doLayout:false, useMenu:true, useSlider:false\"> <!-- doLayout=\"false\" for flexible height -->\n        </div>\n    </div>\n</div>\n"}});define("epi-cms/widget/Trash",["dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/dom-class","dojo/dom-construct","dojo/Evented","dojo/_base/Deferred","dijit/_Widget","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/layout/TabContainer","dijit/layout/ContentPane","dijit/registry","epi/shell/widget/_ModelBindingMixin","epi/shell/widget/dialog/Alert","epi/shell/command/withConfirmation","epi-cms/widget/TrashItemList","epi-cms/widget/EmptyTrashMenu","epi-cms/widget/TrashViewModelConfirmation","epi-cms/widget/command/EmptyTrash","epi-cms/widget/command/RestoreContent","epi/i18n!epi/cms/nls/episerver.cms.components.trash","dojo/text!./templates/Trash.html"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13,_14,_15,_16,_17){return _2([_8,_9,_a,_e,_6],{resources:_16,templateString:_17,_restoreContentCommand:null,typeIdentifiers:null,modelBindingMap:{contentStore:["store"],queryOptions:["queryOptions"],actionResponse:["actionResponse"],trashes:["trashes"]},postCreate:function(){this.inherited(arguments);this.tabContainer.watch("selectedChildWidget",_3.hitch(this,function(_18,_19,_1a){if(_1a.itemListId){var _1b=_d.byId(_1a.itemListId);_1b.bindUserSelector(_1a.trash.deletedByUsers);}this.model.set("currentTrash",_1a.trash);}));this._restoreContentCommand=new _15({model:this.model});this.watch("model",_3.hitch(this,function(){this.model=_13(this.model);this._restoreContentCommand.set("model",this.model);}));this.on("itemClick",this._onItemClick);this.on("deletedByChange",this._onDeletedByChange);},_setTrashesAttr:function(_1c){this.tabContainer.destroyDescendants();var _1d=[];_1.forEach(_1c,function(_1e){if(_1e&&_1e.active){this._addTrash(_1e);var _1f=new _14({hasDeleteAccess:_1e.hasDeleteAccess,label:_1e.name,tooltip:_1e.name,trashId:_1e.wasteBasketLink,model:this.model});_1d.push(_10(_1f,null,{title:_16.emptytrash.title,description:this.model.getEmptyTrashConfirmMessage(_1e.name),onShow:_3.hitch(this,function(){var _20=this.tabContainer.selectedChildWidget.getChildren()[0];_20.clearSelection();})}));}},this);this.emptyTrashMenu.set("commands",_1d);if(_1c&&_1c.length===1){_4.add(this.tabContainer.domNode,"hide-tablist");}this.tabContainer.startup();this.tabContainer.layout();},_addTrash:function(_21){var _22=null;if(_21.active){_21.isRequireLoad=true;var _23=new _c({title:_21.name,trash:_21});this.tabContainer.addChild(_23);if(this._isSelected(_21)){_22=_23;}}if(_22){this.tabContainer.selectChild(_22);}},_isSelected:function(_24){var _25=false;_1.some(_24.typeIdentifiers,_3.hitch(this,function(_26){return _1.some(this.typeIdentifiers,function(_27){if(_26===_27){_25=true;return false;}});}));return _25;},_setQueryOptionsAttr:function(_28){if(_28){var _29=this.tabContainer.selectedChildWidget;if(_29){var _2a=this.get("store"),_2b=null;if(_29.itemListId){_2b=_d.byId(_29.itemListId);_2b.set("queryOptions",_28);}else{_2b=new _11({queryOptions:_28,store:_2a,model:this.model});_2b.on("itemClick",_3.hitch(this,function(row){this.emit("itemClick",row);}));_2b.on("deletedByChange",_3.hitch(this,function(_2c){this.emit("deletedByChange",_2c);}));_2b.on("searchBoxChange",_3.hitch(this,this._onSearchBoxChange));_29.set("content",_2b);_29.itemListId=_2b.id;}_2b.updateRemovedBy(_28);}}},_setActionResponseAttr:function(_2d){if(!_2d){return;}this._showNotificationMessage(_2d);},_showNotificationMessage:function(_2e){new _f({description:_2e?_2e:""}).show();},_onItemClick:function(row){if(row&&row.data&&this.model.get("currentTrash")){this._restoreContentCommand.set("content",row.data);this._restoreContentCommand.execute();}},_onDeletedByChange:function(_2f){var _30=this.model.get("currentTrash");_30.deletedBy=_2f;_30.isRequireLoad=true;this.model.set("currentTrash",_30);},_onSearchBoxChange:function(_31){var _32=this.model.get("currentTrash");_32.queryText=_31;_32.isRequireLoad=true;this.model.set("currentTrash",_32);}});});