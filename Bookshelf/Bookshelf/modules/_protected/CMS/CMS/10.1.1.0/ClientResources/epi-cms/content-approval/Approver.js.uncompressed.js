require({cache:{
'url:epi-cms/content-approval/templates/Approver.html':"<div class=\"epi-approver\">\n    <button class=\"epi-button--round epi-approver__remove-button\"\n            tabindex=\"-1\"\n            data-dojo-type=\"dijit/form/Button\"\n            type=\"button\">\n        <span class=\"dijitInline dijitIcon dijitReset epi-iconMinus epi-icon--inverted\"></span>\n    </button>\n    <span class=\"dijitInline dijitIcon epi-iconUser\"></span>\n    <span class=\"dijitInline epi-approver__name\"\n          data-dojo-attach-point=\"userDisplayNameNode\"></span>\n    <span class=\"epi-approver__language-selector epi-chromeless epi-chromeless--icon-only epi-chromeless--with-arrow\"\n          data-dojo-attach-point=\"languageSelector\"\n          data-dojo-type=\"epi-cms/contentediting/editors/CheckboxListDropDown\"\n          data-dojo-props=\"iconClass: 'epi-iconWebsite', header: '${resources.selectlanguage}', selectAllText: '${resources.anylanguage}'\"></span>\n    <span class=\"dijitInline\" data-dojo-attach-point=\"languageSettingsNode\"></span>\n</div>\n"}});
﻿define("epi-cms/content-approval/Approver", [
    "dojo/_base/declare",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojo/dom-style",
    "dojo/keys",
    "dojo/store/Memory",
    // Parent class and mixins
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "epi/shell/widget/_ModelBindingMixin",
    //Resources
    "dojo/text!./templates/Approver.html",
    "epi/i18n!epi/nls/episerver.cms.contentapproval.approver",
    // Widgets in template
    "epi-cms/contentediting/editors/CheckboxListDropDown"
], function (
    declare,
    domClass,
    domConstruct,
    domStyle,
    keys,
    Memory,
    // Parent class and mixins
    _WidgetBase,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    _ModelBindingMixin,
    //Resources
    template,
    localization
) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _ModelBindingMixin], {
        // summary:
        //      Responsible for displaying a single approver and its settings in the approval step.
        // tags:
        //      internal

        // model: [readonly] ApproverViewModel
        //      The view model of the approver.
        model: null,

        // modelBindingMap: [protected] Object
        //      The binding mappings from model properties to local properties.
        modelBindingMap: {
            canApprove: ["canApprove"]
        },

        // templateString: [protected] String
        //      A string that represents the widget template.
        templateString: template,

        // resources: [protected] Object
        //      An object containing resource strings in the current language.
        resources: localization,

        postMixInProperties: function () {
            // summary:
            //      Checks whether the model have been set before the template instantiated.
            // tags:
            //      protected

            // a model must be provided before creating this component.
            if (!this.model) {
                throw new Error("An instance of ApproverViewModel must be provided in order to create an Approver component.");
            }
        },

        buildRendering: function () {
            // summary:
            //      Builds the approver
            // tags:
            //      protected

            this.inherited(arguments);

            this.set("displayName", this.model.displayName);

            var store = new Memory({
                idProperty: "value",
                data: this.languageOptions || []
            });

            this.languageSelector.set("store", store);

            if (this.model.languages) {
                this.languageSelector.set("value", this.model.languages, false);
            }

            // Toggle the language selector visibility depending on whether there are any languages.
            domClass.toggle(this.languageSelector.domNode, "dijitHidden", !this.languageOptions);

            this.own(
                this.on(".epi-approver__remove-button:click", this._removeApprover.bind(this)),
                this.on("keydown", this._removeApprover.bind(this)),
                this.languageSelector.on("change", function (languages) {
                    this.model.set("languages", languages);
                    this._renderSelectedLanguages();
                }.bind(this))
            );

            this._renderSelectedLanguages();
        },

        _removeApprover: function (evt) {
            // summary:
            //      Handles when DELETE has been pressed while focusing an approver
            //      or the minus icon is clicked.
            // tags:
            //      private

            // only deletes approver on click on delete button or DELETE key press.
            if (evt.type === "click" || evt.keyCode === keys.DELETE) {
                evt.stopPropagation();
                this.emit("remove-approver", this.model);
            }
        },

        _renderSelectedLanguages: function () {

            // clear all current languages
            domConstruct.empty(this.languageSettingsNode);

            // No language render needed when only one language is available
            if (!this.languageOptions) {
                return;
            }

            var self = this;

            // Creates the language specific dom element for given input
            function toLanguageDom(language) {

                var languageBranch = self.languageSelector.store.get(language),
                    cssClasses = "dijitInline epi-lozenge";

                //Language set on the approver that is disabled will change apperance.
                if (!languageBranch && self.model.languages.length > 0) {
                    cssClasses += " epi-lozenge--inactive";
                }

                var properties = {
                    innerHTML: language,
                    "class": cssClasses,
                    title: languageBranch ? languageBranch.label : language
                };

                domConstruct.create("span", properties, self.languageSettingsNode);
            }

            if (this.model.languages) {

                // empty array represents all languages
                if (this.model.languages.length < 1) {
                    toLanguageDom(localization.alllanguages);
                    return;
                }

                this.model.languages.forEach(toLanguageDom);
            }
        },

        _setDisplayNameAttr: { node: "userDisplayNameNode", type: "innerText" },

        _setCanApproveAttr: function (canApprove) {
            domStyle.set(this.domNode, "display", canApprove ? "" : "none");
        }
    });
});
