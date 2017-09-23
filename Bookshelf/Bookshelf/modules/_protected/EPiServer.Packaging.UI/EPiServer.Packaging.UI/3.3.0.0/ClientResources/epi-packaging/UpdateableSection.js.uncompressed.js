require({cache:{
'url:epi-packaging/templates/Section.htm':"﻿<div style=\"overflow:auto;\">\r\n    <div data-dojo-attach-point=\"_headerPlaceholder\"></div>\r\n    <div class=\"epi-newContentContainerInverted\">\r\n        <div data-dojo-attach-point=\"_contentPlaceholder\"></div>\r\n    </div>\r\n</div>"}});
﻿define("epi-packaging/UpdateableSection", [
"dojo",
"dijit",
"epi/routes",
"dijit/layout/_LayoutWidget",
"dijit/_TemplatedMixin",
"epi-packaging/SectionHeader",
"epi-packaging/ModulesList",
"dojo/text!./templates/Section.htm",
"epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.UpdateableSection"],

function (dojo, dijit, routes, _LayoutWidget, _TemplatedMixin, SectionHeader, ModulesList, template, res) {

    return dojo.declare([_LayoutWidget, _TemplatedMixin], {
        // summary:
        //    Updateable add-ons section widget.
        //
        // description:
        //    Displays the list of updateable add-ons.
        //
        // tags:
        //    public

        /*
        Attributes
        */

        // res: Object
        //  Resources collection objects
        res: res,

        // templateString: [protected] String
        //    Template for the widget.
        templateString: template,

        // antiForgeryData: [public] Object
        //    Anti forgery data object.
        antiForgeryData: null,

        _headerWidget: null,
        _listWidget: null,

        /*
        Widget lifecycle functions. 
        */

    startup: function () {
            // summary:
            //    Start up the widget and it's childs.
            // tags:
            //    public
            if (this._started) {
                return;
            }

            this._headerWidget = new SectionHeader({ webHelpAlias: "updateableaddons", antiForgeryData: this.antiForgeryData,
                                                sectionTitle: this.res.title }, this._headerPlaceholder);
            this._headerWidget.startup();

            this._listWidget = new ModulesList({ antiForgeryData: this.antiForgeryData, hideModuleInListOnAction: true, emptyListMessage: this.res.emptylistmessage,
                listingUrl: routes.getActionPath({ moduleArea: 'EPiServer.Packaging.UI', controller: 'AddOns', action: 'GetUpdateableModules' })
            }, this._contentPlaceholder);
            this._listWidget.startup();
            this.connect(this._listWidget, "onSiteRestartRequired", function () {
                this._headerWidget.updateView();
            });

            this.connect(this._listWidget, "onError", function (errors) {
                this._headerWidget.addErrorMessages(errors);
            });
            this.connect(this._listWidget, "onSuccess", function (messages) {
                this._headerWidget.addSuccessMessages(messages);
            });

            this.connect(this._listWidget, "onModuleActionPerformed", function () {
                this._headerWidget.clearErrorMessages();
                this._headerWidget.clearSuccessMessages();
            });

            this.inherited(arguments);
        },

        /*
        Custom functions
        */

        updateView: function () {
            // summary:
            //    Updates widget view.
            //
            // tags:
            //    public
            this._headerWidget.clearErrorMessages();
            this._headerWidget.clearSuccessMessages();
            this._headerWidget.updateView();
            this._listWidget.updateView();
        }
    });
});