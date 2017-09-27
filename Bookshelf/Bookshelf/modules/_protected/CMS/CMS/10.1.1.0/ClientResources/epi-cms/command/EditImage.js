//>>built
define("epi-cms/command/EditImage",["dojo/_base/declare","dojo/_base/lang","dojo/topic","epi/dependency","epi/routes","epi/Url","epi/UriParser","epi/shell/TypeDescriptorManager","epi-cms/ApplicationSettings","epi-cms/core/ContentReference","epi-cms/legacy/LegacyDialogPopup","epi-cms/contentediting/command/_LegacyDialogCommandBase","epi/shell/command/_SelectionCommandMixin"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d){return _1([_c,_d],{canExecute:false,iconClass:"epi-iconNewWindow",_segmentIdSeperator:",,",postscript:function(){this.inherited(arguments);this.contextService=this.contextService||_4.resolve("epi.shell.ContextService");},getRouteParams:function(){var _e=this._getTarget();return this.contextService.query({uri:"epi.cms.contentdata:///"+_e.contentLink}).then(function(_f){var _10=new _7(_f.uri).getId();return {moduleArea:"LegacyCMS",path:"Edit/ImageEditor/ImageEditor.aspx",IsInLegacyWrapper:false,imageId:_10};});},_createDialog:function(_11,_12){var _13=this._getTarget();if(_13){var _14=function(_15){if(_15){_3.publish("/epi/shell/context/request",{url:_15.src},{forceReload:true});}};_2.mixin(_11,{url:_5.getActionPath(_12),dialogArguments:{src:_13.permanentLink,contentLink:_12.imageId},onCallback:_14});}return new _b(_11);},_onModelChange:function(){if(!_9.imageEditorEnabled){if(this.get("isAvailable")){this.set("isAvailable",false);}return;}var _16=this._getTarget(),_17=this.model&&_16&&_8.isBaseTypeIdentifier(_16.typeIdentifier,"episerver.core.icontentimage");this.set("canExecute",!!_17);},_getTarget:function(){var _18=this.selection&&this.selection.data,_19=_18&&_18.length===1&&_18[0];return _19&&(_19.type==="epi.cms.contentdata")?_19.data:null;}});});