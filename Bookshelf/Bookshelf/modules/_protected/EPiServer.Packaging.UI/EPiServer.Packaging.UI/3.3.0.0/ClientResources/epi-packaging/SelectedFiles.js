//>>built
require({cache:{"url:epi-packaging/templates/SelectedFiles.htm":"<div class=\"dojoxUploaderFileList\" data-dojo-attach-point=\"listContainer\" style=\"display:none\">\r\n    <span>${res.fileslisttitle}</span>\r\n    <div data-dojo-attach-point=\"sizeHeader\" style=\"display:none;\"></div>\r\n    <table class=\"dojoxUploaderFileListTable epi-default\" data-dojo-attach-point=\"listTable\">\r\n        <thead>\r\n            <tr class=\"dojoxUploaderFileListHeader\">\r\n                <th class=\"dojoxUploaderIndex\">\r\n                    ${res.headerindex}\r\n                </th>\r\n                <th class=\"dojoxUploaderIcon\">\r\n                    ${res.headertype}\r\n                </th>\r\n                <th class=\"dojoxUploaderFileName\">\r\n                    ${res.headerfile}\r\n                </th>\r\n            </tr>\r\n        </thead>\r\n        <tbody data-dojo-attach-point=\"listNode\"></tbody>\r\n    </table>\r\n</div>\r\n"}});define("epi-packaging/SelectedFiles",["dojo","dijit","dojox/form/uploader/FileList","dojo/text!./templates/SelectedFiles.htm","epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.SelectedFiles"],function(_1,_2,_3,_4,_5){return _1.declare(_3,{res:_5,templateString:_4,hideProgress:function(){},showProgress:function(){},reset:function(){this.inherited(arguments);this._changeListVisibility();},_progress:function(_6){},_onUploaderChange:function(_7){this.inherited(arguments);this._changeListVisibility();},_changeListVisibility:function(){if(this.rowAmt==0){_1.style(this.listContainer,"display","none");}else{_1.style(this.listContainer,"display","block");}},_addRow:function(_8,_9,_a){var c,r=this.listNode.insertRow(-1);c=r.insertCell(-1);_1.addClass(c,"dojoxUploaderIndex");c.textContent=_8;c=r.insertCell(-1);_1.addClass(c,"dojoxUploaderIcon");c.textContent=_9;c=r.insertCell(-1);_1.addClass(c,"dojoxUploaderFileName");c.textContent=_a;this.rowAmt++;}});});