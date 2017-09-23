require({cache:{
'url:epi-packaging/templates/DetailedView.htm':"﻿<div class=\"epi-packaging-detailedViewContainer epi-TabContainerWrapper\" data-dojo-attach-point=\"contentContainer\">\r\n    <div data-dojo-attach-point=\"tabContainer\" data-dojo-type=\"dijit/layout/TabContainer\">\r\n        <div class=\"epi-dialogPadding\" data-dojo-type=\"dijit/layout/ContentPane\" title=\"${res.tab.title.overview}\"  selected=\"true\">\r\n            <h4>${res.tab.content.about}</h4>\r\n            <p data-dojo-attach-point=\"overviewAboutContent\"></p>\r\n            \r\n            <h4>${res.tab.content.releasenotes}</h4>\r\n            <p data-dojo-attach-point=\"overviewReleaseNotesContent\"></p>\r\n            <span style=\"display:block\">\r\n                <h4>${res.tab.content.installationmode.title}</h4>\r\n                <p data-dojo-attach-point=\"overviewInstallationModeNotesContent\"></p>\r\n            </span>\r\n        </div>\r\n        <div class=\"epi-dialogPadding\" data-dojo-type=\"dijit/layout/ContentPane\" title=\"${res.tab.title.specs}\">\r\n            <ul data-dojo-attach-point=\"specItemList\"></ul>\r\n        </div>\r\n        <div class=\"epi-dialogPadding epi-dependenciesTabContainer\" data-dojo-type=\"dijit/layout/ContentPane\" title=\"${res.tab.title.dependencies}\">\r\n            <div data-dojo-attach-point=\"dependenciesContent\"></div>\r\n            <div data-dojo-attach-point=\"dependenciesList\" data-dojo-type=\"epi-packaging/DependenciesGrid\"></div>\r\n        </div>\r\n    </div>\r\n</div>"}});
﻿define("epi-packaging/DetailedView", [
    "epi",
    "epi/datetime",

    "dojo/_base/array",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-geometry",
    "dojo/dom-style",

    "dijit",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/layout/_LayoutWidget",
    "dijit/layout/TabContainer",
    "dijit/layout/ContentPane",
    "epi/shell/widget/_ActionProviderWidget",
    "dojo/text!./templates/DetailedView.htm",
    "epi-packaging/DependenciesGrid",
    "epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.DetailedView"
], function (
    epi,
    epiDate,

    array,
    declare,
    lang,
    domGeom,
    domStyle,

    dijit,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    _LayoutWidget,
    TabContainer,
    ContentPane,
    _ActionProviderWidget,
    template,
    DependenciesGrid,
    res
) {

    return declare([_LayoutWidget, _TemplatedMixin, _WidgetsInTemplateMixin, _ActionProviderWidget], {
        // summary:
        //    Displays add-on detailed information in modal dialog.

        // currentPackage: [public] Object
        //		Package to display in this view.
        currentPackage: null,

        // installHandler: [public] callback
        //		Callback for handling module install process.
        installHandler: null,

        // updateHandler: [public] callback
        //		Callback for handling module update process.
        updateHandler: null,

        // unInstallHandler: [public] callback
        //		Callback for handling module un-install process.
        unInstallHandler: null,

        // disableHandler: [public] callback
        //		Callback for handling module disable process.
        disableHandler: null,

        // enableHandler: [public] callback
        //		Callback for handling module enable process.
        enableHandler: null,

        // closeHandler: [public] callback
        //		Callback for handling close action.
        closeHandler: null,

        // res: Object
        //  Resources collection objects
        res: res,

        templateString: template,

        _specItemTemplate: "<li>\
                                <span class='epi-specItemLabel'>{specItemLabel}</span>\
                                <span class='epi-specItemValue'>{specItemValue}</span>\
                            </li>",

        _toolbar: null,

        postCreate: function () {
            // summary:
            //    Initialize settings.
            //
            // tags:
            //      public

            this.inherited(arguments);

            if (!this.currentPackage) {
                return;
            }

            this._loadOverviewTabContent();
            this._loadSpecsTabContent();
            this._loadDependenciesTabContent();
        },

        startup: function () {
            // summary:
            //		Construct the UI for this widget from a template, adding 
            //		buttons from any attached action providers.
            // tags:
            //		protected

            this.inherited(arguments);
        },

        layout: function () {
            // summary:
            //    Resizes inner tab container.
            //
            // tags:
            //      public
            this.inherited(arguments);
            this._contentBox.h = domGeom.position(this.contentContainer.parentNode).h;
            this.tabContainer.resize(this._contentBox);

            // in case there is no dependency, dependencies tab will hidden datagrid and show notice no dependence
            if (!this.currentPackage || !this.currentPackage.dependencies || this.currentPackage.dependencies.length < 1) {
                this.dependenciesContent.innerHTML = this.res.tab.dependencies.nodependencies;
            }
        },

        _hideTab: function (tabTitle) {
            // summary:
            //    Hides tab by its title.
            // tabTitle: string
            //    Title of the tab to be hidden.
            // tags:
            //      private
            array.forEach(this.tabContainer.tablist.getChildren(), lang.hitch(this, function (item, index, array) {
                if (item.label === tabTitle) {
                    domStyle.set(item.domNode, { display: "none" });
                    return;
                }
            }));
        },

        _loadOverviewTabContent: function () {
            // summary:
            //    Load content for overview tab.
            //
            // tags:
            //      private

            this.overviewAboutContent.innerHTML = this.currentPackage.description || "";
            this.overviewReleaseNotesContent.innerHTML = this.currentPackage.releaseNotes || "";
            if (this.currentPackage.isShellModule) {
                this.overviewInstallationModeNotesContent.innerHTML = this.currentPackage.installationModeNotes || "";
                this.overviewInstallationModeNotesContent.parentNode.style.display = "block";
            } else {
                this.overviewInstallationModeNotesContent.parentNode.style.display = "none";
            }
        },

        _loadDependenciesTabContent: function () {
            // summary:
            //    Load content for dependencies tab.
            //
            // tags:
            //      private

            this.dependenciesList.data = this.currentPackage.dependencies;
        },

        _loadSpecsTabContent: function () {
            // summary:
            //    Load content for specs tab.
            //
            // tags:
            //      private

            var specsTabContent = "";

            if (this.currentPackage.versionInstalled) {
                if (this.currentPackage.version == this.currentPackage.versionLatestAvailable && this.currentPackage.isInstalled) {
                    specsTabContent += this._addSpecItems(this.res.tab.content.status,
                    "<span class='epi-installationStatusIcon epi-installedStatusIcon'></span>" + this.res.tab.content.installed);
                }
                else {
                    if (this.currentPackage.isDisabled) {
                        specsTabContent += this._addSpecItems(this.res.tab.content.status,
                        "<span class='epi-installationStatusIcon epi-disabledStatusIcon'></span>"
                        + this.res.tab.content.disabled);
                    } else {
                        specsTabContent += this._addSpecItems(this.res.tab.content.status,
                        "<span class='epi-installationStatusIcon epi-newVersionStatusIcon'></span>"
                        + lang.replace(this.res.tab.content.priorversioninstalled, { priorversion: this.currentPackage.versionInstalled }));
                    }
                }

            } else {
                specsTabContent += this._addSpecItems(this.res.tab.content.status,
                    "<span class='epi-installationStatusIcon epi-notInstalledStatusIcon'></span>" + this.res.tab.content.notinstalled);
            }

            var installationDate = epiDate.toUserFriendlyHtml(this.currentPackage.installDate);
            specsTabContent += this._addSpecItems(this.res.tab.content.installationdate, installationDate || this.res.tab.content.notavailable);

            specsTabContent += this._addSpecItems(this.res.tab.content.installedby, this.currentPackage.installedBy || this.res.tab.content.notavailable);
            specsTabContent += this._addSpecItems(this.res.tab.content.version, this.currentPackage.version || "");
            specsTabContent += this._addSpecItems(this.res.tab.content.releaseby, this.currentPackage.authors || "");

            // format the displaying of tag's content
            var customTagsContent = array.map(this.currentPackage.tags, function (item) {
                return ' "' + item + '"';
            });
            specsTabContent += this._addSpecItems(this.res.tab.content.tags, customTagsContent || "");

            this.specItemList.innerHTML = specsTabContent;
        },

        _addSpecItems: function (itemLabel, itemValue) {
            // summary:
            //    Add which item to display.
            //
            // itemLabel: label of item
            //
            // itemValue: value of item
            //
            // tags:
            //      private

            return lang.replace(this._specItemTemplate, { specItemLabel: itemLabel, specItemValue: itemValue })
        },

        getActions: function () {
            // summary:
            //    Provides the list of actions depending on status of current package.
            //
            // tags:
            //      public

            if (!this.currentPackage) {
                return [];
            }

            this._actions = []; // Reset the actions

            if (this.currentPackage.actionsAvailable.install) {
                this.addActions({ name: "install", label: epi.resources.action.install, action: lang.hitch(this, this.installHandler) });
            }
            if (this.currentPackage.actionsAvailable.update || this.currentPackage.actionsAvailable.installAsUpdate) {
                this.addActions({ name: "update", label: epi.resources.action.update, action: lang.hitch(this, this.updateHandler) });
            }
            if (this.currentPackage.actionsAvailable.enable) {
                this.addActions({ name: "enable", label: res.enablebutton, action: lang.hitch(this, this.enableHandler) });
            }
            if (this.currentPackage.actionsAvailable.disable) {
                this.addActions({ name: "disable", label: res.disablebutton, action: lang.hitch(this, this.disableHandler) });
            }
            if (this.currentPackage.actionsAvailable.uninstall) {
                this.addActions({ name: "uninstall", label: epi.resources.action.uninstall, action: lang.hitch(this, this.unInstallHandler) });
            }

            this.addActions({ name: "close", label: epi.resources.action.close, action: lang.hitch(this, this._closeClick) });

            return this._actions;
        },

        _closeClick: function () {
            if (this.closeHandler) {
                this.closeHandler();
            }
        }
    });
});
