//>>built
define("epi-cms/contentediting/LanguageNotification",["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/url","dojo/Stateful","dojo/dom-construct","epi/dependency","epi-cms/ApplicationSettings","epi-cms/contentediting/command/Editing","epi/i18n!epi/cms/nls/episerver.cms.contentediting.languagenotification"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){return _1([_5],{_valueSetter:function(_b){var _c=_b.context;if(!_c.languageContext){this.set("notification",null);return;}var _d=_7.resolve("epi.storeregistry").get("epi.cms.language");_d.query().then(_2.hitch(this,function(_e){var _f={};_3.forEach(_e,function(_10){_f[_10.languageId]=_10.name;},this);var _11=_c.languageContext.warning;var _12=_8.currentContentLanguage;var _13=_c.languageContext;var _14;if(_12!==_13.preferredLanguage&&_13.isTranslationNeeded){_11=_2.replace(_a.nottranslatedswitchto,[_f[_13.language],_f[_13.preferredLanguage]]);_14=_13.preferredLanguage;}else{if(_12!==_13.language&&!_13.isTranslationNeeded){_11=_2.replace(_a.workinginwrongsite,[_f[_12],_f[_13.language]]);_14=_13.language;}}if(!_11){this.set("notification",null);return;}var _15=_6.create("div",{innerHTML:_11});if(_14){var url=new _4(window.top.location.href);var _16=_2.replace(_a.switchto,[_f[_14]]);_6.create("a",{href:[url.scheme,"://",url.authority,url.path,"?language=",_14,"#context=",_c.versionAgnosticUri].join(""),innerHTML:_16,title:_16},_15);}this.set("notification",{content:_15,commands:_13.isTranslationNeeded&&_12===_13.preferredLanguage?[_9.translate]:[]});}));}});});