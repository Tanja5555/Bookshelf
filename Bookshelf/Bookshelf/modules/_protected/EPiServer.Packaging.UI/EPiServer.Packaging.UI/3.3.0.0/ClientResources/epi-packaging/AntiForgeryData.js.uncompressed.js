define("epi-packaging/AntiForgeryData", ["dojo"], function (dojo) {

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
