require({cache:{
'url:epi-packaging/templates/Section.htm':"﻿<div style=\"overflow:auto;\">\r\n    <div data-dojo-attach-point=\"_headerPlaceholder\"></div>\r\n    <div class=\"epi-newContentContainerInverted\">\r\n        <div data-dojo-attach-point=\"_contentPlaceholder\"></div>\r\n    </div>\r\n</div>"}});
﻿define("epi-packaging/UploadSection", [
"dojo",
"dijit",
"dijit/layout/_LayoutWidget",
"dijit/_TemplatedMixin",
"epi-packaging/SectionHeader",
"epi-packaging/PackageUpload",
"dojo/text!./templates/Section.htm",
"epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.PackageUpload"],

function (dojo, dijit, _LayoutWidget, _TemplatedMixin, SectionHeader, PackageUpload, template, res) {

    return dojo.declare([_LayoutWidget, _TemplatedMixin], {
    // summary:
    //    Widget for manual uploading and installing packages.
    //
    // description:
    //    Allows manually upload and install package that is not contained in available list in gallery.
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
    _uploadWidget: null,
    _packageUpload: null,
    
    startup: function () {
        // summary:
        //    Start up the widget and it's childs.
        // tags:
        //    public
        if (this._started) {
            return;
        }

        this._headerWidget = new SectionHeader({ webHelpAlias: "uploadaddon", antiForgeryData: this.antiForgeryData,
                                                sectionTitle: this.res.uploadtitle }, this._headerPlaceholder);
        this._headerWidget.startup();

        this._packageUpload = new PackageUpload({ antiForgeryData: this.antiForgeryData }, this._contentPlaceholder);
        this._packageUpload.startup();
        this.connect(this._packageUpload, "onSiteRestartRequired", function () {
            this._headerWidget.updateView();
        });

        this.connect(this._packageUpload, "onError", function (errors) {
            this._headerWidget.addErrorMessages(errors);
        });
        this.connect(this._packageUpload, "onSuccess", function (messages) {
            this._headerWidget.addSuccessMessages(messages);
        });

        this.connect(this._packageUpload, "onModuleActionPerformed", function () {
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
        this._packageUpload.updateView();

        this._headerWidget.clearErrorMessages();
        this._headerWidget.clearSuccessMessages();
        this._headerWidget.updateView();
    }
    });
});