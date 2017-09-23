require({cache:{
'url:epi-packaging/templates/Notification.htm':"﻿<span>\n    <h4>${res.codemode}</h4>\n</span>"}});
﻿define("epi-packaging/Notification", [
"dojo",
"dijit/_WidgetBase",
"dijit/_TemplatedMixin",
"dojo/text!./templates/Notification.htm",
"epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.Toolbar"],

function (dojo, _WidgetBase, _TemplatedMixin, template, res) {

    return dojo.declare([_WidgetBase, _TemplatedMixin], {
        res: res,
        templateString: template
    });
});