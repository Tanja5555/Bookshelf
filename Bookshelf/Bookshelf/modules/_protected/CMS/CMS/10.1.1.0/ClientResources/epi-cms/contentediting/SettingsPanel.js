//>>built
require({cache:{"url:epi-cms/contentediting/templates/SettingsPanel.html":"<div class=\"epi-documentHeader\">\n    <div data-dojo-type=\"epi/shell/layout/SimpleContainer\" data-dojo-attach-point=\"widgetContainer\"></div>\n    <div data-dojo-attach-point=\"contentDetails\"></div>\n</div>"}});define("epi-cms/contentediting/SettingsPanel",["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/Deferred","dojo/when","dojo/dom-geometry","dijit/_Container","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/layout/_LayoutWidget","dijit/layout/BorderContainer","epi/shell/layout/SimpleContainer","dojo/text!./templates/SettingsPanel.html"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d){return _1([_a,_7,_8,_9],{templateString:_d,contentViewModel:null,detailsWidgetIdentifier:"epi-cms/contentediting/ContentDetails",detailsModelIdentifier:"epi-cms/contentediting/viewmodel/ContentDetailsViewModel",detailsWidgetProperties:null,_contentDetailsDef:null,_contentDetailsModelDef:null,buildRendering:function(){this.inherited(arguments);var _e=this.detailsWidgetIdentifier;var _f=this.detailsModelIdentifier;var _10=new _4();var _11=new _4();require([_e,_f],_2.hitch(this,function(_12,_13){var _14=new _12({},this.contentDetails);this.own(_14);var _15=new _13();this.own(_15);_14.set("model",_15);_14.startup();this.contentDetails=_14;_10.resolve(_14);_11.resolve(_15);}));this._contentDetailsDef=_10;this._contentDetailsModelDef=_11;},_setContentViewModelAttr:function(_16){this._set("contentViewModel",_16);_5(this._contentDetailsModelDef,function(_17){_17.set("dataModel",_16);});},addChild:function(w){if(this.detailsWidgetProperties){var _18=_3.filter(this.detailsWidgetProperties,function(_19){return _19.propertyName===w.name;});if(_18.length>0){_5(this._contentDetailsDef,_2.hitch(this,function(_1a){_1a.addChild(w,_18[0].options);}));return;}}this.widgetContainer.addChild(w);}});});