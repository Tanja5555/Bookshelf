require({cache:{
'url:epi-packaging/templates/SectionHeader.htm':"﻿<div style=\"overflow: auto;\">\r\n    <div class=\"epi-listingTopContainer\" data-dojo-attach-point=\"selectTypeNode\">\r\n        <h1 data-dojo-attach-point=\"_titleNode\">\r\n            ${sectionTitle}</h1>\r\n        <div data-dojo-attach-point=\"_descriptionNode\">\r\n            ${description}</div>\r\n        <div data-dojo-attach-point=\"_restartPlaceholder\">\r\n        </div>\r\n        <div data-dojo-attach-point=\"_successMessageList\" data-dojo-type=\"epi-packaging/StatusMessageList\"\r\n            class=\"epi-packaging-validationSummary epi-packaging-Note\">\r\n        </div>\r\n        <div data-dojo-attach-point=\"_errorMessageList\" data-dojo-type=\"epi-packaging/StatusMessageList\"\r\n            class=\"epi-errorText epi-packaging-validationSummary epi-packaging-Error\">\r\n        </div>\r\n        <div class=\"epi-packaging-preload-error\">\r\n        </div>\r\n        <div class=\"epi-packaging-preload-success\">\r\n        </div>\r\n    </div>\r\n</div>\r\n"}});
﻿define("epi-packaging/SectionHeader", [
"dojo",
"dijit",
"dojo/cookie",
"dojo/html",
"dijit/_Widget",
"dijit/_TemplatedMixin",
"dijit/_WidgetsInTemplateMixin",
"dijit/Dialog",
"epi/shell/widget/HelpButton",
"epi-packaging/StatusMessageList",
"epi-packaging/RestartSite",
"dojox/widget/Standby",
"dojo/text!./templates/SectionHeader.htm",
"epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.SectionHeader"
],

function (dojo, dijit, cookie, html, _Widget, _TemplatedMixin, _WidgetsInTemplateMixin, Dialog, HelpButton, StatusMessageList, RestartSite, Standby, template, res) {

    return dojo.declare([_Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {
    // summary:
    //    section header widget.
    //
    // description:
    //    Displays UI elements common for all sections, like title, help button, messages summary and restart site widget.
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

    // sectionTitle: [public] String
    //    Title for the section.
    sectionTitle: null,

    // description: [public] String
    //    Description for this section
    description: null,

    _titleNode: null,
    _descriptionNode: null,

    // webHelpAlias: [public] String
    //    Alias for web help button on this list.
    webHelpAlias: null,

    // antiForgeryData: [public] Object
    //    Anti forgery data object.
    antiForgeryData: null,

    _helpButtonWidget: null,
    _restartWidget: null,
    _standbyWidget: null,

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

        this._helpButtonWidget = new HelpButton({ moduleName: 'CMS', webHelpAlias: this.webHelpAlias }, this._helpButton);
        this._helpButtonWidget.startup();

        this._restartWidget = new RestartSite({ antiForgeryData: this.antiForgeryData }, this._restartPlaceholder);
        this._restartWidget.startup();

        this.connect(this._restartWidget, "onRestartFinished", function () {
            var packagingStatusMessage = this._getStoredMessages();
            if (packagingStatusMessage) {
                this._setReloadRequested();
                window.location.reload(true);
            }
        });

        this.connect(this._restartWidget, "onRestartCheckComplete", function (restartRequired) {
            var packagingStatusMessage = this._getStoredMessages();
            if (packagingStatusMessage && !restartRequired && !this._isReloadRequested()) {
                this._setReloadRequested();
                window.location.reload(true);
            }
        });

        this._standbyWidget = new Standby({ target: this._standbyPlaceholder });
        document.body.appendChild(this._standbyWidget.domNode);
        this._standbyWidget.startup();

        dojo.subscribe("onServerError", dojo.hitch(this, this._showServerError));
        dojo.subscribe("onReloadRequired", dojo.hitch(this, this._storeMessages));

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

        html.set(this._titleNode, this.sectionTitle);
        html.set(this._descriptionNode, this.description);

        this._displayStoredMessage();

        this._restartWidget.showIfRestartRequired();
    },

    _isReloadRequested: function () {
        var packagingRestarted = this._getItem("EPiPackagingPageReload");
        return packagingRestarted === "true";
    },

    _setReloadRequested: function () {
        this._storeItem("EPiPackagingPageReload", "true");
    },

    _clearReloadRequested: function () {
        this._removeItem("EPiPackagingPageReload");
    },

    _displayStoredMessage: function () {

        var messages = this._getStoredMessages();
        if (this._isReloadRequested() && messages) {
            this.addSuccessMessages(messages);
            this._clearReloadRequested();
            this._clearStoredMessages();
        }
    },

    _storeMessages: function () {
        var successMessages = this._successMessageList.messages;
        if (successMessages.length > 0) {
            this._storeItem("EPiPackagingStatusMessage", dojo.toJson(successMessages));
        }
    },

    _getStoredMessages: function () {
        var packagingStatusMessage = this._getItem("EPiPackagingStatusMessage");
        if (!packagingStatusMessage) {
            return null;
        }
        if (packagingStatusMessage == "") {
            return null;
        }
        return dojo.fromJson(packagingStatusMessage);
    },

    _clearStoredMessages: function () {
        this._removeItem("EPiPackagingStatusMessage");
    },
    

    _storeItem: function(key, value)
    {
        if (localStorage !== undefined) {
            localStorage.setItem(key, value);
        } else {
            dojo.cookie(key, value);
        }
    },
    
    _getItem: function (key) {
        var value;
        if (localStorage !== undefined) {
            value = localStorage.getItem(key);
        } else {
            value = dojo.cookie(key);
        }
        return value;
    },
    
    _removeItem: function(key) {
        if (localStorage !== undefined) {
            localStorage.removeItem(key);
        } else {
            dojo.cookie(key, "", { expire: -1 });
        }
    },

    showStandby: function () {
        // summary:
        //    Shows standby widget.
        //
        // tags:
        //    public
        this._standbyWidget.show();
    },

    hideStandby: function () {
        // summary:
        //    Hides standby widget.
        //
        // tags:
        //    public
        this._standbyWidget.hide();
    },

    addErrorMessages: function (messages) {
        // summary:
        //    Adds error messages to the error summary.
        //
        // tags:
        //    public

        if (this._isReloadRequested()) { // page reload initiated, ignore all errors
            return;
        }

        this._errorMessageList.addMessages(messages);
    },

    clearErrorMessages: function () {
        // summary:
        //    Clears error messages to the error summary.
        //
        // tags:
        //    public

        this._errorMessageList.clearMessages();
    },

    addSuccessMessages: function (messages) {
        // summary:
        //    Adds success messages to the success summary.
        //
        // tags:
        //    public

        this._successMessageList.addMessages(messages);
    },

    clearSuccessMessages: function () {
        // summary:
        //    Clears success messages to the success summary.
        //
        // tags:
        //    public

        this._successMessageList.clearMessages();
    },

    _showServerError: function (ioargs) {
        // summary:
        //      Shows error dialog with iframe displaying response from the server
        // tags:
        //      private

        if (ioargs.processed) {
            return;
        }

        if (this._isReloadRequested()) { // page reload initiated, ignore all errors
            return;
        }

        ioargs.processed = true;
        var isLoginScreen;
        try {
            isLoginScreen = ioargs.xhr.getResponseHeader("X-EPiLogOnScreen");
        }
        catch (ex) {
        }
        if (isLoginScreen) {
            window.location.reload();
            return;
        }

        var content = ioargs.xhr.responseText;

        var div = dojo.byId("errorContainerDialog");
        if (div) {
            dojo.destroy(div);
        }
        div = dojo.create('div', { id: "errorContainerDialog" }, dojo.body());
        var iframe = dojo.create('iframe', { width: "800px", height: "400px", id: "erroriframe" }, div);

        //Create the dialog
        var dialog = new Dialog({
            title: this.res.servererror,
            style: "width: 820px",
            content: div
        });

        //Open it
        dialog.show();

        //Fill iframe with content form the server response
        var doc = iframe.contentWindow.document;
        doc.open();
        doc.writeln(content);
        doc.close();
    }
});
});