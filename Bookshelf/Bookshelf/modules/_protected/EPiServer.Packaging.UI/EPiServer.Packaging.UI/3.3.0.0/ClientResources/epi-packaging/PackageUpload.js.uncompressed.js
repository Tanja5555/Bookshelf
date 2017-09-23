require({cache:{
'url:epi-packaging/templates/PackageUpload.htm':"﻿<div>\r\n    <!-- Upload form -->\r\n    <form method=\"post\" action=\"${_uploadUrl}\" enctype=\"multipart/form-data\">\r\n        <div class=\"uploaderButton\" >\r\n            <input dojoAttachPoint=\"_uploaderInput\" type=\"file\" />\r\n        </div>\r\n        <input type=\"submit\" dojoAttachPoint=\"_installButton\" label=\"${res.buttoninstall}\" data-dojo-type=\"dijit/form/Button\" />\r\n        <input type=\"reset\" dojoAttachPoint=\"_clearButton\" label=\"${res.buttonclear}\" data-dojo-type=\"dijit/form/Button\" />\r\n        <div class=\"epi-paddingVertical-small\">\r\n            <!-- Selected files -->\r\n            <div dojoAttachPoint=\"_fileListNode\"></div>\r\n            <!-- Uploaded file -->\r\n            <div dojoAttachPoint=\"_uploadResultsNode\"></div>\r\n        </div>\r\n        <input type=\"hidden\" dojoAttachPoint=\"_uploadType\" name=\"uploadType\" />\r\n    </form>\r\n</div>\r\n"}});
﻿define("epi-packaging/PackageUpload", [
"dojo",
"dijit",
"dijit/_Widget",
"dijit/_TemplatedMixin",
"dijit/_WidgetsInTemplateMixin",
"dijit/layout/TabContainer",
"dijit/layout/ContentPane",
"epi/routes",
"epi-packaging/UploadResults",
"epi-packaging/SelectedFiles",
"epi-packaging/RestartSite",
"dojox/widget/Standby",
"epi/shell/widget/HelpButton",
"dojox/form/Uploader",
"dojox/form/uploader/plugins/IFrame",
"dojo/text!./templates/PackageUpload.htm",
"epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.PackageUpload"],

function (dojo, dijit,
    _Widget, _TemplatedMixin, _WidgetsInTemplateMixin, TabContainer, ContentPane,
    routes, UploadResults, SelectedFiles, RestartSite, Standby, HelpButton, uploader, iframe, template, res) {

    return dojo.declare([_Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {
        //  summary:
        //      PackageUpload widget. Responsible for interface for uploading module packages. 
        //  description:
        //      Interface includes: button for file selection dialog, a list of selected files, 
        //      Install and Clear buttons and Upload results list after files being uploaded. 
        //      
        //      Widget requires reference to the dojox.form.Uploader plugin instantinated on a submit button inside a 
        //      form with configured action Url for posting file and enctype set to 'multipart/form-data'.
        //      Placeholders for the file list and upload results. Install and Clear buttons.

        // res: Object
        //  Resources collection objects
        res: res,

        // successMessageClass: String
        //  CSS class name for successMessage
        successMessageClass: "successInstall",

        // failureMessageClass: String
        //  CSS class name for failureMessage
        failureMessageClass: "failureInstall",

        // templateString: String
        //  Template for the widget
        templateString: template,

        // antiForgeryData: epi.modules.AntiForgeryData
        //  Contains an instance of epi.modules.AntiForgeryData with antiforgery key data.
        antiForgeryData: null,

        _uploadUrl: null,

        _uploader: null,
        _uploadResultsNode: null,
        _installButton: null,
        _clearButton: null,
        _fileListNode: null,
        _fileList: null,
        _uploadResults: null,
        _standByWidget: null,

        _uploaderResetRequired: false,

        postMixInProperties: function () {
            // tags:
            //      protected
            this._uploadUrl = routes.getActionPath({ moduleArea: 'EPiServer.Packaging.UI', controller: 'AddOns', action: 'Upload' });

            this.inherited(arguments);

        },

        startup: function () {
            // tags:
            //      protected

            if (this._started) { return; }

            // Must use the full namespace when creating the uploader. 
            // When plug-ins are added dojox.form.Uploader is re-defined, 
            // but the reference passed to our define callback isn't the same.
            this._uploader = new dojox.form.Uploader({ label: this.res.buttonselectpackage, multiple: true }, this._uploaderInput);

            // workaround for the upload button autosize
            dojo.style(this._uploader.domNode, { width: "200px" });
            this._uploader.inputNodeFontSize = 4;
            this._uploader.btnSize = { w: 200, h: 25 };
            this._uploaderResetRequired = true;
            this._uploader.startup();

            this._uploadType.value = this._uploader.uploadType;

            if (this.antiForgeryData) {
                dojo.place(this.antiForgeryData.GetTokenNode(), this._clearButton.domNode, 'after');
            }

            this._fileList = new SelectedFiles({ uploader: this._uploader }, this._fileListNode);
            this._fileList.startup();

            this._standByWidget = new Standby({ target: this._fileList.listTable });
            document.body.appendChild(this._standByWidget.domNode);
            this._standByWidget.startup();

            dojo.connect(this._uploader, "onError", this, this._onUploaderError);
            dojo.connect(this._uploader, "onComplete", this, this._onUploadComplete);
            dojo.connect(this._uploader, "onChange", this, this._onUploadChange);

            dojo.connect(this._clearButton, "onClick", this, this._onClear);
            dojo.connect(this._installButton, "onClick", this, this._onInstall);

            this._disableButtons(true);

            this.inherited(arguments);

        },

        updateView: function () {
            // summary:
            //      Updates widget according to the current application state. Should be called if widget was hidden and now is about to be shown to the user again
            // tags:
            //      public
            if (this._uploaderResetRequired) {
                this._onClear();
                this._uploaderResetRequired = false;
            }

            if (this._uploadResults) {
                this._uploadResults.destroyRecursive(false); // hide upload results if any
            }
        },

        onSiteRestartRequired: function () {
            // summary:
            //    Callback method to get notified when a site restart is required
            //
            // tags:
            //    public callback
        },

        onError: function (errorMessages) {
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

        _onClear: function () {
            // summary: 
            //    Resets the uploader to initial state. Is called when user clicks Clear button
            // tags:
            //      private
            this._uploader.reset();
            this._disableButtons(true);
            this.onModuleActionPerformed();
        },

        _onInstall: function () {
            // summary:
            //      Called when file upload starts.
            // tags:
            //      private
            console.log('Upload started');
            this._standByWidget.show();
            this.onModuleActionPerformed();
        },

        _onUploaderError: function (/* Object */evt) {
            // summary:
            //      Called when upload error occurs.
            // tags:
            //      private
            this._standByWidget.hide();
            this.onError([this.res.uploaderrormessage]);
            var headers = evt.headers;
            if (headers && headers.indexOf("X-EPiLogOnScreen") != -1) {
                window.location.reload();                
            }
        },

        _onUploadComplete: function (/* Object */data) {
            // summary:
            //      Called when upload complete.
            // tags:
            //      private
            this._standByWidget.hide();
            this._disableButtons(true);
            this._showUploadResults(data);
            this.onSiteRestartRequired();
        },

        _onUploadChange: function (/* Array */fileArray) {
            // summary:
            //      Called when a new file selected in uploader.
            // tags:
            //      private
            this._standByWidget.hide();
            if (fileArray.length > 0) {
                this._disableButtons(false);
            }

            if (this._uploadResults) {
                this._uploadResults.destroyRecursive(false);
            }
        },

        _disableButtons: function (/* bool */disabled) {
            // summary:
            //      Enables and disables buttons depending on the parameter.
            // tags:
            //      private
            this._clearButton.set('disabled', disabled);
            this._installButton.set('disabled', disabled);
        },

        _showUploadResults: function (/* Object */viewModel) {
            // summary:
            //      Displays a list of uploaded and installed packages
            // tags:
            //      private
            if (this._uploadResults) {
                this._uploadResults.destroyRecursive(false);
            }
            if (viewModel.uploadedFiles && viewModel.uploadedFiles.length > 0) {

                var uploadedFiles = dojo.map(viewModel.uploadedFiles, function (file, i) {
                    file.index = i + 1;
                    file.sizeStr = this._uploader.convertBytes(file.packageFileLength).value;
                    return file;
                }, this);

                var isInstallationSucessfull = viewModel.installationFailCount == 0;

                if (!isInstallationSucessfull) {
                    var failureMessageText = dojo.replace(this.res.failuremessage, { count: viewModel.installationFailCount });
                    this.onError([failureMessageText]);
                }
                else {
                    var successMessageText = dojo.replace(this.res.successmessage, { count: viewModel.installationSuccessCount });
                    this.onSuccess([successMessageText]);
                }

                this._uploadResults = new UploadResults({
                    files: uploadedFiles
                });
                this._uploadResultsNode.appendChild(this._uploadResults.domNode);
                this._uploadResults.startup();

                dojo.forEach(viewModel.uploadedFiles, function (file, i) {
                    if (file.packageInfo && file.packageInfo.id == "EPiServer.Packaging") {
                        console.log("Requesting reload");
                        dojo.publish("onReloadRequired");
                    }
                });
            }
        }

    });

});