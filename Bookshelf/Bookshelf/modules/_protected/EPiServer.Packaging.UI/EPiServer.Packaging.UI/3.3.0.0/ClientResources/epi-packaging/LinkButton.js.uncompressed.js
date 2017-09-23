define("epi-packaging/LinkButton", [
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
