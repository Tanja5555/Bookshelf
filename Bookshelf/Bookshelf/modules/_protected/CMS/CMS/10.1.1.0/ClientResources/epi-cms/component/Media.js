//>>built
define("epi-cms/component/Media",["dojo/_base/declare","dojo/_base/lang","dojo/dom-class","dojo/dom-style","dojo/on","dojo/topic","epi-cms/component/MediaViewModel","epi-cms/widget/HierarchicalList","epi/i18n!epi/cms/nls/episerver.cms.widget.hierachicallist","epi/i18n!epi/cms/nls/episerver.cms.components.media"],function(_1,_2,_3,_4,on,_5,_6,_7,_8,_9){return _1([_7],{res:_9,enableDndFileDropZone:true,showCreateContentArea:true,showThumbnail:true,modelClassName:_6,noDataMessage:_9.nocontent,hierarchicalListClass:"epi-mediaList",createContentText:_9.dropareatitle,postCreate:function(){this.inherited(arguments);this.list.set("noDataMessage",this.res.nocontent);this.own(this.model.getCommand("upload").watch("canExecute",_2.hitch(this,function(_a,_b,_c){this._toggleCreateContentArea(_c);})));},_onCreateAreaClick:function(){this.inherited(arguments);this.model._commandRegistry.uploadDefault.command.execute();},_setupCreateContentArea:function(){this.inherited(arguments);var _d=this.createContentAreaButton.domNode;_3.remove(_d,"epi-flat");_3.add(_d,"epi-button--full-width");}});});