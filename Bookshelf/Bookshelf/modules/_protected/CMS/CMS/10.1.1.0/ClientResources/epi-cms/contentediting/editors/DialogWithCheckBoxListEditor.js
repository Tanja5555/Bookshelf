//>>built
require({cache:{"url:epi-cms/contentediting/editors/templates/DialogWithCheckBoxListEditor.html":"<div class=\"dijitReset dijitInline epi-previewableTextBox-wrapper\">\n    <span data-dojo-attach-point=\"labelNode\" class=\"epi-previewableTextBox-text dojoxEllipsis dijitInline\"></span>\n    <a href=\"#\" data-dojo-attach-point=\"changeNode\" class=\"epi-functionLink\">${changeLabel}</a>\n</div>"}});define("epi-cms/contentediting/editors/DialogWithCheckBoxListEditor",["dojo/_base/declare","dojo/_base/event","dojo/_base/lang","dijit/_TemplatedMixin","dijit/_Widget","epi","epi/shell/widget/dialog/Dialog","epi-cms/contentediting/editors/CheckBoxListEditor","epi-cms/contentediting/editors/DialogWithCheckBoxListEditorViewModel","epi-cms/widget/_HasChildDialogMixin","dojo/text!./templates/DialogWithCheckBoxListEditor.html"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b){return _1([_5,_4,_a],{templateString:_b,changeLabel:_6.resources.action.change,valueIsCsv:true,valueIsInclusive:true,_checkBoxWidget:null,postMixInProperties:function(){this.inherited(arguments);this.model=new _9({valueIsCsv:this.valueIsCsv,valueIsInclusive:this.valueIsInclusive});this.own(this.model.watch("label",_3.hitch(this,function(_c,_d,_e){this.labelNode.innerHTML=_e;})));},postCreate:function(){this.inherited(arguments);this.connect(this.changeNode,"onclick",this._onChangeNodeClick);},onChange:function(_f){},_setValueAttr:function(_10){this._set("value",_10);this.model.set("value",_10);},_setSelectionsAttr:function(_11){this._set("selections",_11);this.model.set("selections",_11);},_onChangeNodeClick:function(e){_2.stop(e);this._checkBoxWidget=new _8({selections:this.selections,valueIsCsv:this.valueIsCsv,valueIsInclusive:this.valueIsInclusive,readOnly:this.readOnly});this._checkBoxWidget.set("value",this.value);var _12=new _7({content:this._checkBoxWidget,title:this.label});_12.connect(_12,"onExecute",_3.hitch(this,function(){this._onSave(_12);}));_12.connect(_12,"onHide",_3.hitch(this,function(){this.isShowingChildDialog=false;}));this.isShowingChildDialog=true;_12.show();},_onSave:function(){this.set("value",this._checkBoxWidget.value);this.onChange(this._checkBoxWidget.value);this.onBlur();}});});