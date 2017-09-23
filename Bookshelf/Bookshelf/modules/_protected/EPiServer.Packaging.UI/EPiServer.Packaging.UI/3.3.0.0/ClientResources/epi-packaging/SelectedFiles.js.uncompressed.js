require({cache:{
'url:epi-packaging/templates/SelectedFiles.htm':"﻿<div class=\"dojoxUploaderFileList\" data-dojo-attach-point=\"listContainer\" style=\"display:none\">\r\n    <span>${res.fileslisttitle}</span>\r\n    <div data-dojo-attach-point=\"sizeHeader\" style=\"display:none;\"></div>\r\n    <table class=\"dojoxUploaderFileListTable epi-default\" data-dojo-attach-point=\"listTable\">\r\n        <thead>\r\n            <tr class=\"dojoxUploaderFileListHeader\">\r\n                <th class=\"dojoxUploaderIndex\">\r\n                    ${res.headerindex}\r\n                </th>\r\n                <th class=\"dojoxUploaderIcon\">\r\n                    ${res.headertype}\r\n                </th>\r\n                <th class=\"dojoxUploaderFileName\">\r\n                    ${res.headerfile}\r\n                </th>\r\n            </tr>\r\n        </thead>\r\n        <tbody data-dojo-attach-point=\"listNode\"></tbody>\r\n    </table>\r\n</div>\r\n"}});
﻿define("epi-packaging/SelectedFiles", [
"dojo", 
"dijit", 
"dojox/form/uploader/FileList",
"dojo/text!./templates/SelectedFiles.htm",
"epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.SelectedFiles"], 

function(dojo, dijit, FileList, template, res) {

    return dojo.declare( FileList, {
    //  summary:
    //      Displays a list of files selected in uploader.
    //      See: `dojox.form.Uploader`.
    // 

    // res: Object
    //  Resources collection objects
    res: res,
    
    // templateString: String
    //  Template for the selected files lits
    templateString: template,


    hideProgress: function () {
        // summary:
        //      Overrides base implementation to prevent progress bar from appearing since we do not support HTML5 upload for now
    },

    showProgress: function () {
        // summary:
        //      Overrides base implementation to prevent progress bar from appearing since we do not support HTML5 upload for now
    },
    
    reset: function () {
        // summary:
        //      Resets the file list and changes list visibility
        this.inherited(arguments);
        this._changeListVisibility();
    },
    _progress: function (/* Object */customEvent) {
    },
    
    _onUploaderChange: function (fileArray) {
        // summary:
        //      Changes list visibility if any file is selected in uploader
        // tags:
        //      protected
        this.inherited(arguments);
        this._changeListVisibility();
    },


    _changeListVisibility: function () {
        // summary:
        //      Changes list visibility depending on selected files count
        // tags:
        //      protected
        if (this.rowAmt == 0) {
            dojo.style(this.listContainer, "display", "none");
        }
        else {
            dojo.style(this.listContainer, "display", "block");
        }
    },
    
    _addRow: function (index, type, name) {
        // summary:
        //      Adds a new row to the file lits. Overrides default implementaion (display 3 cells instead of 4)
        // tags:
        //      protected

        var c, r = this.listNode.insertRow(-1);
        c = r.insertCell(-1);
        dojo.addClass(c, "dojoxUploaderIndex");
        c.textContent = index;

        c = r.insertCell(-1);
        dojo.addClass(c, "dojoxUploaderIcon");
        c.textContent = type;

        c = r.insertCell(-1);
        dojo.addClass(c, "dojoxUploaderFileName");
        c.textContent = name;

        this.rowAmt++;
    }
});
});