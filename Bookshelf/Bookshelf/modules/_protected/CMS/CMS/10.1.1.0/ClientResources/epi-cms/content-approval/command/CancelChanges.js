//>>built
define("epi-cms/content-approval/command/CancelChanges",["dojo/_base/declare","epi/dependency","epi/i18n!epi/nls/episerver.shared.action","epi/shell/command/_PropertyWatchCommand"],function(_1,_2,_3,_4){return _1([_4],{label:_3.cancel,canExecute:true,propertiesToWatch:["isDirty"],contextHistory:null,postscript:function(){this.inherited(arguments);this.contextHistory=this.contextHistory||_2.resolve("epi.cms.BackContextHistory");},_execute:function(){this.contextHistory.closeAndNavigateBack(this);},_onPropertyChanged:function(){var _5=!!this.model.isDirty;this.set("label",_5?_3.cancel:_3.close);}});});