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
