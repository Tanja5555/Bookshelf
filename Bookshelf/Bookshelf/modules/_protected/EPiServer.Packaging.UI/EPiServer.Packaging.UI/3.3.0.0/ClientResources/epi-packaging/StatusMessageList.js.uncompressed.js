define("epi-packaging/StatusMessageList", [
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