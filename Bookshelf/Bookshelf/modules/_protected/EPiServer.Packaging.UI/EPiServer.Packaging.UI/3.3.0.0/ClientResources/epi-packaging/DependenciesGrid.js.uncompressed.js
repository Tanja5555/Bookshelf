define("epi-packaging/DependenciesGrid", [
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
