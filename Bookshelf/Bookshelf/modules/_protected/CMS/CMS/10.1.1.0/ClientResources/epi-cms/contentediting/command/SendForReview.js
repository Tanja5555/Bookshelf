//>>built
define("epi-cms/contentediting/command/SendForReview",["dojo/_base/declare","dojo/topic","epi-cms/contentediting/ContentActionSupport","epi-cms/contentediting/command/_ChangeContentStatus","epi/i18n!epi/cms/nls/episerver.cms.contentediting.toolbar.buttons"],function(_1,_2,_3,_4,_5){return _1([_4],{label:_5.sendforreview.label,executingLabel:_5.sendforreview.executinglabel,tooltip:_5.sendforreview.title,iconClass:"epi-iconCheckmark",action:_3.saveAction.CheckIn,_execute:function(){_2.publish("/epi/cms/action/disableundoredoactions");return this.inherited(arguments);}});});