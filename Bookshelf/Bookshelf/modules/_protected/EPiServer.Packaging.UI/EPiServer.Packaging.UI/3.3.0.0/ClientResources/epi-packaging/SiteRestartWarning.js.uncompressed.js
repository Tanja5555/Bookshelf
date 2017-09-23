require({cache:{
'url:epi-packaging/templates/SiteRestartWarning.htm':"﻿<div class=\"epi-addonsRestartWarningContainer dijitInline\">\r\n    <span class=\"epi-addonsRestartWarningMessage\">${res.message} <a class=\"epi-visibleLink\" href=\"${helpUrl}\" onclick=\"window.open('${helpUrl}','_blank', 'scrollbars=yes, location=no, menubar=no, resizable=yes, toolbar=no, height=500, width=840');return false;\" target=\"_blank\"  >${res.learnmorelabel}</a></span>\r\n</div>"}});
﻿define("epi-packaging/SiteRestartWarning", [
"dojo",
"dijit",
"epi/dependency",
"dijit/_Widget",
"dijit/_TemplatedMixin",
"dojo/text!./templates/SiteRestartWarning.htm",
"epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.SiteRestartWarning"],

function (dojo, dijit, dependency, _Widget, _TemplatedMixin, template, res) {

    return dojo.declare([_Widget, _TemplatedMixin], {
        // summary:
        //    Displays static warning about required site restart and the link to detailed information.

        res: res,
        helpUrl: null,
        templateString: template,
        
        postMixInProperties: function () {
            var manager = dependency.resolve("epi.ModuleManager");
            var module = manager.getModule("CMS"); //TODO: Consider to avoid such dependencies
            this.helpUrl = module.helpPath + "#addons";

            this.inherited(arguments);
        }
    });
});