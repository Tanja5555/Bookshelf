//>>built
define("epi-cms/contentediting/command/LanguageSelection",["dojo/_base/declare","epi/shell/command/OptionCommand","epi/i18n!epi/cms/nls/episerver.cms.contentediting"],function(_1,_2,_3){return _1([_2],{optionsLabel:_3.contentdetails.existinglanguages,active:false,selected:"",_selectedSetter:function(_4){this.inherited(arguments);if(typeof (_4)=="string"&&_4!==""){this.set("label",_4.toUpperCase());if(_4!==this.model.get("documentLanguage")){this.set("active",true);}else{this.set("active",false);}}}});});