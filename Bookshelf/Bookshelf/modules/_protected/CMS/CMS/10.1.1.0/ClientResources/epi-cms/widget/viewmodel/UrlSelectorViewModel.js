//>>built
define("epi-cms/widget/viewmodel/UrlSelectorViewModel",["dojo/_base/array","dojo/_base/declare","dojo/_base/Deferred","dojo/_base/lang","dojo/io-query","dojo/topic","dojo/Stateful","dojo/when","epi/shell/_StatefulGetterSetterMixin","epi-cms/core/PermanentLinkHelper"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){return _2([_7,_9],{_getValueAttr:function(){if(typeof this.internalValue==="string"||!this.internalValue){return this.internalValue;}else{return this.internalValue.href;}},_setValueAttr:function(_b){if(typeof _b==="string"){_b={href:_b};}if(!_b||!_b.href){this.set("internalValue",null);this.set("isEmpty",true);return;}this.set("isEmpty",false);_8(_a.getContent(_b.href,{allLanguages:true}),_4.hitch(this,function(_c){_b.name=_c?_c.name:_b.href;this.set("internalValue",_b);}));}});});