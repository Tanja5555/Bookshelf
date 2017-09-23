define("epi-packaging/Toolbar", [
"dojo/_base/declare",
"dojo/topic",
"dijit/layout/ContentPane",
"epi/shell/widget/ToolbarSet",
"epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.Toolbar"
],

function (declare, topic, ContentPane, ToolbarSet, res) {

    return declare([ToolbarSet], {
        // summary: Add-on toolbar

        res: res,

        constructor: function () {
            this.layoutContainerClass = ContentPane;
        },

        postCreate: function () {
            // summary: Overridden to add buttons to the tool bar once the toolbar itself has been created.
            this.add([
                {
                    name: "upload",
                    label: this.res.uploadbuttonlabel,
                    action: function () { topic.publish("/epi/shell/action/changeview", "epi-packaging/UploadSection"); }
                },
                {
                    name: "restartWarning",
                    widgetType: "epi-packaging/SiteRestartWarning"
                }
            ]);
            this.inherited(arguments);
        },

        destroy: function () {
            // summary: Destroys the widget. Overridden to disconnect listeners on button state.

            this.inherited(arguments);
        }
    });
});