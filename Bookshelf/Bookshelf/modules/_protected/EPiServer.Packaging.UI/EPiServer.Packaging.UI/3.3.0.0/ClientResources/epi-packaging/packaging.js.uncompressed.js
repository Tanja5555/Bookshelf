require({cache:{
'epi-packaging/layers/packaging':function(){
﻿require([
    "epi-packaging/AntiForgeryData",
    "epi-packaging/DetailedView",
    "epi-packaging/GallerySection",
    "epi-packaging/InstalledSection",
    "epi-packaging/LinkButton",
    "epi-packaging/ModulesList",
    "epi-packaging/ModuleSummary",
    "epi-packaging/NavigationMenu",
    "epi-packaging/PackagesGrid",
    "epi-packaging/PackageUpload",
    "epi-packaging/RestartSite",
    "epi-packaging/RootContainer",
    "epi-packaging/SelectedFiles",
    "epi-packaging/SiteRestartWarning",
    "epi-packaging/Toolbar",
    "epi-packaging/Notification",
    "epi-packaging/UpdateableSection",
    "epi-packaging/UploadResults",
    "epi-packaging/UploadSection",
    "epi/shell/widget/ApplicationContentPane"
]);

},
'epi-packaging/AntiForgeryData':function(){
﻿define("epi-packaging/AntiForgeryData", ["dojo"], function (dojo) {

    return dojo.declare( null, {
        //  summary:
        //      Service class providing anti-forgery token data 
        //  description:
        //      This class is used to prepare an antiforgery token  data in 
        //      order pass it to the server with ajax requests. Constructors 
        //      accepts a hidden input DOM node with token data like 
        //      '<input type="hidden" name="__RequestVerificationToken" value="wJF%2FzXkZOnT..." />',
        //      generated in murkup on server. DOM node, input name and value is parsed 
        //      and stored within instance fields. 


        _keyName: null,
        _keyValue: null,
        _antiForgeryToken: null,

        constructor: function (/*DomNode*/antiForgeryTokenNode) {
            // summary:
            //      Creates a new instance and fill its fields with 
            //      data parsed from specified input DOM node
            // tags:
            //      public

            // extracting antiforgery input name and value 
            var keyDiv = dojo.create('div');
            this._antiForgeryToken = antiForgeryTokenNode;
            keyDiv.innerHTML = this._antiForgeryToken;
            var afInput = dojo.query('input', keyDiv)[0];
            this._keyName = dojo.attr(afInput, 'name');
            this._keyValue = dojo.attr(afInput, 'value');

        },

        GetKeyName: function () {
            // summary:
            //      Gets the tokens key name
            // tags:
            //      public
            return this._keyName;
        },

        GetKeyValue: function () {
            // summary:
            //      Gets the tokens key value
            // tags:
            //      public
            return this._keyValue;
        },

        GetTokenNode: function () {
            // summary:
            //      Gets the tokens hidden input DOM node
            // tags:
            //      public
            return this._antiForgeryToken;
        },

        AddAntiforgeryToken: function (/*Object*/content) {
            // summary:
            //      Performs a mixin of antiforgery token key name and value to the specified 
            //      content object.
            // tags:
            //      public
            var keyData = {};
            keyData[this._keyName] = this._keyValue;
            dojo.mixin(content, keyData);
            return content;
        }

    });

});

},
'epi-packaging/DetailedView':function(){
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

},
'url:epi-packaging/templates/DetailedView.htm':"﻿<div class=\"epi-packaging-detailedViewContainer epi-TabContainerWrapper\" data-dojo-attach-point=\"contentContainer\">\r\n    <div data-dojo-attach-point=\"tabContainer\" data-dojo-type=\"dijit/layout/TabContainer\">\r\n        <div class=\"epi-dialogPadding\" data-dojo-type=\"dijit/layout/ContentPane\" title=\"${res.tab.title.overview}\"  selected=\"true\">\r\n            <h4>${res.tab.content.about}</h4>\r\n            <p data-dojo-attach-point=\"overviewAboutContent\"></p>\r\n            \r\n            <h4>${res.tab.content.releasenotes}</h4>\r\n            <p data-dojo-attach-point=\"overviewReleaseNotesContent\"></p>\r\n            <span style=\"display:block\">\r\n                <h4>${res.tab.content.installationmode.title}</h4>\r\n                <p data-dojo-attach-point=\"overviewInstallationModeNotesContent\"></p>\r\n            </span>\r\n        </div>\r\n        <div class=\"epi-dialogPadding\" data-dojo-type=\"dijit/layout/ContentPane\" title=\"${res.tab.title.specs}\">\r\n            <ul data-dojo-attach-point=\"specItemList\"></ul>\r\n        </div>\r\n        <div class=\"epi-dialogPadding epi-dependenciesTabContainer\" data-dojo-type=\"dijit/layout/ContentPane\" title=\"${res.tab.title.dependencies}\">\r\n            <div data-dojo-attach-point=\"dependenciesContent\"></div>\r\n            <div data-dojo-attach-point=\"dependenciesList\" data-dojo-type=\"epi-packaging/DependenciesGrid\"></div>\r\n        </div>\r\n    </div>\r\n</div>",
'epi-packaging/DependenciesGrid':function(){
﻿define("epi-packaging/DependenciesGrid", [
    "dojo/_base/declare",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dijit/_WidgetBase",
    "dgrid/Grid",
    "dgrid/extensions/DijitRegistry",
    "dgrid/extensions/ColumnResizer",
    "dijit/layout/ContentPane",
    "epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.DetailedView.Tab.Dependencies"],

function (declare, domStyle, domConstruct, _WidgetBase, Grid, DijitRegistry, ColumnResizer, ContentPane, res) {

    return declare([_WidgetBase], {
        // Summary:
        //      This component will list all dependencies of a package

        res: res,

        data: null,
        gridWidget: null,

        postCreate: function()
        {
            this.inherited(arguments);
            var gridWrapperDiv = domConstruct.create('div');
            domConstruct.place(gridWrapperDiv, this.domNode);
            var gridContainer = domConstruct.create('div', null, gridWrapperDiv);
            var columns = {
                name: { label: res.name },
                version: { label: res.version },
                releasedBy: { label: res.releasedby }
            };

            this.gridWidget = new (declare([Grid, DijitRegistry, ColumnResizer]))({ columns: columns }, gridContainer);
        },

        startup: function () {
            // summary:
            //      Overridden to connect a store to a DataGrid

            if (this._started) {
                return;
            }

            this.inherited(arguments);

            // If data is empty then grid set display none
            if (this.data && this.data.length > 0) {
                this.gridWidget.renderArray(this.data);
            }
            else {
                domStyle.set(this.gridWidget.domNode, { display: "none" });
            }
        },

        resize: function (changeSize) {
            // summary:
            //      Resize component
            this.inherited(arguments);
            this.gridWidget.resize(changeSize);
        }
    });
});

},
'dgrid/extensions/ColumnResizer':function(){
define("dgrid/extensions/ColumnResizer", ["dojo/_base/declare", "dojo/on", "dojo/query", "dojo/_base/lang", "dojo/dom", "dojo/dom-geometry", "dojo/has", "../util/misc", "put-selector/put", "dojo/_base/html", "xstyle/css!../css/extensions/ColumnResizer.css"],
function(declare, listen, query, lang, dom, geom, has, miscUtil, put){

function addRowSpan(table, span, startRow, column, id){
	// loop through the rows of the table and add this column's id to
	// the rows' column
	for(var i=1; i<span; i++){
		table[startRow+i][column] = id;
	}
}
function subRowAssoc(subRows){
	// Take a sub-row structure and output an object with key=>value pairs
	// The keys will be the column id's; the values will be the first-row column
	// that column's resizer should be associated with.

	var i = subRows.length,
		l = i,
		numCols = subRows[0].length,
		table = new Array(i);

	// create table-like structure in an array so it can be populated
	// with row-spans and col-spans
	while(i--){
		table[i] = new Array(numCols);
	}

	var associations = {};

	for(i=0; i<l; i++){
		var row = table[i],
			subRow = subRows[i];

		// j: counter for table columns
		// js: counter for subrow structure columns
		for(var j=0, js=0; j<numCols; j++){
			var cell = subRow[js], k;

			// if something already exists in the table (row-span), skip this
			// spot and go to the next
			if(typeof row[j] != "undefined"){
				continue;
			}
			row[j] = cell.id;

			if(cell.rowSpan && cell.rowSpan > 1){
				addRowSpan(table, cell.rowSpan, i, j, cell.id);
			}

			// colSpans are only applicable in the second or greater rows
			// and only if the colSpan is greater than 1
			if(i>0 && cell.colSpan && cell.colSpan > 1){
				for(k=1; k<cell.colSpan; k++){
					// increment j and assign the id since this is a span
					row[++j] = cell.id;
					if(cell.rowSpan && cell.rowSpan > 1){
						addRowSpan(table, cell.rowSpan, i, j, cell.id);
					}
				}
			}
			associations[cell.id] = subRows[0][j].id;
			js++;
		}
	}

	return associations;
}

function resizeColumnWidth(grid, colId, width, parentType, doResize){
	// don't react to widths <= 0, e.g. for hidden columns
	if(width <= 0){ return; }

	var column = grid.columns[colId],
		event,
		rule;
	
	if(!column){
		return;
	}
	
	event = {
		grid: grid,
		columnId: colId,
		width: width,
		bubbles: true,
		cancelable: true
	};
	
	if(parentType){
		event.parentType = parentType;
	}
	
	if(!grid._resizedColumns || listen.emit(grid.headerNode, "dgrid-columnresize", event)){
		// Update width on column object, then convert value for CSS
		if(width === "auto"){
			delete column.width;
		}else{
			column.width = width;
			width += "px";
		}
		
		rule = grid._columnSizes[colId];
		
		if(rule){
			// Modify existing, rather than deleting + adding
			rule.set("width", width);
		}else{
			// Use miscUtil function directly, since we clean these up ourselves anyway
			rule = miscUtil.addCssRule("#" + miscUtil.escapeCssIdentifier(grid.domNode.id) +
				" .dgrid-column-" + miscUtil.escapeCssIdentifier(colId, "-"),
				"width: " + width + ";");
		}

		// keep a reference for future removal
		grid._columnSizes[colId] = rule;
		
		if(doResize !== false){
			grid.resize();
		}
		
		return true;
	}
}

// Functions for shared resizer node

var resizerNode, // DOM node for resize indicator, reused between instances
	resizableCount = 0; // Number of ColumnResizer-enabled grid instances
var resizer = {
	// This object contains functions for manipulating the shared resizerNode
	create: function(){
		resizerNode = put("div.dgrid-column-resizer");
	},
	destroy: function(){
		put(resizerNode, "!");
		resizerNode = null;
	},
	show: function(grid){
		var pos = geom.position(grid.domNode, true);
		resizerNode.style.top = pos.y + "px";
		resizerNode.style.height = pos.h + "px";
		put(document.body, resizerNode);
	},
	move: function(x){
		resizerNode.style.left = x + "px";
	},
	hide: function(){
		resizerNode.parentNode.removeChild(resizerNode);
	}
};

return declare(null, {
	resizeNode: null,
	
	// minWidth: Number
	//		Minimum column width, in px.
	minWidth: 40,
	
	// adjustLastColumn: Boolean
	//		If true, adjusts the last column's width to "auto" at times where the
	//		browser would otherwise stretch all columns to span the grid.
	adjustLastColumn: true,
	
	_resizedColumns: false, // flag indicating if resizer has converted column widths to px
	
	buildRendering: function(){
		this.inherited(arguments);
		
		// Create resizerNode when first grid w/ ColumnResizer is created
		if(!resizableCount++){
			resizer.create();
		}
	},
	
	destroy: function(){
		this.inherited(arguments);
		
		// Remove any applied column size styles since we're tracking them directly
		for(var name in this._columnSizes){
			this._columnSizes[name].remove();
		}
		
		// If this is the last grid on the page with ColumnResizer, destroy the
		// shared resizerNode
		if(!--resizableCount){
			resizer.destroy();
		}
	},
	
	resizeColumnWidth: function(colId, width){
		// Summary:
		//      calls grid's styleColumn function to add a style for the column
		// colId: String
		//      column id
		// width: Integer
		//      new width of the column
		return resizeColumnWidth(this, colId, width);
	},
	
	configStructure: function(){
		var oldSizes = this._oldColumnSizes = lang.mixin({}, this._columnSizes), // shallow clone
			k;
		
		this._resizedColumns = false;
		this._columnSizes = {};
		
		this.inherited(arguments);
		
		// Remove old column styles that are no longer relevant; this is specifically
		// done *after* calling inherited so that _columnSizes will contain keys
		// for all columns in the new structure that were assigned widths.
		for(k in oldSizes){
			if(!(k in this._columnSizes)){
				oldSizes[k].remove();
			}
		}
		delete this._oldColumnSizes;
	},
	
	_configColumn: function(column){
		this.inherited(arguments);
		
		var colId = column.id,
			rule;
		
		if("width" in column){
			// Update or add a style rule for the specified width
			if((rule = this._oldColumnSizes[colId])){
				rule.set("width", column.width + "px");
			}else{
				rule = miscUtil.addCssRule("#" + miscUtil.escapeCssIdentifier(this.domNode.id) +
					" .dgrid-column-" + miscUtil.escapeCssIdentifier(colId, "-"),
					"width: " + column.width + "px;");
			}
			this._columnSizes[colId] = rule;
		}
	},
	
	renderHeader: function(){
		this.inherited(arguments);
		
		var grid = this;
		
		var assoc;
		if(this.columnSets && this.columnSets.length){
			var csi = this.columnSets.length;
			while(csi--){
				assoc = lang.mixin(assoc||{}, subRowAssoc(this.columnSets[csi]));
			}
		}else if(this.subRows && this.subRows.length > 1){
			assoc = subRowAssoc(this.subRows);
		}

		var colNodes = query(".dgrid-cell", grid.headerNode),
			i = colNodes.length;
		while(i--){
			var colNode = colNodes[i],
				id = colNode.columnId,
				col = grid.columns[id],
				childNodes = colNode.childNodes,
				resizeHandle;

			if(!col || col.resizable === false){ continue; }

			var headerTextNode = put("div.dgrid-resize-header-container");
			colNode.contents = headerTextNode;

			// move all the children to the header text node
			while(childNodes.length > 0){
				put(headerTextNode, childNodes[0]);
			}

			resizeHandle = put(colNode, headerTextNode, "div.dgrid-resize-handle.resizeNode-" +
				miscUtil.escapeCssIdentifier(id, "-"));
			resizeHandle.columnId = assoc && assoc[id] || id;
		}

		if(!grid.mouseMoveListen){
			// establish listeners for initiating, dragging, and finishing resize
			listen(grid.headerNode,
				".dgrid-resize-handle:mousedown" +
					(has("touch") ? ",.dgrid-resize-handle:touchstart" : ""),
				function(e){
					grid._resizeMouseDown(e, this);
					grid.mouseMoveListen.resume();
					grid.mouseUpListen.resume();
				}
			);
			grid._listeners.push(grid.mouseMoveListen = listen.pausable(document,
				"mousemove" + (has("touch") ? ",touchmove" : ""),
				miscUtil.throttleDelayed(function(e){ grid._updateResizerPosition(e); })
			));
			grid._listeners.push(grid.mouseUpListen = listen.pausable(document,
				"mouseup" + (has("touch") ? ",touchend" : ""),
				function(e){
					grid._resizeMouseUp(e);
					grid.mouseMoveListen.pause();
					grid.mouseUpListen.pause();
				}
			));
			// initially pause the move/up listeners until a drag happens
			grid.mouseMoveListen.pause();
			grid.mouseUpListen.pause();
		}
	}, // end renderHeader

	_resizeMouseDown: function(e, target){
		// Summary:
		//      called when mouse button is pressed on the header
		// e: Object
		//      mousedown event object
		
		// preventDefault actually seems to be enough to prevent browser selection
		// in all but IE < 9.  setSelectable works for those.
		e.preventDefault();
		dom.setSelectable(this.domNode, false);
		this._startX = this._getResizeMouseLocation(e); //position of the target
		
		this._targetCell = query(".dgrid-column-" + miscUtil.escapeCssIdentifier(target.columnId, "-"),
			this.headerNode)[0];

		// Show resizerNode after initializing its x position
		this._updateResizerPosition(e);
		resizer.show(this);
	},
	_resizeMouseUp: function(e){
		// Summary:
		//      called when mouse button is released
		// e: Object
		//      mouseup event object
		
		var columnSizes = this._columnSizes,
			colNodes, colWidths, gridWidth;
		
		if(this.adjustLastColumn){
			// For some reason, total column width needs to be 1 less than this
			gridWidth = this.headerNode.clientWidth - 1;
		}
		
		//This is used to set all the column widths to a static size
		if(!this._resizedColumns){
			colNodes = query(".dgrid-cell", this.headerNode);
			
			if(this.columnSets && this.columnSets.length){
				colNodes = colNodes.filter(function(node){
					var idx = node.columnId.split("-");
					return idx[0] == "0" && !(node.columnId in columnSizes);
				});
			}else if(this.subRows && this.subRows.length > 1){
				colNodes = colNodes.filter(function(node){
					return node.columnId.charAt(0) == "0" && !(node.columnId in columnSizes);
				});
			}
			
			// Get a set of sizes before we start mutating, to avoid
			// weird disproportionate measures if the grid has set
			// column widths, but no full grid width set
			colWidths = colNodes.map(function(colNode){
				return colNode.offsetWidth;
			});
			
			// Set a baseline size for each column based on
			// its original measure
			colNodes.forEach(function(colNode, i){
				resizeColumnWidth(this, colNode.columnId, colWidths[i], null, false);
			}, this);
			
			this._resizedColumns = true;
		}
		dom.setSelectable(this.domNode, true);
		
		var cell = this._targetCell,
			delta = this._getResizeMouseLocation(e) - this._startX, //final change in position of resizer
			newWidth = cell.offsetWidth + delta, //the new width after resize
			obj = this._getResizedColumnWidths(),//get current total column widths before resize
			totalWidth = obj.totalWidth,
			lastCol = obj.lastColId,
			lastColWidth = query(".dgrid-column-" + miscUtil.escapeCssIdentifier(lastCol, "-"),
				this.headerNode)[0].offsetWidth;
		
		if(newWidth < this.minWidth){
			//enforce minimum widths
			newWidth = this.minWidth;
		}
		
		if(resizeColumnWidth(this, cell.columnId, newWidth, e.type)){
			if(cell.columnId != lastCol && this.adjustLastColumn){
				if(totalWidth + delta < gridWidth) {
					//need to set last column's width to auto
					resizeColumnWidth(this, lastCol, "auto", e.type);
				}else if(lastColWidth-delta <= this.minWidth) {
					//change last col width back to px, unless it is the last column itself being resized...
					resizeColumnWidth(this, lastCol, this.minWidth, e.type);
				}
			}
		}
		resizer.hide();
		
		// Clean up after the resize operation
		delete this._startX;
		delete this._targetCell;
	},
	
	_updateResizerPosition: function(e){
		// Summary:
		//      updates position of resizer bar as mouse moves
		// e: Object
		//      mousemove event object

		if(!this._targetCell){ return; } // Release event was already processed
		
		var mousePos = this._getResizeMouseLocation(e),
			delta = mousePos - this._startX, //change from where user clicked to where they drag
			width = this._targetCell.offsetWidth,
			left = mousePos;
		if(width + delta < this.minWidth){ 
			left = this._startX - (width - this.minWidth); 
		}
		resizer.move(left);
	},

	_getResizeMouseLocation: function(e){
		//Summary:
		//      returns position of mouse relative to the left edge
		// e: event object
		//      mouse move event object
		var posX = 0;
		if(e.pageX){
			posX = e.pageX;
		}else if(e.clientX){
			posX = e.clientX + document.body.scrollLeft +
				document.documentElement.scrollLeft;
		}
		return posX;
	},
	_getResizedColumnWidths: function (){
		//Summary:
		//      returns object containing new column width and column id
		var totalWidth = 0,
			colNodes = query(
				(this.columnSets ? ".dgrid-column-set-cell " : "") + "tr:first-child .dgrid-cell",
				this.headerNode);

		var i = colNodes.length;
		if(!i){ return {}; }

		var lastColId = colNodes[i-1].columnId;

		while(i--){
			totalWidth += colNodes[i].offsetWidth;
		}
		return {totalWidth: totalWidth, lastColId: lastColId};
	}
});
});

},
'epi-packaging/GallerySection':function(){
require({cache:{
'url:epi-packaging/templates/Section.htm':"﻿<div style=\"overflow:auto;\">\r\n    <div data-dojo-attach-point=\"_headerPlaceholder\"></div>\r\n    <div class=\"epi-newContentContainerInverted\">\r\n        <div data-dojo-attach-point=\"_contentPlaceholder\"></div>\r\n    </div>\r\n</div>"}});
﻿define("epi-packaging/GallerySection", [
"dojo",
"dijit",
"dijit/layout/_LayoutWidget",
"dijit/_TemplatedMixin",
"epi/routes",
"epi-packaging/SectionHeader",
"epi-packaging/ModulesList",
"dojo/text!./templates/Section.htm",
"epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.GallerySection",
"epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.Feeds"],

function (dojo, dijit, _LayoutWidget, _TemplatedMixin, routes, SectionHeader, ModulesList, template, res, resFeeds) {

    return dojo.declare([_LayoutWidget, _TemplatedMixin], {
        // summary:
        //    Add-on gallery widget.
        //
        // description:
        //    Displays the list of available add-ons in gallery and local repository.
        //
        // tags:
        //    public

        /*
        Attributes
        */
        // res: Object
        //  Resources collection objects
        res: res,

        // resFeeds: Object
        //  Resources collection objects for feeds
        resFeeds: resFeeds,

        // templateString: [protected] String
        //    Template for the widget.
        templateString: template,

        // antiForgeryData: [public] Object
        //    Anti forgery data object.
        antiForgeryData: null,

        _headerWidget: null,
        _listWidget: null,

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

            this._headerWidget = new SectionHeader({ webHelpAlias: "availableaddons", antiForgeryData: this.antiForgeryData,
                sectionTitle: this.res.title }, this._headerPlaceholder);
            this._headerWidget.startup();

            this._listWidget = new ModulesList({ antiForgeryData: this.antiForgeryData, hideModuleInListOnAction: false, emptyListMessage: this.res.emptylistmessage,
                listingUrl: routes.getActionPath({ moduleArea: 'EPiServer.Packaging.UI', controller: 'AddOns', action: 'GetInstallableModules' })
            }, this._contentPlaceholder);
            this._listWidget.startup();
            this.connect(this._listWidget, "onSiteRestartRequired", function () {
                this._headerWidget.updateView();
            });

            this.connect(this._listWidget, "onError", function (errors) {
                this._headerWidget.addErrorMessages(errors);
            });
            this.connect(this._listWidget, "onSuccess", function (messages) {
                this._headerWidget.addSuccessMessages(messages);
            });

            this.connect(this._listWidget, "onModuleActionPerformed", function () {
                this._headerWidget.clearErrorMessages();
                this._headerWidget.clearSuccessMessages();
            });

            this.inherited(arguments);
        },

        /*
        Custom functions
        */

        updateView: function (data) {
            // summary:
            //    Updates widget view.
            //
            // tags:
            //    public

            var resFeed = this.resFeeds[data.feedName.toLowerCase()];
            this._headerWidget.sectionTitle = resFeed ? resFeed.title : data.feedName;
            this._headerWidget.description = resFeed ? resFeed.description : "";
            this._headerWidget.clearErrorMessages();
            this._headerWidget.clearSuccessMessages();
            this._headerWidget.updateView();
            this._listWidget.feedName = data.feedName;
            this._listWidget.updateView();
        }
    });
});
},
'epi-packaging/SectionHeader':function(){
﻿define([
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
},
'epi-packaging/StatusMessageList':function(){
﻿define([
"dojo",
"dijit",
"dijit/_Widget",
"dijit/_TemplatedMixin",

"epi"],

function (dojo, dijit, _Widget, _TemplatedMixin, epi) {

    return dojo.declare([_Widget, _TemplatedMixin], {
        // summary:
        //    Status Message List widget
        //
        // description:
        //    Displays a list of status messages, as a summary of the results for actions performed.
        //
        // tags:
        //    public


        // templateString: [protected] String
        //    Template for the widget.
        templateString: "<div><ul data-dojo-attach-point=\"_errorList\"></ul></div>",
        messages: [],
        
        render: function () {
            // summary:
            //    Render function.
            //
            // tags:
            //    public
            dojo.empty(this._errorList);

            if (this.messages.length > 0) {
                dojo.forEach(this.messages, function (message) {
                    var li = dojo.create('li');
                    li.innerHTML = message;
                    this._errorList.appendChild(li);
                }, this);
                dojo.style(this.domNode, "display", "block");
            }
            else {
                dojo.style(this.domNode, "display", "none");
            }
        },

        addMessages: function (messages) {
            // summary:
            //    Adds status messages.
            //
            // tags:
            //    public

            for (i in messages) {
                this.messages.push(messages[i]);
            }
            this.render();
        },

        clearMessages: function () {
            // summary:
            //    Clears all status messages.
            //
            // tags:
            //    public

            this.messages = [];
            this.render();
        }
    });
});
},
'epi-packaging/RestartSite':function(){
﻿define("epi-packaging/RestartSite", [
"dojo",
"dijit",
"epi/routes",
"dijit/_Widget",
"dijit/_TemplatedMixin",
"dijit/_WidgetsInTemplateMixin",
"dojox/widget/Standby",
"epi/shell/XhrWrapper",
"dojo/text!./templates/RestartSite.htm",
"epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.RestartSite"],

function (dojo, dijit, routes, _Widget, _TemplatedMixin, _WidgetsInTemplateMixin, Standby, XhrWrapper, template, res) {

    return dojo.declare([_Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {

        // res: Object
        //  Resources collection objects
        res: res,

        // templateString: String
        //  Template for the widget
        templateString: template,

        // pingTimeout: int
        //  The amount of time in miliseconds between server requests checking if web applicaton restarted already
        pingTimeout: 5000,

        // restartUrl: string
        //  Url to the server restart action. Used to request server restart.
        restartUrl: null,

        // checkStatusUrl: string
        //  Url to the server check status action. Used to verify if server restarted already or not.
        checkStatusUrl: null,

        // antiForgeryToken: DomNode
        //  Hidden input with request antiforgery token
        antiForgeryData: null,

        _restartStandby: null,

        constructor: function () {
            if (routes) {
                this.restartUrl = routes.getActionPath({ moduleArea: 'EPiServer.Packaging.UI', controller: 'AddOns', action: 'Restart' });
                this.checkStatusUrl = routes.getActionPath({ moduleArea: 'EPiServer.Packaging.UI', controller: 'AddOns', action: 'CheckRestartRequired' });
            }

            this._xhr = new XhrWrapper();
        },

        postMixInProperties: function () {
            // tags:
            //      protected

            if (!this.restartUrl) {
                console.error('restartUrl is not specified');
            }
            if (!this.checkStatusUrl) {
                console.error('checkStatusUrl is not specified');
            }

            this.inherited(arguments);
        },

        startup: function () {
            // tags:
            //      public

            dojo.connect(this.restartButton, 'onClick', this, function () {
                this._requestRestart();
            });

            this.inherited(arguments);
        },

        hide: function () {
            // summary:
            //  Hides restart required message
            // tags:
            //      public
            dojo.style(this.domNode, 'display', 'none');
        },

        show: function () {
            // summary:
            //  Shows restart required message
            // tags:
            //      public
            dojo.style(this.domNode, 'display', 'block');
        },

        showIfRestartRequired: function () {
            // summary:
            //  Toggle restart required message depending on the current restart required status.
            //  A server request performed in order to check the status.
            // tags:
            //      public
            var content = {};
            this.antiForgeryData.AddAntiforgeryToken(content);
            this._xhr.xhrPost({
                content: content,
                url: this.checkStatusUrl,
                handleAs: "json",
                load: dojo.hitch(this, function (response) {
                    // To make sure we have real response from server.
                    if (!response) {
                        return;
                    }
                    else {
                        console.log('Results of check if restart is required:' + response.restartRequired);
                        if (response.restartRequired == true) {
                            this.show();

                        }
                        else {
                            this.hide();
                        }
                        this.onRestartCheckComplete(response.restartRequired == true);
                    }
                }),
                error: dojo.hitch(this, function (err, ioargs) {
                    console.log('Checking if site requires restart. Error occured: ' + err);
                    dojo.publish("onServerError", [ioargs]);
                    this.hide();
                })
            });
        },

        onRestartFinished: function () {
            // summary:
            //    Callback method to get notified when restart complete successfully
            //
            // tags:
            //    public callback
        },

        onRestartCheckComplete: function (restartRequired) {
            // summary:
            //    Callback method to get notified when restart check is complete
            //
            // tags:
            //    public callback
        },

        _requestRestart: function () {
            // summary:
            //  Make server request with restart requirement
            // tags:
            //  protected
            console.log('Requesting restart');
            if (!this._restartStandby) {
                this._restartStandby = new Standby({ target: this.domNode });
                document.body.appendChild(this._restartStandby.domNode);
                this._restartStandby.startup();
            }
            this._restartStandby.show();

            var content = {};
            this.antiForgeryData.AddAntiforgeryToken(content);

            this._xhr.xhrPost({
                content: content,
                // The URL of the request
                url: this.restartUrl,
                // The success handler
                handleAs: "json",
                load: dojo.hitch(this, function (response, ioArgs) {
                    console.log('Restart request processed. Status ' + ioArgs.xhr.status);
                    if (response.restartRequired) {
                        this.counter = 0;
                        this._ping();
                    }
                    else {
                        this._restartStandby.hide();
                        alert(this.res.restartfailedmessage);
                    }
                }),
                // The error handler
                error: dojo.hitch(this, function (err, ioargs) {
                    console.log('Restart request failed: ' + err);
                    this._restartStandby.hide();
                    dojo.publish("onServerError", [ioargs]);
                }),
                // The complete handler
                handle: function () {
                }
            });
        },


        _ping: function () {
            // summary:
            //  Checks server status - is it restarted already or not
            // tags:
            //  protected
            this.counter++;
            if (this.counter > 100) { // about 10 minutes passed - maybe we need to request a restart again?
                this._restartStandby.hide(); // hiding progress - user will se a restart required message again
                return;
            }

            setTimeout(dojo.hitch(this, function () {
                var content = {};
                this.antiForgeryData.AddAntiforgeryToken(content);

                this._xhr.xhrPost({
                    content: content,
                    url: this.checkStatusUrl,
                    handleAs: "json",
                    load: dojo.hitch(this, function (response, ioArgs) {
                        console.log("RestartRequired=" + response.restartRequired + ", counter = " + this.counter + ", status " + ioArgs.xhr.status);
                        if (response.restartRequired == true) {
                            this._ping(); // ping again
                        }
                        else {
                            console.log('Restart finished');
                            this._restartStandby.hide();
                            this.hide();
                            this.onRestartFinished();
                        }
                    }),
                    error: dojo.hitch(this, function (err, ioargs) {
                        console.log('Checking site after reload is in progress. Previous attempt returned an error: ' + err);
                        if (ioargs.xhr.status == 500) {// most probably the site is broken after restart
                            this._restartStandby.hide();
                            dojo.publish("onServerError", [ioargs]);
                        }
                        else { // on other erros (404 etc) continue to ping it
                            this._ping(); // repeat request
                        }

                    })
                });
            }), this.pingTimeout);
        }

    });

});

},
'url:epi-packaging/templates/RestartSite.htm':"﻿<div style=\"display: none;\" class=\"restartContainer\">\r\n    <span>${res.restartrequiredmessage}</span>\r\n    <input type=\"button\" dojoAttachPoint=\"restartButton\" data-dojo-type=\"dijit/form/Button\" label=\"${res.restartbuttonlabel}\"/>\r\n</div>",
'url:epi-packaging/templates/SectionHeader.htm':"﻿<div style=\"overflow: auto;\">\r\n    <div class=\"epi-listingTopContainer\" data-dojo-attach-point=\"selectTypeNode\">\r\n        <h1 data-dojo-attach-point=\"_titleNode\">\r\n            ${sectionTitle}</h1>\r\n        <div data-dojo-attach-point=\"_descriptionNode\">\r\n            ${description}</div>\r\n        <div data-dojo-attach-point=\"_restartPlaceholder\">\r\n        </div>\r\n        <div data-dojo-attach-point=\"_successMessageList\" data-dojo-type=\"epi-packaging/StatusMessageList\"\r\n            class=\"epi-packaging-validationSummary epi-packaging-Note\">\r\n        </div>\r\n        <div data-dojo-attach-point=\"_errorMessageList\" data-dojo-type=\"epi-packaging/StatusMessageList\"\r\n            class=\"epi-errorText epi-packaging-validationSummary epi-packaging-Error\">\r\n        </div>\r\n        <div class=\"epi-packaging-preload-error\">\r\n        </div>\r\n        <div class=\"epi-packaging-preload-success\">\r\n        </div>\r\n    </div>\r\n</div>\r\n",
'epi-packaging/ModulesList':function(){
﻿define("epi-packaging/ModulesList", [
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

},
'epi-packaging/ModuleSummary':function(){
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

},
'url:epi-packaging/templates/ModuleSummary.htm':"﻿<div data-dojo-attach-event=\"ondijitclick:_moreInfoClick\" data-dojo-attach-point=\"moduleItemContainer\">\r\n    <div class=\"epi-browserWindow\"><div class=\"epi-browserWindowContent\" data-dojo-attach-point=\"moduleIcon\">${emptyIconTemplate}</div></div>\r\n    <h3 data-dojo-attach-point=\"nameNode\">${module.titleWithVersion}</h3>\r\n    <p data-dojo-attach-point=\"updateIndicatorContainer\"><span class=\"epi-newContentNotification\">${res.newerversionavailablemessage}</span><span data-dojo-attach-point=\"updateIndicatorVersion\"></span></p>\r\n    <p data-dojo-attach-point=\"disabledIndicatorContainer\"><span class=\"epi-packaging-indicator epi-packaging-indicator--disabled\">${res.disabledmessage}</span></p>\r\n    <p data-dojo-attach-point=\"descriptionNode\">${module.description}</p><p><a href=\"#details\" data-dojo-attach-event=\"ondijitclick:_moreInfoClick\">${res.moreinformation}</a></p>\r\n\r\n    <p data-dojo-attach-point=\"dependenciesList\"><strong class=\"label\">${res.dependencies} </strong></p>\r\n    <p data-dojo-attach-point=\"tagList\"><strong class=\"label\">${res.tags} </strong></p>\r\n    <p data-dojo-attach-point=\"installInfoBlock\"></p>\r\n    <div data-dojo-attach-point=\"errorList\" data-dojo-type=\"epi-packaging/StatusMessageList\" class=\"epi-advancedListingError\"></div>\r\n    <input type=\"button\" data-dojo-type=\"dijit/form/Button\" label=\"${res.buttoninstalllabel}\" title=\"${res.buttoninstalllabel} ${module.titleWithVersion}\" class=\"moduleActionButton\" data-dojo-attach-event=\"onClick:_installClick\" data-dojo-attach-point=\"InstallButton\" />\r\n    <input type=\"button\" data-dojo-type=\"dijit/form/Button\" label=\"${res.buttonupdatelabel}\" title=\"${res.buttonupdatelabel} ${module.titleWithVersion}\" class=\"moduleActionButton\" data-dojo-attach-event=\"onClick:_updateClick\" data-dojo-attach-point=\"UpdateButton\" />\r\n    <input type=\"button\" data-dojo-type=\"dijit/form/Button\" label=\"${res.buttonenablelabel}\" title=\"${res.buttonenablelabel} ${module.titleWithVersion}\" class=\"moduleActionButton\" data-dojo-attach-event=\"onClick:_enableClick\" data-dojo-attach-point=\"EnableButton\" />\r\n    <input type=\"button\" data-dojo-type=\"dijit/form/Button\" label=\"${res.buttondisablelabel}\" title=\"${res.buttondisablelabel} ${module.titleWithVersion}\" class=\"moduleActionButton\" data-dojo-attach-event=\"onClick:_disableClick\" data-dojo-attach-point=\"DisableButton\" />\r\n    <input type=\"button\" data-dojo-type=\"dijit/form/Button\" label=\"${res.buttonuninstalllabel}\" title=\"${res.buttonuninstalllabel} ${module.titleWithVersion}\" class=\"moduleActionButton\" data-dojo-attach-event=\"onClick:_uninstallClick\" data-dojo-attach-point=\"UninstallButton\" />\r\n</div>",
'url:epi-packaging/templates/Section.htm':"﻿<div style=\"overflow:auto;\">\r\n    <div data-dojo-attach-point=\"_headerPlaceholder\"></div>\r\n    <div class=\"epi-newContentContainerInverted\">\r\n        <div data-dojo-attach-point=\"_contentPlaceholder\"></div>\r\n    </div>\r\n</div>",
'epi-packaging/InstalledSection':function(){
require({cache:{
'url:epi-packaging/templates/Section.htm':"﻿<div style=\"overflow:auto;\">\r\n    <div data-dojo-attach-point=\"_headerPlaceholder\"></div>\r\n    <div class=\"epi-newContentContainerInverted\">\r\n        <div data-dojo-attach-point=\"_contentPlaceholder\"></div>\r\n    </div>\r\n</div>"}});
﻿define("epi-packaging/InstalledSection", [
    "dojo/_base/declare",
    "dojo/dom-geometry",
    "dojo/text!./templates/Section.htm",
    "dijit/_TemplatedMixin",
    "dijit/layout/_LayoutWidget",
    "epi/routes",
    "epi-packaging/SectionHeader",
    "epi-packaging/PackagesGrid",
    "epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.InstalledSection"
], function (
    declare,
    domGeometry,
    template,
    _TemplatedMixin,
    _LayoutWidget,
    routes,
    SectionHeader,
    PackagesGrid,
    resources
) {

    return declare([_LayoutWidget, _TemplatedMixin], {
        // summary:
        //    Installed add-ons section widget.
        //
        // description:
        //    Displays the list of installed add-ons.
        //
        // tags:
        //    public

        /*
        Attributes
        */

        // templateString: [protected] String
        //    Template for the widget.
        templateString: template,

        // antiForgeryData: [public] Object
        //    Anti forgery data object.
        antiForgeryData: null,

        _headerWidget: null,

        _listWidget: null,

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

            var header = new SectionHeader({
                webHelpAlias: "installedaddons",
                antiForgeryData: this.antiForgeryData,
                sectionTitle: resources.title
            }, this._headerPlaceholder);

            var list = new PackagesGrid({
                antiForgeryData: this.antiForgeryData,
                listingUrl: routes.getActionPath({ moduleArea: 'EPiServer.Packaging.UI', controller: 'AddOns', action: 'GetInstalledModules' })
            }, this._contentPlaceholder);

            header.startup();
            list.startup();

            this.connect(list, "onSiteRestartRequired", function () {
                header.updateView();
            });

            this.connect(list, "onError", function (errors) {
                header.addErrorMessages(errors);
            });
            this.connect(list, "onSuccess", function (messages) {
                header.addSuccessMessages(messages);
            });

            this.connect(list, "onModuleActionPerformed", function () {
                header.clearErrorMessages();
                header.clearSuccessMessages();
            });

            this.inherited(arguments);

            this._headerWidget = header;
            this._listWidget = list;
        },

        layout: function () {
            // summary:
            //      Required override when inheriting _LayoutWidget.
            //      Called from resize
            // tags:
            //      public

            var children = this.getChildren();

            if (children && children.length == 2) {
                this._layout2Children(children[0], children[1]);
            }
        },

        _layout2Children: function (/*Widget*/child, /*Widget*/sibling) {
            // summary:
            //      Layout 2 children. Keep the first child and resize the second child to remain avaible space.
            // tags:
            //      private

            var containerHeight = domGeometry.position(this.domNode).h,
                childHeight = domGeometry.position(child.domNode).h,
                siblingHeight = containerHeight - childHeight;

            sibling.resize({ h: siblingHeight });
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
            this._headerWidget.clearErrorMessages();
            this._headerWidget.clearSuccessMessages();
            this._headerWidget.updateView();
            this._listWidget.updateView();
        }
    });
});
},
'epi-packaging/PackagesGrid':function(){
﻿define("epi-packaging/PackagesGrid", [
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

},
'epi-packaging/LinkButton':function(){
﻿define("epi-packaging/LinkButton", [
    "epi",
    "dojo",
    "dijit",
    "dijit/_Widget"],
    function (epi, dojo, dijit, _Widget) {
        return dojo.declare([_Widget], {

            // label: [public] String
            //    link label.
            label: "",

            // href: [public] String
            //    URL to put in a link href attribute.
            href: "",

            buildRendering: function () {
                // create the DOM for this widget
                this.domNode = dojo.create('a', { href: this.href, "class": this["class"], innerHTML: this.label });
            },

            postCreate: function () {
                // every time the user clicks the link, increment the counter
                this.connect(this.domNode, "onclick", this._onClick);
            },

            onClick: function (e) {
                // summary:
                //		Handler for the user clicks.
                // tags:
                //		public
                
                return true;
            },

            _onClick: function (e) {
                // summary:
                //		Internal function to handle click actions
                this.onClick(e);
            }

        });
    });

},
'epi-packaging/NavigationMenu':function(){
require({cache:{
'url:epi-packaging/templates/NavigationMenu.htm':"﻿<div class=\"epi-verticalMenu\">\r\n    <div data-dojo-type=\"dijit/DropDownMenu\" data-dojo-attach-point=\"verticalMenu\" class=\"epi-dropDownNavigation epi-wrapped\">\r\n        <div data-dojo-type=\"dijit/MenuItem\" id=\"installed\">${res.installeditemlabel}</div>\r\n        <!-- dynamic list of feeds goes here -->\r\n        <div data-dojo-type=\"dijit/MenuItem\" id=\"updates\">${res.updatesitemlabel}</div>\r\n    </div>\r\n</div>"}});
﻿define("epi-packaging/NavigationMenu", [
    "dojo",
    "dojo/hash",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/DropDownMenu",
    "dijit/MenuItem",
    "epi/routes",
    "epi/shell/XhrWrapper",
    "dojo/text!./templates/NavigationMenu.htm",
    "epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.Navigation",
    "epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.Feeds"
], function (dojo, hash, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, DropDownMenu, MenuItem, routes, XhrWrapper, template, res, resFeeds) {

    return dojo.declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin],
    {
        templateString: template,
        antiForgeryData: '',
        res: res,
        resFeeds: resFeeds,

        _viewDictionary: {
            "installed": "epi-packaging/InstalledSection",
            "updates": "epi-packaging/UpdateableSection"
        },

        constructor: function () {
            this._xhr = new XhrWrapper();
        },

        startup: function () {
            this.inherited(arguments);


            var content = {};
            this.antiForgeryData.AddAntiforgeryToken(content);
            this._xhr.xhrPost({
                content: content,
                url: routes.getActionPath({ moduleArea: 'EPiServer.Packaging.UI', controller: 'AddOns', action: 'GetFeedNames' }),
                handleAs: "json",
                load: dojo.hitch(this, function (response, ioArgs) {

                    for (var i = 0; i < response.feeds.length; i++) {
                        var feedlabel = this.resFeeds[response.feeds[i].toLowerCase()];
                        this.verticalMenu.addChild(new MenuItem({ id: response.feeds[i], label: feedlabel ? feedlabel.title : response.feeds[i] }), 1 + i);
                        this._viewDictionary[response.feeds[i]] = "epi-packaging/GallerySection";
                    }

                    var selectedItem = dijit.byId("installed");
                    if (dojo.hash() != '') {
                        var page = dijit.byId(dojo.hash());
                        if (page) {
                            selectedItem = page;
                        }
                    }

                    this.verticalMenu.onItemClick(selectedItem);
                })
            });


            dojo.connect(this.verticalMenu, 'onItemClick', this, function (item) {
                this._requestChangeView(item.id);
            });

            this.subscribe("/epi/shell/action/viewchanged", dojo.hitch(this, function (type, args, data) {
                if (data) {
                    for (var id in this._viewDictionary) {
                        if (id == data.feedName) {
                            this._selectItemById(id);
                            return;
                        }
                    }
                }
                this._selectItemById(null);
            }));

            dojo.subscribe("/dojo/hashchange", this, function (hashValue) {
                if (hashValue != '') {
                    var item = dijit.byId(hashValue);
                    if (item && !item.selected) {
                        this.verticalMenu.onItemClick(item);
                    }
                }
            });
        },

        _requestChangeView: function (id) {
            var requestedView = id ? this._viewDictionary[id] : null;
            if (requestedView) {
                dojo.publish("/epi/shell/action/changeview", [requestedView, null, { "feedName": id}]);
            }
        },

        _selectItemById: function (id) {
            dojo.forEach(this.verticalMenu.getChildren(), function (child) {
                child.set("selected", false);
            });
            if (id) {
                var item = dijit.byId(id);
                if (item) {
                    item.set("selected", true);
                    dojo.hash(item.id);
                }
            }
        }

    });
});

},
'url:epi-packaging/templates/NavigationMenu.htm':"﻿<div class=\"epi-verticalMenu\">\r\n    <div data-dojo-type=\"dijit/DropDownMenu\" data-dojo-attach-point=\"verticalMenu\" class=\"epi-dropDownNavigation epi-wrapped\">\r\n        <div data-dojo-type=\"dijit/MenuItem\" id=\"installed\">${res.installeditemlabel}</div>\r\n        <!-- dynamic list of feeds goes here -->\r\n        <div data-dojo-type=\"dijit/MenuItem\" id=\"updates\">${res.updatesitemlabel}</div>\r\n    </div>\r\n</div>",
'epi-packaging/PackageUpload':function(){
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
},
'epi-packaging/UploadResults':function(){
﻿define([
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
},
'dojox/dtl/_Templated':function(){
define("dojox/dtl/_Templated", [
	"dojo/_base/declare",
	"./_base",
	"dijit/_TemplatedMixin",
	"dojo/dom-construct",
	"dojo/cache",
	"dojo/_base/array",
	"dojo/string",
	"dojo/parser"
], function(declare,dd,TemplatedMixin, domConstruct,Cache,Array,dString,Parser){

	return declare("dojox.dtl._Templated", TemplatedMixin, {
		// summary:
		//		The base-class for DTL-templated widgets.

		_dijitTemplateCompat: false,
		
		buildRendering: function(){
			var node;

			if(this.domNode && !this._template){
				return;
			}

			if(!this._template){
				var t = this.getCachedTemplate(
					this.templatePath,
					this.templateString,
					this._skipNodeCache
				);
				if(t instanceof dd.Template) {
					this._template = t;
				}else{
					node = t.cloneNode(true);
				}
			}
			if(!node){
				var context = new dd._Context(this);
				if(!this._created){
					delete context._getter;
				}
				var nodes = domConstruct.toDom(
					this._template.render(context)
				);
				// TODO: is it really necessary to look for the first node?
				if(nodes.nodeType !== 1 && nodes.nodeType !== 3){
					// nodes.nodeType === 11
					// the node is a document fragment
					for(var i = 0, l = nodes.childNodes.length; i < l; ++i){
						node = nodes.childNodes[i];
						if(node.nodeType == 1){
							break;
						}
					}
				}else{
					// the node is an element or a text
					node = nodes;
				}
			}
			this._attachTemplateNodes(node, function(n,p){
				return n.getAttribute(p);
			});
			if(this.widgetsInTemplate){
				//Make sure dojoType is used for parsing widgets in template.
				//The Parser.query could be changed from multiversion support.
				var parser = Parser, qry, attr;
				if(parser._query != "[dojoType]"){
					qry = parser._query;
					attr = parser._attrName;
					parser._query = "[dojoType]";
					parser._attrName = "dojoType";
				}

				//Store widgets that we need to start at a later point in time
				var cw = (this._startupWidgets = Parser.parse(node, {
					noStart: !this._earlyTemplatedStartup,
					inherited: {dir: this.dir, lang: this.lang}
				}));

				//Restore the query.
				if(qry){
					parser._query = qry;
					parser._attrName = attr;
				}

				this._attachTemplateNodes(cw, function(n,p){
					return n[p];
				});
			}

			if(this.domNode){
				domConstruct.place(node, this.domNode, "before");
				this.destroyDescendants();
				domConstruct.destroy(this.domNode);
			}
			this.domNode = node;

			this._fillContent(this.srcNodeRef);
		},
		_templateCache: {},
		getCachedTemplate: function(templatePath, templateString, alwaysUseString){
			// summary:
			//		Layer for dijit._Templated.getCachedTemplate
			var tmplts = this._templateCache;
			var key = templateString || templatePath;
			if(tmplts[key]){
				return tmplts[key];
			}

			templateString = dString.trim(templateString || Cache(templatePath, {sanitize: true}));

			if(	this._dijitTemplateCompat &&
				(alwaysUseString || templateString.match(/\$\{([^\}]+)\}/g))
			){
				templateString = this._stringRepl(templateString);
			}

			// If we always use a string, or find no variables, just store it as a node
			if(alwaysUseString || !templateString.match(/\{[{%]([^\}]+)[%}]\}/g)){
				return tmplts[key] = domConstruct.toDom(templateString);
			}else{
				return tmplts[key] = new dd.Template(templateString);
			}
		},
		render: function(){
			// summary:
			//		Renders the widget.
			this.buildRendering();
		},
		startup: function(){
			Array.forEach(this._startupWidgets, function(w){
				if(w && !w._started && w.startup){
					w.startup();
				}
			});
			this.inherited(arguments);
		}
	});
});

},
'dojox/dtl/_base':function(){
define("dojox/dtl/_base", [
	"dojo/_base/kernel",
	"dojo/_base/lang",
	"dojox/string/tokenize",
	"dojo/_base/json",
	"dojo/dom",
	"dojo/_base/xhr",
	"dojox/string/Builder",
	"dojo/_base/Deferred"], 
	function(kernel, lang, Tokenize, json, dom, xhr, StringBuilder, deferred){

	kernel.experimental("dojox.dtl");
	var dd = lang.getObject("dojox.dtl", true);
	dd._base = {};

	dd.TOKEN_BLOCK = -1;
	dd.TOKEN_VAR = -2;
	dd.TOKEN_COMMENT = -3;
	dd.TOKEN_TEXT = 3;

	dd._Context = lang.extend(function(dict){
		// summary:
		//		Pass one of these when rendering a template to tell the template what values to use.
		if(dict){
			lang._mixin(this, dict);
			if(dict.get){
				// Preserve passed getter and restore prototype get
				this._getter = dict.get;
				delete this.get;
			}
		}
	},
	{
		push: function(){
			var last = this;
			var context = lang.delegate(this);
			context.pop = function(){ return last; }
			return context;
		},
		pop: function(){
			throw new Error("pop() called on empty Context");
		},
		get: function(key, otherwise){
			var n = this._normalize;

			if(this._getter){
				var got = this._getter(key);
				if(got !== undefined){
					return n(got);
				}
			}

			if(this[key] !== undefined){
				return n(this[key]);
			}

			return otherwise;
		},
		_normalize: function(value){
			if(value instanceof Date){
				value.year = value.getFullYear();
				value.month = value.getMonth() + 1;
				value.day = value.getDate();
				value.date = value.year + "-" + ("0" + value.month).slice(-2) + "-" + ("0" + value.day).slice(-2);
				value.hour = value.getHours();
				value.minute = value.getMinutes();
				value.second = value.getSeconds();
				value.microsecond = value.getMilliseconds();
			}
			return value;
		},
		update: function(dict){
			var context = this.push();
			if(dict){
				lang._mixin(this, dict);
			}
			return context;
		}
	});

	var smart_split_re = /("(?:[^"\\]*(?:\\.[^"\\]*)*)"|'(?:[^'\\]*(?:\\.[^'\\]*)*)'|[^\s]+)/g;
	var split_re = /\s+/g;
	var split = function(/*String|RegExp?*/ splitter, /*Integer?*/ limit){
		splitter = splitter || split_re;
		if(!(splitter instanceof RegExp)){
			splitter = new RegExp(splitter, "g");
		}
		if(!splitter.global){
			throw new Error("You must use a globally flagged RegExp with split " + splitter);
		}
		splitter.exec(""); // Reset the global

		var part, parts = [], lastIndex = 0, i = 0;
		while((part = splitter.exec(this))){
			parts.push(this.slice(lastIndex, splitter.lastIndex - part[0].length));
			lastIndex = splitter.lastIndex;
			if(limit && (++i > limit - 1)){
				break;
			}
		}
		parts.push(this.slice(lastIndex));
		return parts;
	};

	dd.Token = function(token_type, contents){
		// tags:
		//		private
		this.token_type = token_type;
		this.contents = new String(lang.trim(contents));
		this.contents.split = split;
		this.split = function(){
			return String.prototype.split.apply(this.contents, arguments);
		}
	};
	dd.Token.prototype.split_contents = function(/*Integer?*/ limit){
		var bit, bits = [], i = 0;
		limit = limit || 999;
		while(i++ < limit && (bit = smart_split_re.exec(this.contents))){
			bit = bit[0];
			if(bit.charAt(0) == '"' && bit.slice(-1) == '"'){
				bits.push('"' + bit.slice(1, -1).replace('\\"', '"').replace('\\\\', '\\') + '"');
			}else if(bit.charAt(0) == "'" && bit.slice(-1) == "'"){
				bits.push("'" + bit.slice(1, -1).replace("\\'", "'").replace('\\\\', '\\') + "'");
			}else{
				bits.push(bit);
			}
		}
		return bits;
	};

	var ddt = dd.text = {
		_get: function(module, name, errorless){
			// summary:
			//		Used to find both tags and filters
			var params = dd.register.get(module, name.toLowerCase(), errorless);
			if(!params){
				if(!errorless){
					throw new Error("No tag found for " + name);
				}
				return null;
			}

			var fn = params[1];
			var deps = params[2];

			var parts;
			if(fn.indexOf(":") != -1){
				parts = fn.split(":");
				fn = parts.pop();
			}

// FIXME: THIS DESIGN DOES NOT WORK WITH ASYNC LOADERS!
			var mod = deps;
			if (/\./.test(deps)) {
				deps = deps.replace(/\./g, "/");
			}
			require([deps], function(){});

			var parent = lang.getObject(mod);

			return parent[fn || name] || parent[name + "_"] || parent[fn + "_"];
		},
		getTag: function(name, errorless){
			return ddt._get("tag", name, errorless);
		},
		getFilter: function(name, errorless){
			return ddt._get("filter", name, errorless);
		},
		getTemplate: function(file){
			return new dd.Template(ddt.getTemplateString(file));
		},
		getTemplateString: function(file){
			return xhr._getText(file.toString()) || "";
		},
		_resolveLazy: function(location, sync, json){
			if(sync){
				if(json){
					return json.fromJson(xhr._getText(location)) || {};
				}else{
					return dd.text.getTemplateString(location);
				}
			}else{
				return xhr.get({
					handleAs: json ? "json" : "text",
					url: location
				});
			}
		},
		_resolveTemplateArg: function(arg, sync){
			if(ddt._isTemplate(arg)){
				if(!sync){
					var d = new deferred();
					d.callback(arg);
					return d;
				}
				return arg;
			}
			return ddt._resolveLazy(arg, sync);
		},
		_isTemplate: function(arg){
			return (arg === undefined) || (typeof arg == "string" && (arg.match(/^\s*[<{]/) || arg.indexOf(" ") != -1));
		},
		_resolveContextArg: function(arg, sync){
			if(arg.constructor == Object){
				if(!sync){
					var d = new deferred;
					d.callback(arg);
					return d;
				}
				return arg;
			}
			return ddt._resolveLazy(arg, sync, true);
		},
		_re: /(?:\{\{\s*(.+?)\s*\}\}|\{%\s*(load\s*)?(.+?)\s*%\})/g,
		tokenize: function(str){
			return Tokenize(str, ddt._re, ddt._parseDelims);
		},
		_parseDelims: function(varr, load, tag){
			if(varr){
				return [dd.TOKEN_VAR, varr];
			}else if(load){
				var parts = lang.trim(tag).split(/\s+/g);
				for(var i = 0, part; part = parts[i]; i++){
					if (/\./.test(part)){
						part = part.replace(/\./g,"/");
					}
					require([part]);
				}
			}else{
				return [dd.TOKEN_BLOCK, tag];
			}
		}
	};

	dd.Template = lang.extend(function(/*String|dojo._Url*/ template, /*Boolean*/ isString){
		// summary:
		//		The base class for text-based templates.
		// template: String|dojo/_base/url
		//		The string or location of the string to
		//		use as a template
		// isString: Boolean
		//		Indicates whether the template is a string or a url.
		var str = isString ? template : ddt._resolveTemplateArg(template, true) || "";
		var tokens = ddt.tokenize(str);
		var parser = new dd._Parser(tokens);
		this.nodelist = parser.parse();
	},
	{
		update: function(node, context){
			// summary:
			//		Updates this template according to the given context.
			// node: DOMNode|String|dojo/NodeList
			//		A node reference or set of nodes
			// context: dojo/base/url|String|Object
			//		The context object or location
			return ddt._resolveContextArg(context).addCallback(this, function(contextObject){
				var content = this.render(new dd._Context(contextObject));
				if(node.forEach){
					node.forEach(function(item){
						item.innerHTML = content;
					});
				}else{
					dom.byId(node).innerHTML = content;
				}
				return this;
			});
		},
		render: function(context, buffer){
			// summary:
			//		Renders this template.
			// context: Object
			//		The runtime context.
			// buffer: StringBuilder?
			//		A string buffer.
			buffer = buffer || this.getBuffer();
			context = context || new dd._Context({});
			return this.nodelist.render(context, buffer) + "";
		},
		getBuffer: function(){
			return new StringBuilder();
		}
	});

	var qfRe = /\{\{\s*(.+?)\s*\}\}/g;
	dd.quickFilter = function(str){
		if(!str){
			return new dd._NodeList();
		}

		if(str.indexOf("{%") == -1){
			return new dd._QuickNodeList(Tokenize(str, qfRe, function(token){
				return new dd._Filter(token);
			}));
		}
	};

	dd._QuickNodeList = lang.extend(function(contents){
		this.contents = contents;
	},
	{
		render: function(context, buffer){
			for(var i = 0, l = this.contents.length; i < l; i++){
				if(this.contents[i].resolve){
					buffer = buffer.concat(this.contents[i].resolve(context));
				}else{
					buffer = buffer.concat(this.contents[i]);
				}
			}
			return buffer;
		},
		dummyRender: function(context){ return this.render(context, dd.Template.prototype.getBuffer()).toString(); },
		clone: function(buffer){ return this; }
	});

	dd._Filter = lang.extend(function(token){
		// summary:
		//		Uses a string to find (and manipulate) a variable
		if(!token) throw new Error("Filter must be called with variable name");
		this.contents = token;

		var cache = this._cache[token];
		if(cache){
			this.key = cache[0];
			this.filters = cache[1];
		}else{
			this.filters = [];
			Tokenize(token, this._re, this._tokenize, this);
			this._cache[token] = [this.key, this.filters];
		}
	},
	{
		_cache: {},
		_re: /(?:^_\("([^\\"]*(?:\\.[^\\"])*)"\)|^"([^\\"]*(?:\\.[^\\"]*)*)"|^([a-zA-Z0-9_.]+)|\|(\w+)(?::(?:_\("([^\\"]*(?:\\.[^\\"])*)"\)|"([^\\"]*(?:\\.[^\\"]*)*)"|([a-zA-Z0-9_.]+)|'([^\\']*(?:\\.[^\\']*)*)'))?|^'([^\\']*(?:\\.[^\\']*)*)')/g,
		_values: {
			0: '"', // _("text")
			1: '"', // "text"
			2: "", // variable
			8: '"' // 'text'
		},
		_args: {
			4: '"', // :_("text")
			5: '"', // :"text"
			6: "", // :variable
			7: "'"// :'text'
		},
		_tokenize: function(){
			var pos, arg;

			for(var i = 0, has = []; i < arguments.length; i++){
				has[i] = (arguments[i] !== undefined && typeof arguments[i] == "string" && arguments[i]);
			}

			if(!this.key){
				for(pos in this._values){
					if(has[pos]){
						this.key = this._values[pos] + arguments[pos] + this._values[pos];
						break;
					}
				}
			}else{
				for(pos in this._args){
					if(has[pos]){
						var value = arguments[pos];
						if(this._args[pos] == "'"){
							value = value.replace(/\\'/g, "'");
						}else if(this._args[pos] == '"'){
							value = value.replace(/\\"/g, '"');
						}
						arg = [!this._args[pos], value];
						break;
					}
				}
				// Get a named filter
				var fn = ddt.getFilter(arguments[3]);
				if(!lang.isFunction(fn)) throw new Error(arguments[3] + " is not registered as a filter");
				this.filters.push([fn, arg]);
			}
		},
		getExpression: function(){
			return this.contents;
		},
		resolve: function(context){
			if(this.key === undefined){
				return "";
			}

			var str = this.resolvePath(this.key, context);

			for(var i = 0, filter; filter = this.filters[i]; i++){
				// Each filter has the function in [0], a boolean in [1][0] of whether it's a variable or a string
				// and [1][1] is either the variable name of the string content.
				if(filter[1]){
					if(filter[1][0]){
						str = filter[0](str, this.resolvePath(filter[1][1], context));
					}else{
						str = filter[0](str, filter[1][1]);
					}
				}else{
					str = filter[0](str);
				}
			}

			return str;
		},
		resolvePath: function(path, context){
			var current, parts;
			var first = path.charAt(0);
			var last = path.slice(-1);
			if(!isNaN(parseInt(first))){
				current = (path.indexOf(".") == -1) ? parseInt(path) : parseFloat(path);
			}else if(first == '"' && first == last){
				current = path.slice(1, -1);
			}else{
				if(path == "true"){ return true; }
				if(path == "false"){ return false; }
				if(path == "null" || path == "None"){ return null; }
				parts = path.split(".");
				current = context.get(parts[0]);

				if(lang.isFunction(current)){
					var self = context.getThis && context.getThis();
					if(current.alters_data){
						current = "";
					}else if(self){
						current = current.call(self);
					}else{
						current = "";
					}
				}

				for(var i = 1; i < parts.length; i++){
					var part = parts[i];
					if(current){
						var base = current;
						if(lang.isObject(current) && part == "items" && current[part] === undefined){
							var items = [];
							for(var key in current){
								items.push([key, current[key]]);
							}
							current = items;
							continue;
						}

						if(current.get && lang.isFunction(current.get) && current.get.safe){
							current = current.get(part);
						}else if(current[part] === undefined){
							current = current[part];
							break;
						}else{
							current = current[part];
						}

						if(lang.isFunction(current)){
							if(current.alters_data){
								current = "";
							}else{
								current = current.call(base);
							}
						}else if(current instanceof Date){
							current = dd._Context.prototype._normalize(current);
						}
					}else{
						return "";
					}
				}
			}
			return current;
		}
	});

	dd._TextNode = dd._Node = lang.extend(function(/*Object*/ obj){
		// summary:
		//		Basic catch-all node
		this.contents = obj;
	},
	{
		set: function(data){
			this.contents = data;
			return this;
		},
		render: function(context, buffer){
			// summary:
			//		Adds content onto the buffer
			return buffer.concat(this.contents);
		},
		isEmpty: function(){
			return !lang.trim(this.contents);
		},
		clone: function(){ return this; }
	});

	dd._NodeList = lang.extend(function(/*Node[]*/ nodes){
		// summary:
		//		Allows us to render a group of nodes
		this.contents = nodes || [];
		this.last = "";
	},
	{
		push: function(node){
			// summary:
			//		Add a new node to the list
			this.contents.push(node);
			return this;
		},
		concat: function(nodes){
			this.contents = this.contents.concat(nodes);
			return this;
		},
		render: function(context, buffer){
			// summary:
			//		Adds all content onto the buffer
			for(var i = 0; i < this.contents.length; i++){
				buffer = this.contents[i].render(context, buffer);
				if(!buffer) throw new Error("Template must return buffer");
			}
			return buffer;
		},
		dummyRender: function(context){
			return this.render(context, dd.Template.prototype.getBuffer()).toString();
		},
		unrender: function(){ return arguments[1]; },
		clone: function(){ return this; },
		rtrim: function(){
			while(1){
				i = this.contents.length - 1;
				if(this.contents[i] instanceof dd._TextNode && this.contents[i].isEmpty()){
					this.contents.pop();
				}else{
					break;
				}
			}

			return this;
		}
	});

	dd._VarNode = lang.extend(function(str){
		// summary:
		//		A node to be processed as a variable
		this.contents = new dd._Filter(str);
	},
	{
		render: function(context, buffer){
			var str = this.contents.resolve(context);
			if(!str.safe){
				str = dd._base.escape("" + str);
			}
			return buffer.concat(str);
		}
	});

	dd._noOpNode = new function(){
		// summary:
		//		Adds a no-op node. Useful in custom tags
		this.render = this.unrender = function(){ return arguments[1]; }
		this.clone = function(){ return this; }
	};

	dd._Parser = lang.extend(function(tokens){
		// summary:
		//		Parser used during initialization and for tag groups.
		this.contents = tokens;
	},
	{
		i: 0,
		parse: function(/*Array?*/ stop_at){
			// summary:
			//		Turns tokens into nodes
			// description:
			//		Steps into tags are they're found. Blocks use the parse object
			//		to find their closing tag (the stop_at array). stop_at is inclusive, it
			//		returns the node that matched.
			var terminators = {}, token;
			stop_at = stop_at || [];
			for(var i = 0; i < stop_at.length; i++){
				terminators[stop_at[i]] = true;
			}

			var nodelist = new dd._NodeList();
			while(this.i < this.contents.length){
				token = this.contents[this.i++];
				if(typeof token == "string"){
					nodelist.push(new dd._TextNode(token));
				}else{
					var type = token[0];
					var text = token[1];
					if(type == dd.TOKEN_VAR){
						nodelist.push(new dd._VarNode(text));
					}else if(type == dd.TOKEN_BLOCK){
						if(terminators[text]){
							--this.i;
							return nodelist;
						}
						var cmd = text.split(/\s+/g);
						if(cmd.length){
							cmd = cmd[0];
							var fn = ddt.getTag(cmd);
							if(fn){
								nodelist.push(fn(this, new dd.Token(type, text)));
							}
						}
					}
				}
			}

			if(stop_at.length){
				throw new Error("Could not find closing tag(s): " + stop_at.toString());
			}

			this.contents.length = 0;
			return nodelist;
		},
		next_token: function(){
			// summary:
			//		Returns the next token in the list.
			var token = this.contents[this.i++];
			return new dd.Token(token[0], token[1]);
		},
		delete_first_token: function(){
			this.i++;
		},
		skip_past: function(endtag){
			while(this.i < this.contents.length){
				var token = this.contents[this.i++];
				if(token[0] == dd.TOKEN_BLOCK && token[1] == endtag){
					return;
				}
			}
			throw new Error("Unclosed tag found when looking for " + endtag);
		},
		create_variable_node: function(expr){
			return new dd._VarNode(expr);
		},
		create_text_node: function(expr){
			return new dd._TextNode(expr || "");
		},
		getTemplate: function(file){
			return new dd.Template(file);
		}
	});

	dd.register = {
		// summary:
		//		A register for filters and tags.
		
		_registry: {
			attributes: [],
			tags: [],
			filters: []
		},
		get: function(/*String*/ module, /*String*/ name){
			// tags:
			//		private
			var registry = dd.register._registry[module + "s"];
			for(var i = 0, entry; entry = registry[i]; i++){
				if(typeof entry[0] == "string"){
					if(entry[0] == name){
						return entry;
					}
				}else if(name.match(entry[0])){
					return entry;
				}
			}
		},
		getAttributeTags: function(){
			// tags:
			//		private
			var tags = [];
			var registry = dd.register._registry.attributes;
			for(var i = 0, entry; entry = registry[i]; i++){
				if(entry.length == 3){
					tags.push(entry);
				}else{
					var fn = lang.getObject(entry[1]);
					if(fn && lang.isFunction(fn)){
						entry.push(fn);
						tags.push(entry);
					}
				}
			}
			return tags;
		},
		_any: function(type, base, locations){
			for(var path in locations){
				for(var i = 0, fn; fn = locations[path][i]; i++){
					var key = fn;
					if(lang.isArray(fn)){
						key = fn[0];
						fn = fn[1];
					}
					if(typeof key == "string"){
						if(key.substr(0, 5) == "attr:"){
							var attr = fn;
							if(attr.substr(0, 5) == "attr:"){
								attr = attr.slice(5);
							}
							dd.register._registry.attributes.push([attr.toLowerCase(), base + "." + path + "." + attr]);
						}
						key = key.toLowerCase()
					}
					dd.register._registry[type].push([
						key,
						fn,
						base + "." + path
					]);
				}
			}
		},
		tags: function(/*String*/ base, /*Object*/ locations){
			// summary:
			//		Register the specified tag libraries.
			// description:
			//		The locations parameter defines the contents of each library as a hash whose keys are the library names and values 
			//		an array of the tags exported by the library. For example, the tags exported by the logic library would be:
			//	|	{ logic: ["if", "for", "ifequal", "ifnotequal"] }
			// base:
			//		The base path of the libraries.
			// locations:
			//		An object defining the tags for each library as a hash whose keys are the library names and values 
			//		an array of the tags or filters exported by the library.
			dd.register._any("tags", base, locations);
		},
		filters: function(/*String*/ base, /*Object*/ locations){
			// summary:
			//		Register the specified filter libraries.
			// description:
			//		The locations parameter defines the contents of each library as a hash whose keys are the library names and values 
			//		an array of the filters exported by the library. For example, the filters exported by the date library would be:
			//	|	{ "dates": ["date", "time", "timesince", "timeuntil"] }
			// base:
			//		The base path of the libraries.
			// locations:
			//		An object defining the filters for each library as a hash whose keys are the library names and values 
			//		an array of the filters exported by the library.
			dd.register._any("filters", base, locations);
		}
	}

	var escapeamp = /&/g;
	var escapelt = /</g;
	var escapegt = />/g;
	var escapeqt = /'/g;
	var escapedblqt = /"/g;
	dd._base.escape = function(value){
		// summary:
		//		Escapes a string's HTML
		return dd.mark_safe(value.replace(escapeamp, '&amp;').replace(escapelt, '&lt;').replace(escapegt, '&gt;').replace(escapedblqt, '&quot;').replace(escapeqt, '&#39;'));
	};

	dd._base.safe = function(value){
		if(typeof value == "string"){
			value = new String(value);
		}
		if(typeof value == "object"){
			value.safe = true;
		}
		return value;
	};
	dd.mark_safe = dd._base.safe;

	dd.register.tags("dojox.dtl.tag", {
		"date": ["now"],
		"logic": ["if", "for", "ifequal", "ifnotequal"],
		"loader": ["extends", "block", "include", "load", "ssi"],
		"misc": ["comment", "debug", "filter", "firstof", "spaceless", "templatetag", "widthratio", "with"],
		"loop": ["cycle", "ifchanged", "regroup"]
	});
	dd.register.filters("dojox.dtl.filter", {
		"dates": ["date", "time", "timesince", "timeuntil"],
		"htmlstrings": ["linebreaks", "linebreaksbr", "removetags", "striptags"],
		"integers": ["add", "get_digit"],
		"lists": ["dictsort", "dictsortreversed", "first", "join", "length", "length_is", "random", "slice", "unordered_list"],
		"logic": ["default", "default_if_none", "divisibleby", "yesno"],
		"misc": ["filesizeformat", "pluralize", "phone2numeric", "pprint"],
		"strings": ["addslashes", "capfirst", "center", "cut", "fix_ampersands", "floatformat", "iriencode", "linenumbers", "ljust", "lower", "make_list", "rjust", "slugify", "stringformat", "title", "truncatewords", "truncatewords_html", "upper", "urlencode", "urlize", "urlizetrunc", "wordcount", "wordwrap"]
	});
	dd.register.filters("dojox.dtl", {
		"_base": ["escape", "safe"]
	});
	return dd;
});


},
'dojox/string/tokenize':function(){
define("dojox/string/tokenize", [
	"dojo/_base/lang",
	"dojo/_base/sniff"	
], function(lang, has){
	var tokenize = lang.getObject("dojox.string", true).tokenize;

	tokenize = function(/*String*/ str, /*RegExp*/ re, /*Function?*/ parseDelim, /*Object?*/ instance){
		// summary:
		//		Split a string by a regular expression with the ability to capture the delimeters
		// parseDelim:
		//		Each group (excluding the 0 group) is passed as a parameter. If the function returns
		//		a value, it's added to the list of tokens.
		// instance:
		//		Used as the "this" instance when calling parseDelim
		var tokens = [];
		var match, content, lastIndex = 0;
		while(match = re.exec(str)){
			content = str.slice(lastIndex, re.lastIndex - match[0].length);
			if(content.length){
				tokens.push(content);
			}
			if(parseDelim){
				if(has("opera")){
					var copy = match.slice(0);
					while(copy.length < match.length){
						copy.push(null);
					}
					match = copy;
				}
				var parsed = parseDelim.apply(instance, match.slice(1).concat(tokens.length));
				if(typeof parsed != "undefined"){
					tokens.push(parsed);
				}
			}
			lastIndex = re.lastIndex;
		}
		content = str.slice(lastIndex);
		if(content.length){
			tokens.push(content);
		}
		return tokens;
	};
	return tokenize;
});

},
'dojox/string/Builder':function(){
define("dojox/string/Builder", ["dojo/_base/lang"], 
  function(lang){
	lang.getObject("string", true, dojox).Builder = 
	  function(/*String?*/str){
		// summary:
		//		A fast buffer for creating large strings.

		//	N.B. the public nature of the internal buffer is no longer
		//	needed because the IE-specific fork is no longer needed--TRT.
		var b = "";

		// length: Number
		//		The current length of the internal string.
		this.length = 0;
		
		this.append = function(/* String... */s){
			// summary:
			//		Append all arguments to the end of the buffer
			if(arguments.length>1){
				/*
					This is a loop unroll was designed specifically for Firefox;
					it would seem that static index access on an Arguments
					object is a LOT faster than doing dynamic index access.
					Therefore, we create a buffer string and take advantage
					of JS's switch fallthrough.  The peformance of this method
					comes very close to straight up string concatenation (+=).

					If the arguments object length is greater than 9, we fall
					back to standard dynamic access.

					This optimization seems to have no real effect on either
					Safari or Opera, so we just use it for all.

					It turns out also that this loop unroll can increase performance
					significantly with Internet Explorer, particularly when
					as many arguments are provided as possible.

					Loop unroll per suggestion from Kris Zyp, implemented by
					Tom Trenka.

					Note: added empty string to force a string cast if needed.
				 */
				var tmp="", l=arguments.length;
				switch(l){
					case 9: tmp=""+arguments[8]+tmp;
					case 8: tmp=""+arguments[7]+tmp;
					case 7: tmp=""+arguments[6]+tmp;
					case 6: tmp=""+arguments[5]+tmp;
					case 5: tmp=""+arguments[4]+tmp;
					case 4: tmp=""+arguments[3]+tmp;
					case 3: tmp=""+arguments[2]+tmp;
					case 2: {
						b+=""+arguments[0]+arguments[1]+tmp;
						break;
					}
					default: {
						var i=0;
						while(i<arguments.length){
							tmp += arguments[i++];
						}
						b += tmp;
					}
				}
			} else {
				b += s;
			}
			this.length = b.length;
			return this;	//	dojox.string.Builder
		};
		
		this.concat = function(/*String...*/s){
			// summary:
			//		Alias for append.
			return this.append.apply(this, arguments);	//	dojox.string.Builder
		};
		
		this.appendArray = function(/*Array*/strings) {
			// summary:
			//		Append an array of items to the internal buffer.

			//	Changed from String.prototype.concat.apply because of IE.
			return this.append.apply(this, strings);	//	dojox.string.Builder
		};
		
		this.clear = function(){
			// summary:
			//		Remove all characters from the buffer.
			b = "";
			this.length = 0;
			return this;	//	dojox.string.Builder
		};
		
		this.replace = function(/* String */oldStr, /* String */ newStr){
			// summary:
			//		Replace instances of one string with another in the buffer.
			b = b.replace(oldStr,newStr);
			this.length = b.length;
			return this;	//	dojox.string.Builder
		};
		
		this.remove = function(/* Number */start, /* Number? */len){
			// summary:
			//		Remove len characters starting at index start.  If len
			//		is not provided, the end of the string is assumed.
			if(len===undefined){ len = b.length; }
			if(len == 0){ return this; }
			b = b.substr(0, start) + b.substr(start+len);
			this.length = b.length;
			return this;	//	dojox.string.Builder
		};
		
		this.insert = function(/* Number */index, /* String */str){
			// summary:
			//		Insert string str starting at index.
			if(index == 0){
				b = str + b;
			}else{
				b = b.slice(0, index) + str + b.slice(index);
			}
			this.length = b.length;
			return this;	//	dojox.string.Builder
		};
		
		this.toString = function(){
			// summary:
			//		Return the string representation of the internal buffer.
			return b;	//	String
		};

		//	initialize the buffer.
		if(str){ this.append(str); }
	};
	return dojox.string.Builder;
});

},
'url:epi-packaging/templates/UploadResults.htm':"﻿<div>\r\n    <div class=\"epi-paddingVertical-small\">\r\n        <table class=\"epi-default\" dojoAttachPoint=\"installedTable\">\r\n            <thead>\r\n                <tr>\r\n                    <th>\r\n                        ${res.headerindex}\r\n                    </th>\r\n                    <th>\r\n                        ${res.headerfile}\r\n                    </th>\r\n                    <th>\r\n                        ${res.headersize}\r\n                    </th>\r\n                    <th>\r\n                        ${res.headerid}\r\n                    </th>\r\n                    <th>\r\n                        ${res.headertitle}\r\n                    </th>\r\n                    <th>\r\n                        ${res.headersummary}\r\n                    </th>\r\n                    <th>\r\n                        ${res.headerdescription}\r\n                    </th>\r\n                    <th>\r\n                        ${res.headerstatus}\r\n                    </th>\r\n                </tr>\r\n            </thead>\r\n            {% for uploadedFile in files %}\r\n            <tr>\r\n                <td>\r\n                    {{ uploadedFile.index }}\r\n                </td>\r\n                <td>\r\n                    {{ uploadedFile.packageFileName|safe }}\r\n                </td>\r\n                <td class=\"sizeColumn\">\r\n                    {{ uploadedFile.sizeStr }}\r\n                </td>\r\n\r\n                {% if uploadedFile.packageInfo.isInstalled %}\r\n                <td>\r\n                    {{ uploadedFile.packageInfo.id|safe }}\r\n                </td>\r\n                <td>\r\n                    {{ uploadedFile.packageInfo.title|safe }}\r\n                </td>\r\n                <td>\r\n                    {{ uploadedFile.packageInfo.summary|safe }}\r\n                </td>\r\n                <td>\r\n                    {{ uploadedFile.packageInfo.description|safe }}\r\n                </td>\r\n                <td>\r\n                    <span class=\"dijitInline dijitIcon epi-iconCheckmark\"></span>\r\n                </td>\r\n                {% else %}\r\n                <td colspan=\"4\">\r\n                    <div class=\"epi-errorText\">\r\n                        <ul>\r\n                            {% for error in uploadedFile.errors %}\r\n                            <li>{{ error }}</li>\r\n                            {% endfor %}\r\n                        </ul>\r\n\r\n                        <ul>\r\n                            {% for error in uploadedFile.packageInfo.errors %}\r\n                            <li>{{ error }}</li>\r\n                            {% endfor %}\r\n                        </ul>\r\n                    </div>\r\n                </td>\r\n                <td class=\"failureIcon\">\r\n                </td>\r\n                {% endif %}\r\n            </tr>\r\n            {% endfor %}\r\n        </table>\r\n    </div>\r\n</div>",
'dojox/dtl/tag/logic':function(){
define("dojox/dtl/tag/logic", [
	"dojo/_base/lang",
	"../_base"
], function(lang, dd){

	lang.getObject("dojox.dtl.tag.logic", true);

	var ddt = dd.text;
	var ddtl = dd.tag.logic;

	ddtl.IfNode = lang.extend(function(bools, trues, falses, type){
		this.bools = bools;
		this.trues = trues;
		this.falses = falses;
		this.type = type;
	},
	{
		render: function(context, buffer){
			var i, bool, ifnot, filter, value;
			if(this.type == "or"){
				for(i = 0; bool = this.bools[i]; i++){
					ifnot = bool[0];
					filter = bool[1];
					value = filter.resolve(context);
					if((value && !ifnot) || (ifnot && !value)){
						if(this.falses){
							buffer = this.falses.unrender(context, buffer);
						}
						return (this.trues) ? this.trues.render(context, buffer, this) : buffer;
					}
				}
				if(this.trues){
					buffer = this.trues.unrender(context, buffer);
				}
				return (this.falses) ? this.falses.render(context, buffer, this) : buffer;
			}else{
				for(i = 0; bool = this.bools[i]; i++){
					ifnot = bool[0];
					filter = bool[1];
					value = filter.resolve(context);
					// If we ever encounter a false value
					if(value == ifnot){
						if(this.trues){
							buffer = this.trues.unrender(context, buffer);
						}
						return (this.falses) ? this.falses.render(context, buffer, this) : buffer;
					}
				}
				if(this.falses){
					buffer = this.falses.unrender(context, buffer);
				}
				return (this.trues) ? this.trues.render(context, buffer, this) : buffer;
			}
			return buffer;
		},
		unrender: function(context, buffer){
			buffer = (this.trues) ? this.trues.unrender(context, buffer) : buffer;
			buffer = (this.falses) ? this.falses.unrender(context, buffer) : buffer;
			return buffer;
		},
		clone: function(buffer){
			var trues = (this.trues) ? this.trues.clone(buffer) : null;
			var falses = (this.falses) ? this.falses.clone(buffer) : null;
			return new this.constructor(this.bools, trues, falses, this.type);
		}
	});

	ddtl.IfEqualNode = lang.extend(function(var1, var2, trues, falses, negate){
		this.var1 = new dd._Filter(var1);
		this.var2 = new dd._Filter(var2);
		this.trues = trues;
		this.falses = falses;
		this.negate = negate;
	},
	{
		render: function(context, buffer){
			var var1 = this.var1.resolve(context);
			var var2 = this.var2.resolve(context);
			var1 = (typeof var1 != "undefined") ? var1 : "";
			var2 = (typeof var1 != "undefined") ? var2 : "";
			if((this.negate && var1 != var2) || (!this.negate && var1 == var2)){
				if(this.falses){
					buffer = this.falses.unrender(context, buffer, this);
				}
				return (this.trues) ? this.trues.render(context, buffer, this) : buffer;
			}
			if(this.trues){
				buffer = this.trues.unrender(context, buffer, this);
			}
			return (this.falses) ? this.falses.render(context, buffer, this) : buffer;
		},
		unrender: function(context, buffer){
			return ddtl.IfNode.prototype.unrender.call(this, context, buffer);
		},
		clone: function(buffer){
			var trues = this.trues ? this.trues.clone(buffer) : null;
			var falses = this.falses ? this.falses.clone(buffer) : null;
			return new this.constructor(this.var1.getExpression(), this.var2.getExpression(), trues, falses, this.negate);
		}
	});

	ddtl.ForNode = lang.extend(function(assign, loop, reversed, nodelist){
		this.assign = assign;
		this.loop = new dd._Filter(loop);
		this.reversed = reversed;
		this.nodelist = nodelist;
		this.pool = [];
	},
	{
		render: function(context, buffer){
			var i, j, k;
			var dirty = false;
			var assign = this.assign;

			for(k = 0; k < assign.length; k++){
				if(typeof context[assign[k]] != "undefined"){
					dirty = true;
					context = context.push();
					break;
				}
			}
			if(!dirty && context.forloop){
				dirty = true;
				context = context.push();
			}

			var items = this.loop.resolve(context) || [];
			for(i = items.length; i < this.pool.length; i++){
				this.pool[i].unrender(context, buffer, this);
			}
			if(this.reversed){
				items = items.slice(0).reverse();
			}

			var isObject = lang.isObject(items) && !lang.isArrayLike(items);
			var arred = [];
			if(isObject){
				for(var key in items){
					arred.push(items[key]);
				}
			}else{
				arred = items;
			}

			var forloop = context.forloop = {
				parentloop: context.get("forloop", {})
			};
			var j = 0;
			for(i = 0; i < arred.length; i++){
				var item = arred[i];

				forloop.counter0 = j;
				forloop.counter = j + 1;
				forloop.revcounter0 = arred.length - j - 1;
				forloop.revcounter = arred.length - j;
				forloop.first = !j;
				forloop.last = (j == arred.length - 1);

				if(assign.length > 1 && lang.isArrayLike(item)){
					if(!dirty){
						dirty = true;
						context = context.push();
					}
					var zipped = {};
					for(k = 0; k < item.length && k < assign.length; k++){
						zipped[assign[k]] = item[k];
					}
					lang.mixin(context, zipped);
				}else{
					context[assign[0]] = item;
				}

				if(j + 1 > this.pool.length){
					this.pool.push(this.nodelist.clone(buffer));
				}
				buffer = this.pool[j++].render(context, buffer, this);
			}

			delete context.forloop;
			if(dirty){
				context = context.pop();
			}else{
				for(k = 0; k < assign.length; k++){
					delete context[assign[k]];
				}
			}
			return buffer;
		},
		unrender: function(context, buffer){
			for(var i = 0, pool; pool = this.pool[i]; i++){
				buffer = pool.unrender(context, buffer);
			}
			return buffer;
		},
		clone: function(buffer){
			return new this.constructor(this.assign, this.loop.getExpression(), this.reversed, this.nodelist.clone(buffer));
		}
	});

	lang.mixin(ddtl, {
		if_: function(parser, token){
			var i, part, type, bools = [], parts = token.contents.split();
			parts.shift();
			token = parts.join(" ");
			parts = token.split(" and ");
			if(parts.length == 1){
				type = "or";
				parts = token.split(" or ");
			}else{
				type = "and";
				for(i = 0; i < parts.length; i++){
					if(parts[i].indexOf(" or ") != -1){
						// Note, since we split by and, this is the only place we need to error check
						throw new Error("'if' tags can't mix 'and' and 'or'");
					}
				}
			}
			for(i = 0; part = parts[i]; i++){
				var not = false;
				if(part.indexOf("not ") == 0){
					part = part.slice(4);
					not = true;
				}
				bools.push([not, new dd._Filter(part)]);
			}
			var trues = parser.parse(["else", "endif"]);
			var falses = false;
			var token = parser.next_token();
			if(token.contents == "else"){
				falses = parser.parse(["endif"]);
				parser.next_token();
			}
			return new ddtl.IfNode(bools, trues, falses, type);
		},
		_ifequal: function(parser, token, negate){
			var parts = token.split_contents();
			if(parts.length != 3){
				throw new Error(parts[0] + " takes two arguments");
			}
			var end = 'end' + parts[0];
			var trues = parser.parse(["else", end]);
			var falses = false;
			var token = parser.next_token();
			if(token.contents == "else"){
				falses = parser.parse([end]);
				parser.next_token();
			}
			return new ddtl.IfEqualNode(parts[1], parts[2], trues, falses, negate);
		},
		ifequal: function(parser, token){
			return ddtl._ifequal(parser, token);
		},
		ifnotequal: function(parser, token){
			return ddtl._ifequal(parser, token, true);
		},
		for_: function(parser, token){
			var parts = token.contents.split();
			if(parts.length < 4){
				throw new Error("'for' statements should have at least four words: " + token.contents);
			}
			var reversed = parts[parts.length - 1] == "reversed";
			var index = (reversed) ? -3 : -2;
			if(parts[parts.length + index] != "in"){
				throw new Error("'for' tag received an invalid argument: " + token.contents);
			}
			var loopvars = parts.slice(1, index).join(" ").split(/ *, */);
			for(var i = 0; i < loopvars.length; i++){
				if(!loopvars[i] || loopvars[i].indexOf(" ") != -1){
					throw new Error("'for' tag received an invalid argument: " + token.contents);
				}
			}
			var nodelist = parser.parse(["endfor"]);
			parser.next_token();
			return new ddtl.ForNode(loopvars, parts[parts.length + index + 1], reversed, nodelist);
		}
	});
	return dojox.dtl.tag.logic;
});
},
'epi-packaging/SelectedFiles':function(){
﻿define([
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
},
'dojox/form/uploader/FileList':function(){
define("dojox/form/uploader/FileList", [
	"dojo/_base/fx",
	"dojo/dom-style",
	"dojo/dom-class",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dijit/_base/manager",
	"dojox/form/uploader/Base"
],function(fx, domStyle, domClass, declare, lang, array, manager, formUploaderBase){

return declare("dojox.form.uploader.FileList", [formUploaderBase], {
	// summary:
	//		A simple widget that provides a list of the files currently selected by
	//		dojox.form.Uploader
	// description:
	//		There is a required CSS file: resources/UploaderFileList.css.
	//		This is a very simple widget, and not beautifully styled. It is here mainly for test
	//		cases, but could very easily be used, extended, modified, or copied.
	// Version: 1.6

	// uploaderId: String
	//		The id of the dojox.form.Uploader to connect to.
	uploaderId:"",

	// uploader: dojox.form.Uploader
	//		The dojox.form.Uploader to connect to. Use either this property of unploaderId. This
	//		property is populated if uploaderId is used.
	uploader:null,

	// headerIndex: String
	//		The label for the index column.
	headerIndex:"#",

	// headerType: String
	//		The label for the file type column.
	headerType:"Type",

	// headerFilename: String
	//		The label for the file name column.
	headerFilename:"File Name",

	// headerFilesize: String
	//		The label for the file size column.
	headerFilesize:"Size",

	_upCheckCnt:0,
	rowAmt:0,

	templateString:	'<div class="dojoxUploaderFileList">' +
						'<div dojoAttachPoint="progressNode" class="dojoxUploaderFileListProgress"><div dojoAttachPoint="percentBarNode" class="dojoxUploaderFileListProgressBar"></div><div dojoAttachPoint="percentTextNode" class="dojoxUploaderFileListPercentText">0%</div></div>' +
						'<table class="dojoxUploaderFileListTable">'+
							'<thead><tr class="dojoxUploaderFileListHeader"><th class="dojoxUploaderIndex">${headerIndex}</th><th class="dojoxUploaderIcon">${headerType}</th><th class="dojoxUploaderFileName">${headerFilename}</th><th class="dojoxUploaderFileSize" dojoAttachPoint="sizeHeader">${headerFilesize}</th></tr></thead>'+
							'<tbody class="dojoxUploaderFileListContent" dojoAttachPoint="listNode">'+
							'</tbody>'+
						'</table>'+
						'<div>'
						,

	postCreate: function(){
		this.setUploader();
		this.hideProgress();
	},

	reset: function(){
		// summary:
		//		Clears all rows of items. Happens automatically if Uploader is reset, but you
		//		could call this directly.

		for(var i=0;i<this.rowAmt;i++){
			this.listNode.deleteRow(0);
		}
		this.rowAmt = 0;
	},

	setUploader: function(){
		// summary:
		//		Connects to the Uploader based on the uploader or the uploaderId properties.

		if(!this.uploaderId && !this.uploader){
			console.warn("uploaderId not passed to UploaderFileList");
		}else if(this.uploaderId && !this.uploader){
			this.uploader = manager.byId(this.uploaderId);
		}else if(this._upCheckCnt>4){
			console.warn("uploader not found for ID ", this.uploaderId);
			return;
		}
		if(this.uploader){
			this.connect(this.uploader, "onChange", "_onUploaderChange");
			this.connect(this.uploader, "reset", "reset");
			this.connect(this.uploader, "onBegin", function(){
				this.showProgress(true);
			});
			this.connect(this.uploader, "onProgress", "_progress");
			this.connect(this.uploader, "onComplete", function(){
				setTimeout(lang.hitch(this, function(){
					this.hideProgress(true);
				}), 1250);
			});
			if(!(this._fileSizeAvail = {'html5':1,'flash':1}[this.uploader.uploadType])){
				//if uploadType is neither html5 nor flash, file size is not available
				//hide the size header
				this.sizeHeader.style.display="none";
			}
		}else{
			this._upCheckCnt++;
			setTimeout(lang.hitch(this, "setUploader"), 250);
		}
	},

	hideProgress: function(/*Boolean*/ animate){
		var o = animate ? {
			ani:true,
			endDisp:"none",
			beg:15,
			end:0
		} : {
			endDisp:"none",
			ani:false
		};
		this._hideShowProgress(o);
	},

	showProgress: function(/*Boolean*/ animate){
		var o = animate ? {
			ani:true,
			endDisp:"block",
			beg:0,
			end:15
		} : {
			endDisp:"block",
			ani:false
		};
		this._hideShowProgress(o);
	},

	_progress: function(/*Object*/ customEvent){
		this.percentTextNode.innerHTML = customEvent.percent;
		domStyle.set(this.percentBarNode, "width", customEvent.percent);
	},

	_hideShowProgress: function(o){
		var node = this.progressNode;
		var onEnd = function(){
			domStyle.set(node, "display", o.endDisp);
		};
		if(o.ani){
			domStyle.set(node, "display", "block");
			fx.animateProperty({
				node: node,
				properties:{
					height:{
						start:o.beg,
						end:o.end,
						units:"px"
					}
				},
				onEnd:onEnd
			}).play();
		}else{
			onEnd();
		}
	},

	_onUploaderChange: function(fileArray){
		this.reset();
		array.forEach(fileArray, function(f, i){
			this._addRow(i+1, this.getFileType(f.name), f.name, f.size);
		}, this)
	},

	_addRow: function(index, type, name, size){

		var c, r = this.listNode.insertRow(-1);
		c = r.insertCell(-1);
		domClass.add(c, "dojoxUploaderIndex");
		c.innerHTML = index;

		c = r.insertCell(-1);
		domClass.add(c, "dojoxUploaderIcon");
		c.innerHTML = type;

		c = r.insertCell(-1);
		domClass.add(c, "dojoxUploaderFileName");
		c.innerHTML = name;
		if(this._fileSizeAvail){
			c = r.insertCell(-1);
			domClass.add(c, "dojoxUploaderSize");
			c.innerHTML = this.convertBytes(size).value;
		}

		this.rowAmt++;
	}
});
});

},
'url:epi-packaging/templates/SelectedFiles.htm':"﻿<div class=\"dojoxUploaderFileList\" data-dojo-attach-point=\"listContainer\" style=\"display:none\">\r\n    <span>${res.fileslisttitle}</span>\r\n    <div data-dojo-attach-point=\"sizeHeader\" style=\"display:none;\"></div>\r\n    <table class=\"dojoxUploaderFileListTable epi-default\" data-dojo-attach-point=\"listTable\">\r\n        <thead>\r\n            <tr class=\"dojoxUploaderFileListHeader\">\r\n                <th class=\"dojoxUploaderIndex\">\r\n                    ${res.headerindex}\r\n                </th>\r\n                <th class=\"dojoxUploaderIcon\">\r\n                    ${res.headertype}\r\n                </th>\r\n                <th class=\"dojoxUploaderFileName\">\r\n                    ${res.headerfile}\r\n                </th>\r\n            </tr>\r\n        </thead>\r\n        <tbody data-dojo-attach-point=\"listNode\"></tbody>\r\n    </table>\r\n</div>\r\n",
'dojox/form/uploader/plugins/IFrame':function(){
define("dojox/form/uploader/plugins/IFrame", [
	"dojo/dom-construct",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/io/iframe",
	"dojox/form/uploader/plugins/HTML5"
],function(domConstruct, declare, lang, array, ioIframe, formUploaderPluginsHTML5){
	

var pluginsIFrame = declare("dojox.form.uploader.plugins.IFrame", [], {
	// summary:
	//		A plugin for dojox.form.Uploader that adds Ajax upload capabilities.
	//
	// description:
	//		Only supported by IE, due to the specific iFrame hack used. The
	//		formUploaderPluginsHTML5 plugin should be used along with this to add HTML5
	//		capabilities to browsers that support them. Progress events are not supported.
	//		Inherits all properties from dojox.form.Uploader and formUploaderPluginsHTML5.
	//
	//
	// Version: 1.6

	
	force:"",

	postMixInProperties: function(){
		this.inherited(arguments);
		if(!this.supports("multiple") || this.force =="iframe"){
			this.uploadType = "iframe";
			this.upload = this.uploadIFrame;
		}
	},

	uploadIFrame: function(data){
		// summary:
		//		Internal. You could use this, but you should use upload() or submit();
		//		which can also handle the post data.

		var form, destroyAfter = false;
		if(!this.getForm()){
			//enctype can't be changed once a form element is created
			form = domConstruct.place('<form enctype="multipart/form-data" method="post"></form>', this.domNode);
			array.forEach(this._inputs, function(n, i){
				if(n.value) form.appendChild(n);
			}, this);
			destroyAfter = true;
		}else{
			form = this.form;
		}

		var url = this.getUrl();

		var dfd = ioIframe.send({
			url: url,
			form: form,
			handleAs: "json",
			content: data,
			method: "POST",
			error: lang.hitch(this, function(err){
				console.error('error parsing server result', err);
				if(destroyAfter){ domConstruct.destroy(form); }
				this.onError(err);
			}),
			load: lang.hitch(this, function(data, ioArgs, widgetRef){
				if(destroyAfter){ domConstruct.destroy(form); }
				if(data["ERROR"] || data["error"]){
					this.onError(data);
				}else{
					this.onComplete(data);
				}
			})
		});
	}
});

dojox.form.addUploaderPlugin(pluginsIFrame);

return pluginsIFrame;
});

},
'dojo/io/iframe':function(){
define("dojo/io/iframe", [
	"../_base/config", "../_base/json", "../_base/kernel", /*===== "../_base/declare", =====*/ "../_base/lang",
	"../_base/xhr", "../sniff", "../_base/window",
	"../dom", "../dom-construct", "../query", "require", "../aspect", "../request/iframe"
], function(config, json, kernel, /*===== declare, =====*/ lang, xhr, has, win, dom, domConstruct, query, require, aspect, _iframe){

// module:
//		dojo/io/iframe

kernel.deprecated("dojo/io/iframe", "Use dojo/request/iframe.", "2.0");

/*=====
var __ioArgs = declare(kernel.__IoArgs, {
	// method: String?
	//		The HTTP method to use. "GET" or "POST" are the only supported
	//		values.  It will try to read the value from the form node's
	//		method, then try this argument. If neither one exists, then it
	//		defaults to POST.
	// handleAs: String?
	//		Specifies what format the result data should be given to the
	//		load/handle callback. Valid values are: text, html, xml, json,
	//		javascript. IMPORTANT: For all values EXCEPT html and xml, The
	//		server response should be an HTML file with a textarea element.
	//		The response data should be inside the textarea element. Using an
	//		HTML document the only reliable, cross-browser way this
	//		transport can know when the response has loaded. For the html
	//		handleAs value, just return a normal HTML document.  NOTE: xml
	//		is now supported with this transport (as of 1.1+); a known issue
	//		is if the XML document in question is malformed, Internet Explorer
	//		will throw an uncatchable error.
	// content: Object?
	//		If "form" is one of the other args properties, then the content
	//		object properties become hidden form form elements. For
	//		instance, a content object of {name1 : "value1"} is converted
	//		to a hidden form element with a name of "name1" and a value of
	//		"value1". If there is not a "form" property, then the content
	//		object is converted into a name=value&name=value string, by
	//		using xhr.objectToQuery().
});
=====*/

/*=====
return kernel.io.iframe = {
	// summary:
	//		Deprecated, use dojo/request/iframe instead.
	//		Sends an Ajax I/O call using and Iframe (for instance, to upload files)

	create: function(fname, onloadstr, uri){
		// summary:
		//		Creates a hidden iframe in the page. Used mostly for IO
		//		transports.  You do not need to call this to start a
		//		dojo/io/iframe request. Just call send().
		// fname: String
		//		The name of the iframe. Used for the name attribute on the
		//		iframe.
		// onloadstr: String
		//		A string of JavaScript that will be executed when the content
		//		in the iframe loads.
		// uri: String
		//		The value of the src attribute on the iframe element. If a
		//		value is not given, then dojo/resources/blank.html will be
		//		used.
	},
	setSrc: function(iframe, src, replace){
		// summary:
		//		Sets the URL that is loaded in an IFrame. The replace parameter
		//		indicates whether location.replace() should be used when
		//		changing the location of the iframe.
	},
	doc: function(iframeNode){
		// summary:
		//		Returns the document object associated with the iframe DOM Node argument.
	}
};
=====*/


var mid = _iframe._iframeName;
mid = mid.substring(0, mid.lastIndexOf('_'));

var iframe = lang.delegate(_iframe, {
	// summary:
	//		Deprecated, use dojo/request/iframe instead.
	//		Sends an Ajax I/O call using and Iframe (for instance, to upload files)

	create: function(){
		return iframe._frame = _iframe.create.apply(_iframe, arguments);
	},

	// cover up delegated methods
	get: null,
	post: null,

	send: function(/*__ioArgs*/args){
		// summary:
		//		Function that sends the request to the server.
		//		This transport can only process one send() request at a time, so if send() is called
		//		multiple times, it will queue up the calls and only process one at a time.
		var rDfd;

		//Set up the deferred.
		var dfd = xhr._ioSetArgs(args,
			function(/*Deferred*/dfd){
				// summary:
				//		canceller function for xhr._ioSetArgs call.
				rDfd && rDfd.cancel();
			},
			function(/*Deferred*/dfd){
				// summary:
				//		okHandler function for xhr._ioSetArgs call.
				var value = null,
					ioArgs = dfd.ioArgs;
				try{
					var handleAs = ioArgs.handleAs;

					//Assign correct value based on handleAs value.
					if(handleAs === "xml" || handleAs === "html"){
						value = rDfd.response.data;
					}else{
						value = rDfd.response.text;
						if(handleAs === "json"){
							value = json.fromJson(value);
						}else if(handleAs === "javascript"){
							value = kernel.eval(value);
						}
					}
				}catch(e){
					value = e;
				}
				return value;
			},
			function(/*Error*/error, /*Deferred*/dfd){
				// summary:
				//		errHandler function for xhr._ioSetArgs call.
				dfd.ioArgs._hasError = true;
				return error;
			}
		);

		var ioArgs = dfd.ioArgs;

		var method = "GET",
			form = dom.byId(args.form);
		if(args.method && args.method.toUpperCase() === "POST" && form){
			method = "POST";
		}

		var options = {
			method: method,
			handleAs: args.handleAs === "json" || args.handleAs === "javascript" ? "text" : args.handleAs,
			form: args.form,
			query: form ? null : args.content,
			data: form ? args.content : null,
			timeout: args.timeout,
			ioArgs: ioArgs
		};

		if(options.method){
			options.method = options.method.toUpperCase();
		}

		if(config.ioPublish && kernel.publish && ioArgs.args.ioPublish !== false){
			var start = aspect.after(_iframe, "_notifyStart", function(data){
				if(data.options.ioArgs === ioArgs){
					start.remove();
					xhr._ioNotifyStart(dfd);
				}
			}, true);
		}
		rDfd = _iframe(ioArgs.url, options, true);

		ioArgs._callNext = rDfd._callNext;

		rDfd.then(function(){
			dfd.resolve(dfd);
		}).otherwise(function(error){
			dfd.ioArgs.error = error;
			dfd.reject(error);
		});

		return dfd;
	},

	_iframeOnload: win.global[mid + '_onload']
});

lang.setObject("dojo.io.iframe", iframe);

return iframe;
});

},
'dojo/request/iframe':function(){
define("dojo/request/iframe", [
	'module',
	'require',
	'./watch',
	'./util',
	'./handlers',
	'../_base/lang',
	'../io-query',
	'../query',
	'../has',
	'../dom',
	'../dom-construct',
	'../_base/window',
	'../NodeList-dom'/*=====,
	'../request',
	'../_base/declare' =====*/
], function(module, require, watch, util, handlers, lang, ioQuery, query, has, dom, domConstruct, win/*=====, NodeList, request, declare =====*/){
	var mid = module.id.replace(/[\/\.\-]/g, '_'),
		onload = mid + '_onload';

	if(!win.global[onload]){
		win.global[onload] = function(){
			var dfd = iframe._currentDfd;
			if(!dfd){
				iframe._fireNextRequest();
				return;
			}

			var response = dfd.response,
				options = response.options,
				formNode = dom.byId(options.form) || dfd._tmpForm;

			if(formNode){
				// remove all the hidden content inputs
				var toClean = dfd._contentToClean;
				for(var i=0; i<toClean.length; i++){
					var key = toClean[i];
					//Need to cycle over all nodes since we may have added
					//an array value which means that more than one node could
					//have the same .name value.
					for(var j=0; j<formNode.childNodes.length; j++){
						var childNode = formNode.childNodes[j];
						if(childNode.name === key){
							domConstruct.destroy(childNode);
							break;
						}
					}
				}

				// restore original action + target
				dfd._originalAction && formNode.setAttribute('action', dfd._originalAction);
				if(dfd._originalMethod){
					formNode.setAttribute('method', dfd._originalMethod);
					formNode.method = dfd._originalMethod;
				}
				if(dfd._originalTarget){
					formNode.setAttribute('target', dfd._originalTarget);
					formNode.target = dfd._originalTarget;
				}
			}

			if(dfd._tmpForm){
				domConstruct.destroy(dfd._tmpForm);
				delete dfd._tmpForm;
			}

			dfd._finished = true;
		};
	}

	function create(name, onloadstr, uri){
		if(win.global[name]){
			return win.global[name];
		}

		if(win.global.frames[name]){
			return win.global.frames[name];
		}

		if(!uri){
			if(has('config-useXDomain') && !has('config-dojoBlankHtmlUrl')){
				console.warn('dojo/request/iframe: When using cross-domain Dojo builds,' +
					' please save dojo/resources/blank.html to your domain and set dojoConfig.dojoBlankHtmlUrl' +
					' to the path on your domain to blank.html');
			}
			uri = (has('config-dojoBlankHtmlUrl')||require.toUrl('dojo/resources/blank.html'));
		}

		var frame = domConstruct.place(
			'<iframe id="'+name+'" name="'+name+'" src="'+uri+'" onload="'+onloadstr+
			'" style="position: absolute; left: 1px; top: 1px; height: 1px; width: 1px; visibility: hidden">',
			win.body());

		win.global[name] = frame;

		return frame;
	}

	function setSrc(_iframe, src, replace){
		var frame = win.global.frames[_iframe.name];

		if(frame.contentWindow){
			// We have an iframe node instead of the window
			frame = frame.contentWindow;
		}

		try{
			if(!replace){
				frame.location = src;
			}else{
				frame.location.replace(src);
			}
		}catch(e){
			console.log('dojo/request/iframe.setSrc: ', e);
		}
	}

	function doc(iframeNode){
		if(iframeNode.contentDocument){
			return iframeNode.contentDocument;
		}
		var name = iframeNode.name;
		if(name){
			var iframes = win.doc.getElementsByTagName('iframe');
			if(iframeNode.document && iframes[name].contentWindow && iframes[name].contentWindow.document){
				return iframes[name].contentWindow.document;
			}else if(win.doc.frames[name] && win.doc.frames[name].document){
				return win.doc.frames[name].document;
			}
		}
		return null;
	}

	function createForm(){
		return domConstruct.create('form', {
			name: mid + '_form',
			style: {
				position: 'absolute',
				top: '-1000px',
				left: '-1000px'
			}
		}, win.body());
	}

	function fireNextRequest(){
		// summary:
		//		Internal method used to fire the next request in the queue.
		var dfd;
		try{
			if(iframe._currentDfd || !iframe._dfdQueue.length){
				return;
			}
			do{
				dfd = iframe._currentDfd = iframe._dfdQueue.shift();
			}while(dfd && (dfd.canceled || (dfd.isCanceled && dfd.isCanceled())) && iframe._dfdQueue.length);

			if(!dfd || dfd.canceled || (dfd.isCanceled && dfd.isCanceled())){
				iframe._currentDfd = null;
				return;
			}

			var response = dfd.response,
				options = response.options,
				c2c = dfd._contentToClean = [],
				formNode = dom.byId(options.form),
				notify = util.notify,
				data = options.data || null,
				queryStr;

			if(!dfd._legacy && options.method === 'POST' && !formNode){
				formNode = dfd._tmpForm = createForm();
			}else if(options.method === 'GET' && formNode && response.url.indexOf('?') > -1){
				queryStr = response.url.slice(response.url.indexOf('?') + 1);
				data = lang.mixin(ioQuery.queryToObject(queryStr), data);
			}

			if(formNode){
				if(!dfd._legacy){
					var parentNode = formNode;
					do{
						parentNode = parentNode.parentNode;
					}while(parentNode && parentNode !== win.doc.documentElement);

					// Append the form node or some browsers won't work
					if(!parentNode){
						formNode.style.position = 'absolute';
						formNode.style.left = '-1000px';
						formNode.style.top = '-1000px';
						win.body().appendChild(formNode);
					}

					if(!formNode.name){
						formNode.name = mid + '_form';
					}
				}

				// if we have things in data, we need to add them to the form
				// before submission
				if(data){
					var createInput = function(name, value){
						domConstruct.create('input', {
							type: 'hidden',
							name: name,
							value: value
						}, formNode);
						c2c.push(name);
					};
					for(var x in data){
						var val = data[x];
						if(lang.isArray(val) && val.length > 1){
							for(var i=0; i<val.length; i++){
								createInput(x, val[i]);
							}
						}else{
							if(!formNode[x]){
								createInput(x, val);
							}else{
								formNode[x].value = val;
							}
						}
					}
				}

				//IE requires going through getAttributeNode instead of just getAttribute in some form cases,
				//so use it for all.  See #2844
				var actionNode = formNode.getAttributeNode('action'),
					methodNode = formNode.getAttributeNode('method'),
					targetNode = formNode.getAttributeNode('target');

				if(response.url){
					dfd._originalAction = actionNode ? actionNode.value : null;
					if(actionNode){
						actionNode.value = response.url;
					}else{
						formNode.setAttribute('action', response.url);
					}
				}

				if(!dfd._legacy){
					dfd._originalMethod = methodNode ? methodNode.value : null;
					if(methodNode){
						methodNode.value = options.method;
					}else{
						formNode.setAttribute('method', options.method);
					}
				}else{
					if(!methodNode || !methodNode.value){
						if(methodNode){
							methodNode.value = options.method;
						}else{
							formNode.setAttribute('method', options.method);
						}
					}
				}

				dfd._originalTarget = targetNode ? targetNode.value : null;
				if(targetNode){
					targetNode.value = iframe._iframeName;
				}else{
					formNode.setAttribute('target', iframe._iframeName);
				}
				formNode.target = iframe._iframeName;

				notify && notify.emit('send', response, dfd.promise.cancel);
				iframe._notifyStart(response);
				formNode.submit();
			}else{
				// otherwise we post a GET string by changing URL location for the
				// iframe

				var extra = '';
				if(response.options.data){
					extra = response.options.data;
					if(typeof extra !== 'string'){
						extra = ioQuery.objectToQuery(extra);
					}
				}
				var tmpUrl = response.url + (response.url.indexOf('?') > -1 ? '&' : '?') + extra;
				notify && notify.emit('send', response, dfd.promise.cancel);
				iframe._notifyStart(response);
				iframe.setSrc(iframe._frame, tmpUrl, true);
			}
		}catch(e){
			dfd.reject(e);
		}
	}

	// dojo/request/watch handlers
	function isValid(response){
		return !this.isFulfilled();
	}
	function isReady(response){
		return !!this._finished;
	}
	function handleResponse(response, error){
		if(!error){
			try{
				var options = response.options,
					doc = iframe.doc(iframe._frame),
					handleAs = options.handleAs;

				if(handleAs !== 'html'){
					if(handleAs === 'xml'){
						// IE6-8 have to parse the XML manually. See http://bugs.dojotoolkit.org/ticket/6334
						if(doc.documentElement.tagName.toLowerCase() === 'html'){
							query('a', doc.documentElement).orphan();
							var xmlText = doc.documentElement.innerText;
							xmlText = xmlText.replace(/>\s+</g, '><');
							response.text = lang.trim(xmlText);
						}else{
							response.data = doc;
						}
					}else{
						// 'json' and 'javascript' and 'text'
						response.text = doc.getElementsByTagName('textarea')[0].value; // text
					}
					handlers(response);
				}else{
					response.data = doc;
				}
			}catch(e){
				error = e;
			}
		}

		if(error){
			this.reject(error);
		}else if(this._finished){
			this.resolve(response);
		}else{
			this.reject(new Error('Invalid dojo/request/iframe request state'));
		}
	}
	function last(response){
		this._callNext();
	}

	var defaultOptions = {
		method: 'POST'
	};
	function iframe(url, options, returnDeferred){
		var response = util.parseArgs(url, util.deepCreate(defaultOptions, options), true);
		url = response.url;
		options = response.options;

		if(options.method !== 'GET' && options.method !== 'POST'){
			throw new Error(options.method + ' not supported by dojo/request/iframe');
		}

		if(!iframe._frame){
			iframe._frame = iframe.create(iframe._iframeName, onload + '();');
		}

		var dfd = util.deferred(response, null, isValid, isReady, handleResponse, last);
		dfd._callNext = function(){
			if(!this._calledNext){
				this._calledNext = true;
				iframe._currentDfd = null;
				iframe._fireNextRequest();
			}
		};
		dfd._legacy = returnDeferred;

		iframe._dfdQueue.push(dfd);
		iframe._fireNextRequest();

		watch(dfd);

		return returnDeferred ? dfd : dfd.promise;
	}

	/*=====
	iframe = function(url, options){
		// summary:
		//		Sends a request using an iframe element with the given URL and options.
		// url: String
		//		URL to request
		// options: dojo/request/iframe.__Options?
		//		Options for the request.
		// returns: dojo/request.__Promise
	};
	iframe.__BaseOptions = declare(request.__BaseOptions, {
		// form: DOMNode?
		//		A form node to use to submit data to the server.
		// data: String|Object?
		//		Data to transfer. When making a GET request, this will
		//		be converted to key=value parameters and appended to the
		//		URL.
	});
	iframe.__MethodOptions = declare(null, {
		// method: String?
		//		The HTTP method to use to make the request. Must be
		//		uppercase. Only `"GET"` and `"POST"` are accepted.
		//		Default is `"POST"`.
	});
	iframe.__Options = declare([iframe.__BaseOptions, iframe.__MethodOptions]);

	iframe.get = function(url, options){
		// summary:
		//		Send an HTTP GET request using an iframe element with the given URL and options.
		// url: String
		//		URL to request
		// options: dojo/request/iframe.__BaseOptions?
		//		Options for the request.
		// returns: dojo/request.__Promise
	};
	iframe.post = function(url, options){
		// summary:
		//		Send an HTTP POST request using an iframe element with the given URL and options.
		// url: String
		//		URL to request
		// options: dojo/request/iframe.__BaseOptions?
		//		Options for the request.
		// returns: dojo/request.__Promise
	};
	=====*/
	iframe.create = create;
	iframe.doc = doc;
	iframe.setSrc = setSrc;

	// TODO: Make these truly private in 2.0
	iframe._iframeName = mid + '_IoIframe';
	iframe._notifyStart = function(){};
	iframe._dfdQueue = [];
	iframe._currentDfd = null;
	iframe._fireNextRequest = fireNextRequest;

	util.addCommonMethods(iframe, ['GET', 'POST']);

	return iframe;
});

},
'url:epi-packaging/templates/PackageUpload.htm':"﻿<div>\r\n    <!-- Upload form -->\r\n    <form method=\"post\" action=\"${_uploadUrl}\" enctype=\"multipart/form-data\">\r\n        <div class=\"uploaderButton\" >\r\n            <input dojoAttachPoint=\"_uploaderInput\" type=\"file\" />\r\n        </div>\r\n        <input type=\"submit\" dojoAttachPoint=\"_installButton\" label=\"${res.buttoninstall}\" data-dojo-type=\"dijit/form/Button\" />\r\n        <input type=\"reset\" dojoAttachPoint=\"_clearButton\" label=\"${res.buttonclear}\" data-dojo-type=\"dijit/form/Button\" />\r\n        <div class=\"epi-paddingVertical-small\">\r\n            <!-- Selected files -->\r\n            <div dojoAttachPoint=\"_fileListNode\"></div>\r\n            <!-- Uploaded file -->\r\n            <div dojoAttachPoint=\"_uploadResultsNode\"></div>\r\n        </div>\r\n        <input type=\"hidden\" dojoAttachPoint=\"_uploadType\" name=\"uploadType\" />\r\n    </form>\r\n</div>\r\n",
'epi-packaging/RootContainer':function(){
﻿define([
"epi",
"dojo",
"dijit",
"dijit/layout/BorderContainer",
"epi-packaging/AntiForgeryData",
"epi-packaging/Toolbar",
"epi-packaging/NavigationMenu",
"epi/shell/widget/WidgetSwitcher",
"dijit/layout/ContentPane",
"epi-packaging/Notification"
],

function (epi, dojo, dijit, BorderContainer, AntiForgeryData, Toolbar, NavigationMenu, WidgetSwitcher, ContentPane, Notification) {

    return dojo.declare([BorderContainer], {
        //  summary:
        //      Root container for Add-ons UI component.
        //  description:
        //      Creates and initializes navigation, toolbar and main area components.

        _antiForgeryData: null,

        startup: function () {
            // tags:
            //      public

            if (this._started) { return; }

            this._antiForgeryData = new AntiForgeryData(this.antiForgeryToken);


            if (this.installationMode === "UI") {
                var toolbar = new Toolbar();
                var contentPaneToolbar = new ContentPane({ region: "top", content: toolbar });
                this.addChild(contentPaneToolbar);
            }
            else
            {
                var notification = new Notification();
                var contentPaneToolbar = new ContentPane({ region: "top", content: notification });
                this.addChild(contentPaneToolbar);
            }


            var navigationMenu = new NavigationMenu({
                antiForgeryData: this._antiForgeryData
            });
            var contentPaneMenu = new ContentPane({ region: "left", content: navigationMenu, style: "width: 17em" });
            this.addChild(contentPaneMenu);


            var widgetSwitcher = new WidgetSwitcher({
                componentConstructorArgs: { antiForgeryData: this._antiForgeryData },
                supportedContextTypes: []
            });
            var contentPaneSwitcher = new ContentPane({ region: "center", content: widgetSwitcher });
            this.addChild(contentPaneSwitcher);

            this.inherited(arguments);
        }
    });

});
},
'epi-packaging/Toolbar':function(){
﻿define([
"dojo/_base/declare",
"dojo/topic",
"dijit/layout/ContentPane",
"epi/shell/widget/ToolbarSet",
"epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.Toolbar"
],

function (declare, topic, ContentPane, ToolbarSet, res) {

    return declare([ToolbarSet], {
        // summary: Add-on toolbar

        res: res,

        constructor: function () {
            this.layoutContainerClass = ContentPane;
        },

        postCreate: function () {
            // summary: Overridden to add buttons to the tool bar once the toolbar itself has been created.
            this.add([
                {
                    name: "upload",
                    label: this.res.uploadbuttonlabel,
                    action: function () { topic.publish("/epi/shell/action/changeview", "epi-packaging/UploadSection"); }
                },
                {
                    name: "restartWarning",
                    widgetType: "epi-packaging/SiteRestartWarning"
                }
            ]);
            this.inherited(arguments);
        },

        destroy: function () {
            // summary: Destroys the widget. Overridden to disconnect listeners on button state.

            this.inherited(arguments);
        }
    });
});
},
'epi-packaging/Notification':function(){
require({cache:{
'url:epi-packaging/templates/Notification.htm':"﻿<span>\n    <h4>${res.codemode}</h4>\n</span>"}});
﻿define("epi-packaging/Notification", [
"dojo",
"dijit/_WidgetBase",
"dijit/_TemplatedMixin",
"dojo/text!./templates/Notification.htm",
"epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.Toolbar"],

function (dojo, _WidgetBase, _TemplatedMixin, template, res) {

    return dojo.declare([_WidgetBase, _TemplatedMixin], {
        res: res,
        templateString: template
    });
});
},
'url:epi-packaging/templates/Notification.htm':"﻿<span>\n    <h4>${res.codemode}</h4>\n</span>",
'epi-packaging/SiteRestartWarning':function(){
﻿define([
"dojo",
"dijit",
"epi/dependency",
"dijit/_Widget",
"dijit/_TemplatedMixin",
"dojo/text!./templates/SiteRestartWarning.htm",
"epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.SiteRestartWarning"],

function (dojo, dijit, dependency, _Widget, _TemplatedMixin, template, res) {

    return dojo.declare([_Widget, _TemplatedMixin], {
        // summary:
        //    Displays static warning about required site restart and the link to detailed information.

        res: res,
        helpUrl: null,
        templateString: template,
        
        postMixInProperties: function () {
            var manager = dependency.resolve("epi.ModuleManager");
            var module = manager.getModule("CMS"); //TODO: Consider to avoid such dependencies
            this.helpUrl = module.helpPath + "#addons";

            this.inherited(arguments);
        }
    });
});
},
'url:epi-packaging/templates/SiteRestartWarning.htm':"﻿<div class=\"epi-addonsRestartWarningContainer dijitInline\">\r\n    <span class=\"epi-addonsRestartWarningMessage\">${res.message} <a class=\"epi-visibleLink\" href=\"${helpUrl}\" onclick=\"window.open('${helpUrl}','_blank', 'scrollbars=yes, location=no, menubar=no, resizable=yes, toolbar=no, height=500, width=840');return false;\" target=\"_blank\"  >${res.learnmorelabel}</a></span>\r\n</div>",
'epi-packaging/UpdateableSection':function(){
﻿define([
"dojo",
"dijit",
"epi/routes",
"dijit/layout/_LayoutWidget",
"dijit/_TemplatedMixin",
"epi-packaging/SectionHeader",
"epi-packaging/ModulesList",
"dojo/text!./templates/Section.htm",
"epi/i18n!epi/packaging/nls/EPiServer.Packaging.UI.UpdateableSection"],

function (dojo, dijit, routes, _LayoutWidget, _TemplatedMixin, SectionHeader, ModulesList, template, res) {

    return dojo.declare([_LayoutWidget, _TemplatedMixin], {
        // summary:
        //    Updateable add-ons section widget.
        //
        // description:
        //    Displays the list of updateable add-ons.
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
        _listWidget: null,

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

            this._headerWidget = new SectionHeader({ webHelpAlias: "updateableaddons", antiForgeryData: this.antiForgeryData,
                                                sectionTitle: this.res.title }, this._headerPlaceholder);
            this._headerWidget.startup();

            this._listWidget = new ModulesList({ antiForgeryData: this.antiForgeryData, hideModuleInListOnAction: true, emptyListMessage: this.res.emptylistmessage,
                listingUrl: routes.getActionPath({ moduleArea: 'EPiServer.Packaging.UI', controller: 'AddOns', action: 'GetUpdateableModules' })
            }, this._contentPlaceholder);
            this._listWidget.startup();
            this.connect(this._listWidget, "onSiteRestartRequired", function () {
                this._headerWidget.updateView();
            });

            this.connect(this._listWidget, "onError", function (errors) {
                this._headerWidget.addErrorMessages(errors);
            });
            this.connect(this._listWidget, "onSuccess", function (messages) {
                this._headerWidget.addSuccessMessages(messages);
            });

            this.connect(this._listWidget, "onModuleActionPerformed", function () {
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
            this._headerWidget.clearErrorMessages();
            this._headerWidget.clearSuccessMessages();
            this._headerWidget.updateView();
            this._listWidget.updateView();
        }
    });
});
},
'epi-packaging/UploadSection':function(){
﻿define([
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
}}});
﻿/* Layer destination file. Needed as a place holder under development. */