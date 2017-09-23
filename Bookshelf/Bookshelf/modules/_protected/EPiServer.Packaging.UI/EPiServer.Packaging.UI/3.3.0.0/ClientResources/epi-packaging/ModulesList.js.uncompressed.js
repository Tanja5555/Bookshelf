define("epi-packaging/ModulesList", [
"dojo",
"dijit",
"dojo/cookie",
"dijit/_Widget",
"dijit/_TemplatedMixin",
"dojox/widget/Standby",
"epi/shell/XhrWrapper",
"epi-packaging/ModuleSummary",
"epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.ModulesList"],

function (dojo, dijit, cookie, _Widget, _TemplatedMixin, Standby, XhrWrapper, ModuleSummary, res) {

    return dojo.declare([_Widget, _TemplatedMixin], {
    // summary:
    //    Modules list widget
    // description:
    //    Renders the list of modules, short information and available actions
    // tags:
    //    public

    // res: Object
    //  Resources collection objects
        res: res,

    // antiForgeryData: epi.modules.AntiForgeryData
    //  Contains an instance of epi.modules.AntiForgeryData with antiforgery key data.
    antiForgeryData: null,

    // templateString: [protected] String
    //    Template for the widget.
        templateString: '<div class="epi-listingContainer"><ul data-dojo-attach-point="_modulesListPlaceholder" class="epi-advancedListing"></ul></div>',

    // listItemTemplateString: [protected] String
    //    Template for the list item widget.
    listItemTemplateString: null,

    // listingUrl: [public] String
    //    URL to load modules list.
    listingUrl: null,

        // feedName: [public] String
        //    Name of feed to load from listingUrl.
        feedName: null,

    // hideModuleInListOnAction: [public] Boolean
    //    Indicates whether module should be hidden in the list after any action with this module, like installing/uninstalling.
    hideModuleInListOnAction: false,

    // emptyListMessage: [public] String
    //    Message to display when list is empty.
    emptyListMessage: "No add-on found.",

    _dataStore: null,
    _listItems: null,
    _standbyWigdet: null,

    /*
    Widget lifecycle functions.
    */
    constructor: function () {
        this._xhr = new XhrWrapper();
    },

    startup: function () {
        // summary:
        //    Start up the widget and it's childs.
        // tags:
        //    public
        if (this._started) {
            return;
        }
            this._standbyWigdet = this._createStandbyWidget();
        document.body.appendChild(this._standbyWigdet.domNode);
        this._standbyWigdet.startup();

        this.inherited(arguments);
    },

        _createStandbyWidget: function () {
            // summary:
            //    Creates standby widget, to display loading indicator
            //
            // tags:
            //    private
            return new dojox.widget.Standby({ target: this._modulesListPlaceholder });
        },

    destroy: function () {
        // summary:
        //    Tear-down function.
        //
        // tags:
        //    public

            this._destroyModuleList();
        this._standbyWigdet.destroyRecursive(false);
        this.inherited(arguments);
    },

    /*
    Custom functions
    */

    updateView: function () {
        // summary:
        //    Updates the widget view.
        //
        // tags:
        //    public
        this._listModules(true);
    },

    onSiteRestartRequired: function () {
        // summary:
        //    Callback method to get notified when a site restart is required
        //
        // tags:
        //    public callback
    },

    onError: function (errorMesages) {
        // summary:
        //    Callback method to get notified when an error occurs
        //
        // tags:
        //    public callback
    },

    onSuccess: function (statusMessages) {
        // summary:
        //    Callback method to get notified when operations complete successfully
        //
        // tags:
        //    public callback

    },

    onModuleActionPerformed: function () {
        // summary:
        //    Callback method to get notified when an action is performed on some module
        //
        // tags:
        //    public callback
    },

    _listModules: function (reloadData) {
        if (this.listingUrl == "") {
            return;
        }
        if (!this._dataStore || reloadData) {
                var content = { feedName: this.feedName };
            this.antiForgeryData.AddAntiforgeryToken(content);
            this._standbyWigdet.show();
            this._xhr.xhrPost({
                content: content,
                url: this.listingUrl,
                handleAs: "json",
                load: dojo.hitch(this, function (response, ioArgs) {
                        // To make sure we have real response from server.
                        if (!response) {
                            return;
                        }
                        else {
                    if (response.errors && response.errors.length > 0) {
                        this._showErrors(response.errors);
                    }
                    this._dataStore = new dojo.store.Memory({ data: response.modules });
                    this._buildModuleList();
                        }
                }),
                error: dojo.hitch(this, function (error, ioargs) {
                        var errorMessage = dojo.replace(this.res.addonlistreaderror, { error: error });
                    this._showErrors([errorMessage]);
                    dojo.publish("onServerError", [ioargs]);
                }),
                handle: dojo.hitch(this, function (response, ioArgs) {
                    this._standbyWigdet.hide();
                })
            });
        }
        else {
            this._buildModuleList();
        }
    },

    _buildModuleList: function () {
        // TODO: filtering, sorting goes here
        var modules = this._dataStore.query({}, {
                sort: [
                    { attribute: "title", descending: false },
                    { attribute: "versionMajor", descending: true },
                    { attribute: "versionMinor", descending: true },
                    { attribute: "versionBuild", descending: true },
                    { attribute: "versionRevision", descending: true },
                    { attribute: "versionSpecial", descending: false }
                ]
        });
        this._renderModules(modules);
    },

        _createModuleSummary: function (summaryParams, placeholder) {
            // summary:
            //    Creates module summary widget, which is an item for this grid.
            // summaryParams: Object
            //    Parameter list.
            // placeholder: Object
            //    Pleace holder to add module summary to.
            // tags:
            //    private
            var li = dojo.create('li', { "class": "clearfix" }, placeholder);
            var div = dojo.create('div', {}, li);
            return new ModuleSummary(summaryParams, div);
        },

    _renderModules: function (modules) {
        dojo.empty(this._modulesListPlaceholder);
        this._destroyModuleList();
        if (modules.length == 0) {
            this._showEmptyListMessage();
            return;
        }
        dojo.forEach(modules, function (item, i) {
                var summaryParams = { module: item, antiForgeryData: this.antiForgeryData, itemIndex: i };
            if (this.listItemTemplateString) {
                summaryParams.templateString = this.listItemTemplateString;
            }
                var moduleSummary = this._createModuleSummary(summaryParams, this._modulesListPlaceholder);
            moduleSummary.startup();

                this._connectModuleSummaryEvents(moduleSummary);
            }, this);
        },

        _connectModuleSummaryEvents: function (moduleSummary) {
            // summary:
            //    Connects to moduleSummary's events, to update UI when action has been invoked.
            //
            // moduleSummary:
            //    Module summary to connect to.
            //
            // tags:
            //    private

            var onInstallHandler = this.connect(moduleSummary, "onInstall", function (summaryWidget) {
                this._onModuleAction(summaryWidget);
                var statusMessage = dojo.replace(this.res.installsuccess, summaryWidget.module);
                this.onSuccess([statusMessage]);

                this._ensureReload();
            });
            var onUninstallHandler = this.connect(moduleSummary, "onUninstall", function (summaryWidget) {
                this._onModuleAction(summaryWidget);
                var statusMessage = dojo.replace(this.res.uninstallsuccess, summaryWidget.module);
                this.onSuccess([statusMessage]);

                this._ensureReload();
            });
            var onUpdateHandler = this.connect(moduleSummary, "onUpdate", function (summaryWidget) {
                this._onModuleAction(summaryWidget);
                var statusMessage = dojo.replace(this.res.updatesuccess, summaryWidget.module);
                this.onSuccess([statusMessage]);
                this._ensureReload(summaryWidget);
            });
            var onEnableHandler = this.connect(moduleSummary, "onEnable", function (summaryWidget) {
                this._onModuleAction(summaryWidget);
                var statusMessage = dojo.replace(this.res.enablesuccess, summaryWidget.module);
                this.onSuccess([statusMessage]);
                this._ensureReload(summaryWidget);
            });
            var onDisableHandler = this.connect(moduleSummary, "onDisable", function (summaryWidget) {
                this._onModuleAction(summaryWidget);
                var statusMessage = dojo.replace(this.res.disablesuccess, summaryWidget.module);
                this.onSuccess([statusMessage]);
                this._ensureReload(summaryWidget);
            });


            var onInstallErrorHandler = this.connect(moduleSummary, "onInstallError", function (summaryWidget) {
                this.onModuleActionPerformed();
                var errorMessages = this._getErrorMessages(this.res.installationerror, summaryWidget.module);
                this._showErrors(errorMessages);
            });
            var onUninstallErrorHandler = this.connect(moduleSummary, "onUninstallError", function (summaryWidget) {
                this.onModuleActionPerformed();
                var errorMessages = this._getErrorMessages(this.res.uninstallationerror, summaryWidget.module);
                this._showErrors(errorMessages);
            });
            var onUpdateErrorHandler = this.connect(moduleSummary, "onUpdateError", function (summaryWidget) {
                this.onModuleActionPerformed();
                var errorMessages = this._getErrorMessages(this.res.updateerror, summaryWidget.module);
                this._showErrors(errorMessages);
            });
            var onEnableErrorHandler = this.connect(moduleSummary, "onEnableError", function (summaryWidget) {
                this.onModuleActionPerformed();
                var errorMessage = this._getErrorMessages(this.res.enableerror, summaryWidget.module);
                this._showErrors([errorMessage]);
            });
            var onDisableErrorHandler = this.connect(moduleSummary, "onDisableError", function (summaryWidget) {
                this.onModuleActionPerformed();
                var errorMessage = this._getErrorMessages(this.res.disableerror, summaryWidget.module);
                this._showErrors([errorMessage]);
            });

            var listItem = {
                widget: moduleSummary,
                handlers: [onInstallHandler, onUninstallHandler, onUpdateHandler, onEnableHandler, onDisableHandler, onInstallErrorHandler, onUninstallErrorHandler, onUpdateErrorHandler, onEnableErrorHandler, onDisableErrorHandler]
            };
            this._listItems.push(listItem);
    },

        _getErrorMessages: function (generalMessageTemplate, module) {
            var errorMessages = [dojo.replace(generalMessageTemplate, module)];
            if (module.errors && module.errors.length) {
                errorMessages = errorMessages.concat(module.errors);
            }
            return errorMessages;
        },

        _ensureReload: function () {
            dojo.publish("onReloadRequired");
    },

    _onModuleAction: function (summaryWidget) {

        if (this.hideModuleInListOnAction) {
            this._removeModuleFromList(summaryWidget);
        }
        this.onSiteRestartRequired();

        // Hack: always update full list after any action
        // Should be refactored in new UI
        this.updateView();

        this.onModuleActionPerformed();
    },

    _removeModuleFromList: function (summaryWidget) {
        var itemsToRemove = dojo.filter(this._listItems, function (item) { return item.widget == summaryWidget; });
        dojo.forEach(itemsToRemove, function (item, i) {
            var elementToRemove = item.widget.domNode.parentNode;
            this._destroyListItem(item);
            var indexInList = dojo.indexOf(this._listItems, item);
            if (indexInList > -1) {
                this._listItems.splice(indexInList, 1);
            }
            dojo.destroy(elementToRemove);
        }, this);
        if (this._listItems.length == 0) {
            this._showEmptyListMessage();
        }
    },

    _destroyModuleList: function () {
        dojo.forEach(this._listItems, function (listItem, i) {
            this._destroyListItem(listItem);
        }, this);
        this._listItems = [];
    },

    _destroyListItem: function (listItem) {
        dojo.forEach(listItem.handlers, function (handler) {
            this.disconnect(handler);
        }, this);

        listItem.widget.destroyRecursive(false);
    },

    _showErrors: function (errors) {
        this.onError(errors);
    },

    _showEmptyListMessage: function () {
        var li = dojo.create('li', {}, this._modulesListPlaceholder);
        var div = dojo.create('div', { innerHTML: '<span>' + this.emptyListMessage + '</span>' }, li);
        dojo.addClass(div, "emptyListMessageContainer");
    }
});

});
