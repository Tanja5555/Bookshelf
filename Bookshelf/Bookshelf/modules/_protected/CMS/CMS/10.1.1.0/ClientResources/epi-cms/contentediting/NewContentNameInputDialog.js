//>>built
require({cache:{"url:epi-cms/contentediting/templates/NewContentNameInputDialog.html":"<div class=\"epi-formContainer\">\n    <div data-dojo-attach-point=\"messageNode\"></div>\n    <br />\n    <div>\n        <label data-dojo-attach-point=\"contentNameLabelNode\">${nameLabel}</label>\n        <input type=\"text\" size=\"40\" maxlength=\"255\"  data-dojo-attach-point=\"contentNameTextbox\" data-dojo-type=\"dijit/form/ValidationTextBox\"\n                data-dojo-props=\"required: true, trim:true, selectOnClick: true\"\n                data-dojo-attach-event=\"onBlur: _onBlurVerifyContent\"\n                missingMessage: \"${res.errormessage.missingmessage}\" />\n    </div>\n</div>"}});define("epi-cms/contentediting/NewContentNameInputDialog",["dojo/_base/declare","dojo/_base/lang","dojo/dom-style","dojo/keys","dijit/_CssStateMixin","dijit/_Widget","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/form/TextBox","epi","epi/shell/widget/dialog/_DialogContentMixin","epi/shell/widget/_ModelBindingMixin","epi/shell/widget/_ActionProviderWidget","dojo/text!./templates/NewContentNameInputDialog.html","epi/i18n!epi/cms/nls/episerver.cms.widget.newcontentnamedialog"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f){return _1([_6,_7,_8,_d,_b,_5],{templateString:_e,res:_f,defaultContentName:null,message:null,title:null,nameLabel:_a.resources.header.name,_setMessageAttr:{node:"messageNode",type:"innerHTML"},postMixInProperties:function(){this.inherited(arguments);this.message=_2.replace(this.res.warningtext,{defaultname:this.defaultContentName});this._set("message",this.message);this.title=_f.title;},postCreate:function(){this.inherited(arguments);this.contentNameTextbox.set("value",this.defaultContentName);this.contentNameTextbox.on("keyup",_2.hitch(this,function(evt){var _10=this.contentNameTextbox.isValid();if(evt.keyCode===_4.ENTER&&_10){this.executeDialog();}}));this.on("focus",_2.hitch(this,function(){this.contentNameTextbox.textbox.select();}));},_getValueAttr:function(){return this.contentNameTextbox.get("value");},_onBlurVerifyContent:function(){if(this.contentNameTextbox.get("value")===""){this.contentNameTextbox.set("value",this.defaultContentName);}},getActions:function(){this._actions=[{name:"ok",label:_a.resources.action.ok,settings:{type:"button","class":"Salt"},action:_2.hitch(this,function(){if(this.contentNameTextbox.isValid()){this.executeDialog();}else{this.contentNameTextbox.focus();}})},{name:"cancel",label:_a.resources.action.cancel,settings:{type:"button"},action:_2.hitch(this,function(){this.cancelDialog();})}];return this._actions;}});});