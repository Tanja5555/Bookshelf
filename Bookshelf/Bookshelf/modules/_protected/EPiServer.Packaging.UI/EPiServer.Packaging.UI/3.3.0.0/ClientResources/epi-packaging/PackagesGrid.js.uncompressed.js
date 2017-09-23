define("epi-packaging/PackagesGrid", [
    "dojo/_base/array",
    "dojo/_base/declare",
    "dojo/_base/event",
    "dojo/_base/lang",
    "dojo/dom-construct",
    "dojo/dom-style",
    "dojo/on",
    "dojox/widget/Standby",

    "dijit/layout/_LayoutWidget",

    "dgrid/Keyboard",
    "dgrid/OnDemandGrid",
    "dgrid/Selection",

    "epi",
    "epi/datetime",
    "epi/shell/widget/dialog/Confirmation",
    "epi/shell/widget/dialog/Dialog",

    "epi-packaging/ModulesList",
    "epi-packaging/DetailedView",
    "epi-packaging/ModuleSummary",

    "epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.PackagesGrid",
    "epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.ModuleSummary"
], function (
    array,
    declare,
    event,
    lang,
    domConstruct,
    domStyle,
    on,
    Standby,

    _LayoutWidget,

    Keyboard,
    OnDemandGrid,
    Selection,

    epi,
    datetime,
    Confirmation,
    Dialog,
    ModulesList,
    DetailedView,
    ModuleSummary,
    resources,
    moduleRes
) {

    return declare([_LayoutWidget, ModulesList], {

        // templateString: [protected] String
        //		Set this to an empty div since we don't want to inherit TemplatedMixin from ModulesList.
        templateString: '<div></div>',

        _createStandbyWidget: function () {
            // summary:
            //		Creates standby widget, to display loading indicator
            // tags:
            //		private

            return new Standby({ target: this.domNode });
        },

        buildRendering: function () {

            this.inherited(arguments);

            var columns = {
                titleWithVersion: {
                    className: "epi-packaging-name",
                    label: epi.resources.header.name,
                    renderCell: lang.hitch(this, function (item, value, node) {
                        if (value) {
                            var link = domConstruct.create("a", {
                                "class": "epi-packaging-namelink",
                                href: "#details",
                                innerHTML: value
                            });
                            on(link, 'click', lang.hitch(this, function (evt) {
                                event.stop(evt);
                                this._openDetails(item);
                            }));
                            domConstruct.place(link, node);
                        }
                    })
                },
                description: {
                    className: "epi-packaging-description",
                    label: epi.resources.header.description
                },
                tags: {
                    className: "epi-packaging-tags",
                    label: resources.tags,
                    renderCell: function (item, value, node) {
                        array.forEach(value, function (tag) {
                            domConstruct.create("span", { "class": "epi-valueItem", innerHTML: tag }, node);
                        });
                    }
                },
                installDate: {
                    className: "epi-packaging-installedDate",
                    label: resources.installdate,
                    formatter: function (value) {
                        return datetime.toUserFriendlyString(value);
                    }
                },
                installedBy: {
                    className: "epi-packaging-installedBy",
                    label: resources.installby
                },
                _item: {
                    className: "epi-packaging-indicators",
                    label: " ",
                    sortable: false,
                    renderCell: function (item, value, node) {
                        if (item.isDisabled) {
                            domConstruct.create("span", { "class": "epi-packaging-indicator epi-packaging-indicator--disabled", innerHTML: resources.disabledlabel }, node);
                        }
                        if (item.isSystem) {
                            domConstruct.create("span", { "class": "epi-packaging-indicator epi-packaging-indicator--core", innerHTML: resources.systemlabel }, node);
                        }
                        if (item.isUpdateAvailable) {
                            domConstruct.create("a", { "class": "epi-visibleLink", href: "#updates", innerHTML: resources.updatelink }, node);
                        }
                    }
                }
            };

            this.grid = new (declare([OnDemandGrid, Selection, Keyboard]))({
                columns: columns,
                selectionMode: "single",
                sort: [{ attribute: "titleWithVersion", descending: false}],
                store: this._dataStore
            }, this.domNode);
        },

        _buildModuleList: function () {
            // summary:
            //    Buils module list, populate data to grid.
            //
            // tags:
            //    private

            this._renderModules(this._dataStore);
        },

        _renderModules: function (store) {
            // summary:
            //      Bind data to grid.
            // tags:
            //      private

            this._destroyModuleList();
            this.grid.cleanup();

            this._listItems = [];
            array.forEach(store.data, function (item) {
                var summaryParams = {
                    module: item,
                    antiForgeryData: this.antiForgeryData,
                    _moduleStandby: this._standbyWigdet, // so when module install is in progress, this._standbyWigdet will be displayed.
                    _setButtonVisibility: function () { } // since we don't have any button to update visibility.
                };
                // assign to item module, so we can invoke moduleSummary.install later to install module. (or update, uninstall too)
                item.moduleSummary = new ModuleSummary(summaryParams, null);

                this._connectModuleSummaryEvents(item.moduleSummary);
            }, this);

            // Bind the updated data to the grid.
            this.grid.set("store", store);
        },

        _openDetails: function (currentPackage) {
            // summary:
            //    Open package detail view.
            //
            // currentPackage:
            //    current package to display information.
            //
            // tags:
            //    private

            var instance = this;
            var dialog = new Dialog({
                content: new DetailedView({
                    currentPackage: currentPackage,
                    installHandler: lang.hitch(dialog, function () {
                        instance._showConfirmationDialog(currentPackage, moduleRes.installconfirmation, lang.hitch(dialog, function (confirm) {
                            if (confirm) {
                                this.hide();
                                currentPackage.moduleSummary._installModule();
                            }
                        }));
                    }),
                    updateHandler: lang.hitch(dialog, function () {
                        instance._showConfirmationDialog(currentPackage, moduleRes.updateconfirmation, lang.hitch(dialog, function (confirm) {
                            if (confirm) {
                                this.hide();
                                currentPackage.moduleSummary._updateModule();
                            }
                        }));
                    }),
                    unInstallHandler: lang.hitch(dialog, function () {
                        instance._showConfirmationDialog(currentPackage, moduleRes.uninstallconfirmation, lang.hitch(dialog, function (confirm) {
                            if (confirm) {
                                this.hide();
                                currentPackage.moduleSummary._uninstallModule();
                            }
                        }));
                    }),
                    disableHandler: lang.hitch(dialog, function () {
                        instance._showConfirmationDialog(currentPackage, moduleRes.disableconfirmation, lang.hitch(dialog, function (confirm) {
                            if (confirm) {
                                this.hide();
                                currentPackage.moduleSummary._disableModule();
                            }
                        }));
                    }),
                    enableHandler: lang.hitch(dialog, function () {
                        instance._showConfirmationDialog(currentPackage, moduleRes.enableconfirmation, lang.hitch(dialog, function (confirm) {
                            if (confirm) {
                                this.hide();
                                currentPackage.moduleSummary._enableModule();
                            }
                        }));
                    }),
                    closeHandler: lang.hitch(dialog, function () {
                        dialog.hide();
                    })
                }),
                title: currentPackage.title,
                destroyOnHide: true,
                defaultActionsVisible: false // to hide OK and Cancel buttons
            });
            dialog.show();
        },

        _showConfirmationDialog: function (/*Object*/currentPackage, /*String*/message, /*Function*/fnConfirmCallback) {
            // summary:
            //    Configure and open the confirmation dialog.
            //
            // currentPackage:
            //    current package to process install, update or uninstall action.
            //
            // message:
            //    Confirmation message.
            //
            // fnConfirmCallback:
            //    Callback function.
            //
            // tags:
            //    private

            var dialog = new Confirmation({
                description: lang.replace(message, { name: currentPackage.title, version: currentPackage.version }),
                title: moduleRes.confirmationdialogtitle,
                onAction: fnConfirmCallback
            });

            dialog.show();
        }
    });
});
