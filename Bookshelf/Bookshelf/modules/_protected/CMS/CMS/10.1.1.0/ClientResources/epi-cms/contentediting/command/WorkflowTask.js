//>>built
define("epi-cms/contentediting/command/WorkflowTask",["dojo/_base/declare","dojo/_base/lang","dojo/dom-attr","dojo/dom-class","dojo/io-query","epi","epi-cms/ApplicationSettings","epi-cms/contentediting/command/_LegacyDialogCommandBase","epi-cms/core/ContentReference","epi/i18n!epi/cms/nls/episerver.cms.contentediting.command.workflowtask"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){return _1([_8],{label:_a.label,tooltip:_a.tooltip,cssClass:"epi-chromelessButton epi-visibleLink",dialogPath:"Edit/WorkflowTask.aspx",raiseCloseEvent:true,postscript:function(){this.inherited(arguments);this.set("isAvailable",_7.isWorkflowsEnabled);},getDialogParams:function(){var _b=this;return {dialogTitle:_a.title,legacyButtonQuery:"div span.epi-cmsButton",onMapDialogButton:function(_c){return _b._mapDialogButtons(_c);},onLoad:function(_d){_b._closeLegacyDialogOnRedirect(_d,this);},showCloseButton:true};},getRouteParams:function(){return _2.mixin(this.inherited(arguments),{id:this.getContentReference(true),task:this.model.task.taskId});},_onModelChange:function(){var _e=this.model;var _f=!!(_e&&_e.contentData&&!_e.contentData.isDeleted&&_e.task&&_e.task.taskId);this.set("canExecute",_f);},_isCancelButton:function(_10){return _10&&_4.contains(_10,"epi-cmsButton-Cancel");},_mapDialogButtons:function(_11){return !(this._isCancelButton(_11)||_4.contains(_11,"epi-cmsButton-ViewMode"));},_closeLegacyDialogOnRedirect:function(_12,_13){var uri=_12.containerIframe.contentWindow.location.href,_14=uri.substring(uri.indexOf("?")+1,uri.length),_15=_5.queryToObject(_14);if(!_15||!(_15.task)){_13.hide();}}});});