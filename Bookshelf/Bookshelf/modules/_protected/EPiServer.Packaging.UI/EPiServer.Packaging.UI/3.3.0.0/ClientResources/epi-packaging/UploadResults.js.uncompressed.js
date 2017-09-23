require({cache:{
'url:epi-packaging/templates/UploadResults.htm':"﻿<div>\r\n    <div class=\"epi-paddingVertical-small\">\r\n        <table class=\"epi-default\" dojoAttachPoint=\"installedTable\">\r\n            <thead>\r\n                <tr>\r\n                    <th>\r\n                        ${res.headerindex}\r\n                    </th>\r\n                    <th>\r\n                        ${res.headerfile}\r\n                    </th>\r\n                    <th>\r\n                        ${res.headersize}\r\n                    </th>\r\n                    <th>\r\n                        ${res.headerid}\r\n                    </th>\r\n                    <th>\r\n                        ${res.headertitle}\r\n                    </th>\r\n                    <th>\r\n                        ${res.headersummary}\r\n                    </th>\r\n                    <th>\r\n                        ${res.headerdescription}\r\n                    </th>\r\n                    <th>\r\n                        ${res.headerstatus}\r\n                    </th>\r\n                </tr>\r\n            </thead>\r\n            {% for uploadedFile in files %}\r\n            <tr>\r\n                <td>\r\n                    {{ uploadedFile.index }}\r\n                </td>\r\n                <td>\r\n                    {{ uploadedFile.packageFileName|safe }}\r\n                </td>\r\n                <td class=\"sizeColumn\">\r\n                    {{ uploadedFile.sizeStr }}\r\n                </td>\r\n\r\n                {% if uploadedFile.packageInfo.isInstalled %}\r\n                <td>\r\n                    {{ uploadedFile.packageInfo.id|safe }}\r\n                </td>\r\n                <td>\r\n                    {{ uploadedFile.packageInfo.title|safe }}\r\n                </td>\r\n                <td>\r\n                    {{ uploadedFile.packageInfo.summary|safe }}\r\n                </td>\r\n                <td>\r\n                    {{ uploadedFile.packageInfo.description|safe }}\r\n                </td>\r\n                <td>\r\n                    <span class=\"dijitInline dijitIcon epi-iconCheckmark\"></span>\r\n                </td>\r\n                {% else %}\r\n                <td colspan=\"4\">\r\n                    <div class=\"epi-errorText\">\r\n                        <ul>\r\n                            {% for error in uploadedFile.errors %}\r\n                            <li>{{ error }}</li>\r\n                            {% endfor %}\r\n                        </ul>\r\n\r\n                        <ul>\r\n                            {% for error in uploadedFile.packageInfo.errors %}\r\n                            <li>{{ error }}</li>\r\n                            {% endfor %}\r\n                        </ul>\r\n                    </div>\r\n                </td>\r\n                <td class=\"failureIcon\">\r\n                </td>\r\n                {% endif %}\r\n            </tr>\r\n            {% endfor %}\r\n        </table>\r\n    </div>\r\n</div>"}});
﻿define("epi-packaging/UploadResults", [
"dojo",
"dijit",
"dijit/_Widget",
"dojox/dtl/_Templated",
"dojo/text!./templates/UploadResults.htm",
"epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.UploadResults",
//HACK: loading DTL dependency explicitly since DTL uses sync call for dojo.require
"dojox/dtl/tag/logic"],

function (dojo, dijit, _Widget, _Templated, template, res) {

    return dojo.declare([_Widget, _Templated], {
    // summary:
    //      Displays upload package results as a list of installed modules.

    // res: Object
    //  Resources collection objects
    res: res,

    // files: Array
    //  An array of objects representing one installed module 
    files: [],

    // templateString: String
    //  Template for the results list
    templateString: template,

    // _dijitTemplateCompat: Bool
    //  Indicates that template can have dijit placeholders? 
    _dijitTemplateCompat: true

    });

});