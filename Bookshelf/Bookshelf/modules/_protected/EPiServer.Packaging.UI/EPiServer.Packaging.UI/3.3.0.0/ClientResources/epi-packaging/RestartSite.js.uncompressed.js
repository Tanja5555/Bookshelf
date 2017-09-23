require({cache:{
'url:epi-packaging/templates/RestartSite.htm':"﻿<div style=\"display: none;\" class=\"restartContainer\">\r\n    <span>${res.restartrequiredmessage}</span>\r\n    <input type=\"button\" dojoAttachPoint=\"restartButton\" data-dojo-type=\"dijit/form/Button\" label=\"${res.restartbuttonlabel}\"/>\r\n</div>"}});
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
