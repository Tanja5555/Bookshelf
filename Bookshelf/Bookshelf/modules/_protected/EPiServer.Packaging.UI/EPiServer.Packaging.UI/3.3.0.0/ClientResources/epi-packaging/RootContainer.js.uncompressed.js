define("epi-packaging/RootContainer", [
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