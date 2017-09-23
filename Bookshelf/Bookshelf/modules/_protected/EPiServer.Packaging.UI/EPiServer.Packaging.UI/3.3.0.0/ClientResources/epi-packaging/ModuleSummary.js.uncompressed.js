require({cache:{
'url:epi-packaging/templates/ModuleSummary.htm':"﻿<div data-dojo-attach-event=\"ondijitclick:_moreInfoClick\" data-dojo-attach-point=\"moduleItemContainer\">\r\n    <div class=\"epi-browserWindow\"><div class=\"epi-browserWindowContent\" data-dojo-attach-point=\"moduleIcon\">${emptyIconTemplate}</div></div>\r\n    <h3 data-dojo-attach-point=\"nameNode\">${module.titleWithVersion}</h3>\r\n    <p data-dojo-attach-point=\"updateIndicatorContainer\"><span class=\"epi-newContentNotification\">${res.newerversionavailablemessage}</span><span data-dojo-attach-point=\"updateIndicatorVersion\"></span></p>\r\n    <p data-dojo-attach-point=\"disabledIndicatorContainer\"><span class=\"epi-packaging-indicator epi-packaging-indicator--disabled\">${res.disabledmessage}</span></p>\r\n    <p data-dojo-attach-point=\"descriptionNode\">${module.description}</p><p><a href=\"#details\" data-dojo-attach-event=\"ondijitclick:_moreInfoClick\">${res.moreinformation}</a></p>\r\n\r\n    <p data-dojo-attach-point=\"dependenciesList\"><strong class=\"label\">${res.dependencies} </strong></p>\r\n    <p data-dojo-attach-point=\"tagList\"><strong class=\"label\">${res.tags} </strong></p>\r\n    <p data-dojo-attach-point=\"installInfoBlock\"></p>\r\n    <div data-dojo-attach-point=\"errorList\" data-dojo-type=\"epi-packaging/StatusMessageList\" class=\"epi-advancedListingError\"></div>\r\n    <input type=\"button\" data-dojo-type=\"dijit/form/Button\" label=\"${res.buttoninstalllabel}\" title=\"${res.buttoninstalllabel} ${module.titleWithVersion}\" class=\"moduleActionButton\" data-dojo-attach-event=\"onClick:_installClick\" data-dojo-attach-point=\"InstallButton\" />\r\n    <input type=\"button\" data-dojo-type=\"dijit/form/Button\" label=\"${res.buttonupdatelabel}\" title=\"${res.buttonupdatelabel} ${module.titleWithVersion}\" class=\"moduleActionButton\" data-dojo-attach-event=\"onClick:_updateClick\" data-dojo-attach-point=\"UpdateButton\" />\r\n    <input type=\"button\" data-dojo-type=\"dijit/form/Button\" label=\"${res.buttonenablelabel}\" title=\"${res.buttonenablelabel} ${module.titleWithVersion}\" class=\"moduleActionButton\" data-dojo-attach-event=\"onClick:_enableClick\" data-dojo-attach-point=\"EnableButton\" />\r\n    <input type=\"button\" data-dojo-type=\"dijit/form/Button\" label=\"${res.buttondisablelabel}\" title=\"${res.buttondisablelabel} ${module.titleWithVersion}\" class=\"moduleActionButton\" data-dojo-attach-event=\"onClick:_disableClick\" data-dojo-attach-point=\"DisableButton\" />\r\n    <input type=\"button\" data-dojo-type=\"dijit/form/Button\" label=\"${res.buttonuninstalllabel}\" title=\"${res.buttonuninstalllabel} ${module.titleWithVersion}\" class=\"moduleActionButton\" data-dojo-attach-event=\"onClick:_uninstallClick\" data-dojo-attach-point=\"UninstallButton\" />\r\n</div>"}});
﻿define("epi-packaging/ModuleSummary", [
"dojo",
"dojo/_base/event",
"dojo/dom-class",
"dojo/string",
"dijit",
"dijit/_Widget",
"dijit/_TemplatedMixin",
"dijit/_WidgetsInTemplateMixin",
"dojox/widget/Standby",

"epi/datetime",
"epi/routes",
"epi/shell/XhrWrapper",
"epi/shell/widget/dialog/Confirmation",
"epi/shell/widget/dialog/Dialog",
"epi-packaging/DetailedView",
"epi-packaging/StatusMessageList",
"dojo/text!./templates/ModuleSummary.htm",
"epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.ModuleSummary"
],

function (dojo, event, domClass, string, dijit, _Widget, _TemplatedMixin, _WidgetsInTemplateMixin, Standby,
    epiDate, routes, XhrWrapper, Confirmation, Dialog, DetailedView, StatusMessageList, template, res) {

    return dojo.declare([_Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {
        //  summary:
        //      Represents a single module.
        //  description:
        //      Creates a visual representation of a single module.

        // res: Object
        //  Resources collection objects
        res: res,

        // templateString: String
        //  Template for the widget
        templateString: template,

        // antiForgeryData: epi.modules.AntiForgeryData
        //  Holds antiforgery data object
        antiForgeryData: null,

        // module: Object
        //  Represents a single module that should be displayed
        module: null,

        // iconTemplate: [public] String
        //		The template used when an icon image is provided.
        iconTemplate: '<img src="${0}" class="epi-preview" />',

        // emptyIconTemplate: [public] String
        //		The template used when no icon image is provided.
        emptyIconTemplate: '<div class="epi-noPreviewIcon"></div>',

        _moduleStandby: null,

        constructor: function () {
            this.uninstallUrl = routes.getActionPath({ moduleArea: 'EPiServer.Packaging.UI', controller: 'AddOns', action: 'UninstallModule' });
            this.installUrl = routes.getActionPath({ moduleArea: 'EPiServer.Packaging.UI', controller: 'AddOns', action: 'InstallModule' });
            this.updateUrl = routes.getActionPath({ moduleArea: 'EPiServer.Packaging.UI', controller: 'AddOns', action: 'UpdateModule' });
            this.enableUrl = routes.getActionPath({ moduleArea: 'EPiServer.Packaging.UI', controller: 'AddOns', action: 'EnableModule' });
            this.disableUrl = routes.getActionPath({ moduleArea: 'EPiServer.Packaging.UI', controller: 'AddOns', action: 'DisableModule' });

            this._xhr = new XhrWrapper();
        },

        postCreate: function () {
            // summary:
            //    Post create initialization
            //
            // tags:
            //    protected

        this.inherited(arguments);

            // HACK: prevent double event bubble when clicking on buttons which are placed in div that has another onclick handler:
            // Dojo bug #15097: http://bugs.dojotoolkit.org/ticket/15097, hopefully should be fixed in 2.0
            this.connect(this.InstallButton.domNode, "click", function (e) { event.stop(e); });
            this.connect(this.UpdateButton.domNode, "click", function (e) { event.stop(e); });
            this.connect(this.UninstallButton.domNode, "click", function (e) { event.stop(e); });
            this.connect(this.DisableButton.domNode, "click", function (e) { event.stop(e); });
            this.connect(this.EnableButton.domNode, "click", function (e) { event.stop(e); });
        },

        startup: function () {
            // tags:
            //      public
            this.updateView();
            this.inherited(arguments);
        },

        onInstall: function (senderWidget) {
            // summary:
            //    Callback method to get notified when a installation complete
            //
            // tags:
            //    public callback

        },
        onInstallError: function (senderWidget) {
            // summary:
            //    Callback method to get notified when a installation error occurs
            //
            // tags:
            //    public callback

        },

        onUpdate: function (senderWidget) {
            // summary:
            //    Callback method to get notified when an update completes
            //
            // tags:
            //    public callback

        },
        onUpdateError: function (senderWidget) {
            // summary:
            //    Callback method to get notified when an update error occurs
            //
            // tags:
            //    public callback

        },

        onUninstall: function (senderWidget) {
            // summary:
            //    Callback method to get notified when a uninstallation complete
            //
            // tags:
            //    public callback

        },

        onUninstallError: function (senderWidget) {
            // summary:
            //    Callback method to get notified when a uninstallation error occurs
            //
            // tags:
            //    public callback

        },


        onEnable: function (senderWidget) {
            // summary:
            //    Callback method to get notified when a enabling complete
            //
            // tags:
            //    public callback

        },
        onEnableError: function (senderWidget) {
            // summary:
            //    Callback method to get notified when a enabling error occurs
            //
            // tags:
            //    public callback

        },

        onDisable: function (senderWidget) {
            // summary:
            //    Callback method to get notified when an disabling completes
            //
            // tags:
            //    public callback

        },
        onDisableError: function (senderWidget) {
            // summary:
            //    Callback method to get notified when an disabling error occurs
            //
            // tags:
            //    public callback

        },


        updateView: function () {
            this._setButtonVisibility();
            this._createDependencies();
            this._createTags();

                if (this.module.installedBy != '') {
                    var installDate = epiDate.toUserFriendlyHtml(this.module.installDate);
                    var installInfo = "Installed on " + installDate + " by " + this.module.installedBy;
                    this.installInfoBlock.innerHTML = installInfo;
                } else {
                    dojo.destroy(this.installInfoBlock);
            }
                this.set("icon", this.module.iconUrl);

            this._showErrors();
        },

        _setIconAttr: function (value) {
            if (value) {
                this.moduleIcon.innerHTML = string.substitute(this.iconTemplate, [value]);
            } else {
                this.moduleIcon.innerHTML = this.emptyIconTemplate;
            }
        },

        _setButtonVisibility: function () {
            dojo.style(this.InstallButton.domNode, 'display', 'none');
            dojo.style(this.UninstallButton.domNode, 'display', 'none');
            dojo.style(this.UpdateButton.domNode, 'display', 'none');
            dojo.style(this.updateIndicatorContainer, 'display', 'none');
            dojo.style(this.EnableButton.domNode, 'display', 'none');
            dojo.style(this.DisableButton.domNode, 'display', 'none');
            dojo.style(this.disabledIndicatorContainer, 'display', 'none');
            dojo.removeClass(this.moduleItemContainer, "disabledItem");

            if (this.module.isInstalled) {
                dojo.style(this.InstallButton.domNode, 'display', 'inline-block');
                this.InstallButton.set('disabled', true);
            }
            if (this.module.actionsAvailable.install && !this.module.actionsAvailable.installAsUpdate) {
                dojo.style(this.InstallButton.domNode, 'display', 'inline-block');
            }
            if (this.module.actionsAvailable.enable) {
                dojo.style(this.EnableButton.domNode, 'display', 'inline-block');
            }
            if (this.module.actionsAvailable.installAsUpdate) {
                dojo.style(this.UpdateButton.domNode, 'display', 'inline-block');
            }

            if (this.module.isDisabled) {
                dojo.style(this.disabledIndicatorContainer, 'display', 'inline-block');
                dojo.addClass(this.moduleItemContainer, "disabledItem");
            }

        },

        _createTags: function () {
            dojo.forEach(this.module.tags, function (tag, i) {
                    var tagItem = dojo.create('span');
                    domClass.add(tagItem, "epi-valueItem");
                    this.tagList.appendChild(tagItem);
                    tagItem.innerHTML = tag;
            }, this);

        },

        _createDependencies: function () {
            dojo.forEach(this.module.dependencies, function (dependency, i) {
                    var dependencyItem = dojo.create('span');
                    domClass.add(dependencyItem, "epi-valueItem");
                    this.dependenciesList.appendChild(dependencyItem);
                    dependencyItem.innerHTML = dependency.name;
            }, this);

        },

        _showErrors: function () {
                this.errorList.clearMessages();
                if (this.module.errors && this.module.errors.length) {
                    this.errorList.addMessages(this.module.errors);
            }
        },

        _uninstallClick: function (e) {
                this._showConfirmationDialog(this.res.uninstallconfirmation, dojo.hitch(this, function (confirm) {
                if (confirm) {
                    this._uninstallModule();
                }
            }));
        },

        _installClick: function (e) {
                this._showConfirmationDialog(this.res.installconfirmation, dojo.hitch(this, function (confirm) {
                if (confirm) {
                    this._installModule();
                }
            }));

        },

        _updateClick: function (e) {
                this._showConfirmationDialog(this.res.updateconfirmation, dojo.hitch(this, function (confirm) {
                if (confirm) {
                    this._updateModule();
                }
            }));
        },

        _moreInfoClick: function (e) {
            event.stop(e);
            var instance = this;
            var dialog = new Dialog({
                content: new DetailedView({
                    currentPackage: this.module,
                    installHandler: dojo.hitch(dialog, function () {
                        instance._showConfirmationDialog(instance.res.installconfirmation, dojo.hitch(dialog, function (confirm) {
                            if (confirm) {
                                this.hide();
                                instance._installModule();
                            }
                        }));
                    }),
                    updateHandler: dojo.hitch(dialog, function () {
                        instance._showConfirmationDialog(instance.res.updateconfirmation, dojo.hitch(dialog, function (confirm) {
                            if (confirm) {
                                this.hide();
                                instance._updateModule();
                            }
                        }));
                    }),
                    unInstallHandler: dojo.hitch(dialog, function () {
                        instance._showConfirmationDialog(instance.res.uninstallconfirmation, dojo.hitch(dialog, function (confirm) {
                            if (confirm) {
                                this.hide();
                                instance._uninstallModule();
                            }
                        }));
                    }),
                    enableHandler: dojo.hitch(dialog, function () {
                        instance._showConfirmationDialog(instance.res.enableconfirmation, dojo.hitch(dialog, function (confirm) {
                            if (confirm) {
                                this.hide();
                                instance._enableModule();
                            }
                        }));
                    }),
                    disableHandler: dojo.hitch(dialog, function () {
                        instance._showConfirmationDialog(instance.res.disableconfirmation, dojo.hitch(dialog, function (confirm) {
                            if (confirm) {
                                this.hide();
                                instance._disableModule();
                            }
                        }));
                    }),
                    closeHandler: dojo.hitch(dialog, function () {
                        dialog.hide();
                    })
                }),
                title: this.module.title,
                destroyOnHide: true,
                defaultActionsVisible: false // to hide OK and Cancel buttons
            });
            dialog.show();
        },

        _enableClick: function (e) {
            this._showConfirmationDialog(this.res.enableconfirmation, dojo.hitch(this, function (confirm) {
                if (confirm) {
                    this._enableModule();
                }
            }));
        },

        _disableClick: function (e) {
            this._showConfirmationDialog(this.res.disableconfirmation, dojo.hitch(this, function (confirm) {
                if (confirm) {
                    this._disableModule();
                }
            }));
        },

        _installModule: function () {
            console.log("Install started for module " + this.module.id);
            this._showStandby();

            // extracting antiforgery input name and value to pass to the server
            var content = { id: this.module.id, version: this.module.version };
            this.antiForgeryData.AddAntiforgeryToken(content);

            this._xhr.xhrPost({
                content: content,
                // The URL of the request
                url: this.installUrl,
                handleAs: 'json',
                // The success handler
                load: dojo.hitch(this, function (response) {
                    console.log('Install complete.');
                    this.module = response;
                    this._setButtonVisibility();
                    this._moduleStandby.hide();

                    if (this.module.errors && this.module.errors.length) {
                        this._showErrors();
                        this.onInstallError(this);
                    }
                    else {
                        console.log("Add-on installed: " + this.module.id);
                        this.onInstall(this);
                    }
                }),
                // The error handler
                error: dojo.hitch(this, function (err, ioargs) {
                    console.log('Install request failed: ' + err);
                    this._moduleStandby.hide();
                    dojo.publish("onServerError", [ioargs]);
                })
            });
        },

        _updateModule: function () {
            console.log("Update started for module " + this.module.id);
            this._showStandby();

            // extracting antiforgery input name and value to pass to the server
            var content = { id: this.module.id, version: this.module.versionLatestAvailable };
            this.antiForgeryData.AddAntiforgeryToken(content);

            this._xhr.xhrPost({
                content: content,
                // The URL of the request
                url: this.updateUrl,
                handleAs: 'json',
                // The success handler
                load: dojo.hitch(this, function (response) {
                    console.log('Update complete.');
                    this.module = response;
                    this._setButtonVisibility();
                    this._moduleStandby.hide();

                    if (this.module.errors && this.module.errors.length) {
                        this._showErrors();
                        this.onUpdateError(this);
                    }
                    else {
                        console.log("Add-on updated: " + this.module.id);
                        this.onUpdate(this);
                    }
                }),
                // The error handler
                error: dojo.hitch(this, function (err, ioargs) {
                    console.log('Update request failed: ' + err);
                    this._moduleStandby.hide();
                    dojo.publish("onServerError", [ioargs]);
                })
            });
        },

        _uninstallModule: function () {
            console.log("Uninstall started for module " + this.module.id);

            this._showStandby();

            // extracting antiforgery input name and value to pass to the server
            var content = { id: this.module.id, version: this.module.version };
            this.antiForgeryData.AddAntiforgeryToken(content);

            this._xhr.xhrPost({
                content: content,
                // The URL of the request
                url: this.uninstallUrl,
                handleAs: 'json',
                // The success handler
                load: dojo.hitch(this, function (response) {
                    console.log('Uninstall complete');
                    this.module = response;
                    this._setButtonVisibility();
                    this._moduleStandby.hide();
                    if (this.module.errors && this.module.errors.length) {
                        this._showErrors();
                        this.onUninstallError(this);
                    }
                    else {
                        console.log("Add-on uninstalled: " + this.module.id);
                        this.onUninstall(this);
                    }
                }),
                // The error handler
                error: dojo.hitch(this, function (err, ioargs) {
                    console.log('Uninstall request failed: ' + err);
                    this._moduleStandby.hide();
                    dojo.publish("onServerError", [ioargs]);
                })
            });

        },

        _enableModule: function () {
            console.log("Enabling started for module " + this.module.id);
            this._showStandby();

            // extracting antiforgery input name and value to pass to the server
            var content = { id: this.module.id, version: this.module.version };
            this.antiForgeryData.AddAntiforgeryToken(content);

            this._xhr.xhrPost({
                content: content,
                // The URL of the request
                url: this.enableUrl,
                handleAs: 'json',
                // The success handler
                load: dojo.hitch(this, function (response) {
                    console.log('Enabling complete.');
                    this.module = response;
                    this._setButtonVisibility();
                    this._moduleStandby.hide();

                    if (this.module.errors && this.module.errors.length) {
                        this._showErrors();
                        this.onEnableError(this);
                    }
                    else {
                        console.log("Add-on enabled: " + this.module.id);
                        this.onEnable(this);
                    }
                }),
                // The error handler
                error: dojo.hitch(this, function (err, ioargs) {
                    console.log('Enabling request failed: ' + err);
                    this._moduleStandby.hide();
                    dojo.publish("onServerError", [ioargs]);
                })
            });
        },

        _disableModule: function () {
            console.log("Disabling started for module " + this.module.id);
            this._showStandby();

            // extracting antiforgery input name and value to pass to the server
            var content = { id: this.module.id, version: this.module.version };
            this.antiForgeryData.AddAntiforgeryToken(content);

            this._xhr.xhrPost({
                content: content,
                // The URL of the request
                url: this.disableUrl,
                handleAs: 'json',
                // The success handler
                load: dojo.hitch(this, function (response) {
                    console.log('Disabling complete.');
                    this.module = response;
                    this._setButtonVisibility();
                    this._moduleStandby.hide();

                    if (this.module.errors && this.module.errors.length) {
                        this._showErrors();
                        this.onDisableError(this);
                    }
                    else {
                        console.log("Add-on disabled: " + this.module.id);
                        this.onDisable(this);
                    }
                }),
                // The error handler
                error: dojo.hitch(this, function (err, ioargs) {
                    console.log('Disabling request failed: ' + err);
                    this._moduleStandby.hide();
                    dojo.publish("onServerError", [ioargs]);
                })
            });
        },


        _showStandby: function () {

            if (!this._moduleStandby) {
                this._moduleStandby = new Standby({ target: this.domNode });
                document.body.appendChild(this._moduleStandby.domNode);
                this._moduleStandby.startup();
            }
            this._moduleStandby.show();
        },

        _showConfirmationDialog: function (/*String*/message, /*Function*/fnConfirmCallback) {
            // summary:
            //    Configure and open the confirmation dialog.
            //
            // fnConfirmCallback:
            //    Callback function.
            //
            // tags:
            //    private
                var dialog = new Confirmation({
                    description: dojo.replace(message, { name: this.module.title, version: this.module.version }),
                    title: this.res.confirmationdialogtitle,
                    onAction: fnConfirmCallback
            });

                dialog.show();
        }

    });

});
