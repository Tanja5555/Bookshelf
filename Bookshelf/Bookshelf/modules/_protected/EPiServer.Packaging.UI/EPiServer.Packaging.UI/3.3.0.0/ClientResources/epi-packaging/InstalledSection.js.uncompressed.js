require({cache:{
'url:epi-packaging/templates/Section.htm':"﻿<div style=\"overflow:auto;\">\r\n    <div data-dojo-attach-point=\"_headerPlaceholder\"></div>\r\n    <div class=\"epi-newContentContainerInverted\">\r\n        <div data-dojo-attach-point=\"_contentPlaceholder\"></div>\r\n    </div>\r\n</div>"}});
﻿define("epi-packaging/InstalledSection", [
    "dojo/_base/declare",
    "dojo/dom-geometry",
    "dojo/text!./templates/Section.htm",
    "dijit/_TemplatedMixin",
    "dijit/layout/_LayoutWidget",
    "epi/routes",
    "epi-packaging/SectionHeader",
    "epi-packaging/PackagesGrid",
    "epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.InstalledSection"
], function (
    declare,
    domGeometry,
    template,
    _TemplatedMixin,
    _LayoutWidget,
    routes,
    SectionHeader,
    PackagesGrid,
    resources
) {

    return declare([_LayoutWidget, _TemplatedMixin], {
        // summary:
        //    Installed add-ons section widget.
        //
        // description:
        //    Displays the list of installed add-ons.
        //
        // tags:
        //    public

        /*
        Attributes
        */

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

            var header = new SectionHeader({
                webHelpAlias: "installedaddons",
                antiForgeryData: this.antiForgeryData,
                sectionTitle: resources.title
            }, this._headerPlaceholder);

            var list = new PackagesGrid({
                antiForgeryData: this.antiForgeryData,
                listingUrl: routes.getActionPath({ moduleArea: 'EPiServer.Packaging.UI', controller: 'AddOns', action: 'GetInstalledModules' })
            }, this._contentPlaceholder);

            header.startup();
            list.startup();

            this.connect(list, "onSiteRestartRequired", function () {
                header.updateView();
            });

            this.connect(list, "onError", function (errors) {
                header.addErrorMessages(errors);
            });
            this.connect(list, "onSuccess", function (messages) {
                header.addSuccessMessages(messages);
            });

            this.connect(list, "onModuleActionPerformed", function () {
                header.clearErrorMessages();
                header.clearSuccessMessages();
            });

            this.inherited(arguments);

            this._headerWidget = header;
            this._listWidget = list;
        },

        layout: function () {
            // summary:
            //      Required override when inheriting _LayoutWidget.
            //      Called from resize
            // tags:
            //      public

            var children = this.getChildren();

            if (children && children.length == 2) {
                this._layout2Children(children[0], children[1]);
            }
        },

        _layout2Children: function (/*Widget*/child, /*Widget*/sibling) {
            // summary:
            //      Layout 2 children. Keep the first child and resize the second child to remain avaible space.
            // tags:
            //      private

            var containerHeight = domGeometry.position(this.domNode).h,
                childHeight = domGeometry.position(child.domNode).h,
                siblingHeight = containerHeight - childHeight;

            sibling.resize({ h: siblingHeight });
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