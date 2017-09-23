require({cache:{
'url:epi-cms/content-approval/templates/ApprovalComponent.html':"<div class=\"epi-content-approval\">\n    <div class=\"epi-localToolbar epi-viewHeaderContainer\" data-dojo-type=\"dijit/Toolbar\">\n        <div class=\"epi-toolbarGroupContainer\">\n            <div class=\"epi-toolbarGroup epi-toolbarLeading\">\n                <div data-dojo-attach-point=\"breadcrumb\" data-dojo-type=\"epi-cms/widget/Breadcrumb\"></div>\n            </div>\n            <div class=\"epi-toolbarGroup epi-toolbarTrailing\" data-dojo-attach-point=\"commandNode\">\n                <div data-dojo-attach-point=\"validation\" data-dojo-type=\"epi-cms/widget/NotificationStatusBar\"></div>\n            </div>\n        </div>\n    </div>\n    <div data-dojo-attach-point=\"containerNode\" class=\"epi-content-approval__container\">\n        <div class=\"epi-content-approval__header\">\n            <h1>${resources.title}</h1>\n            <p>\n                ${resources.instructions.part1}\n                <em>${resources.instructions.part2}</em>\n                ${resources.instructions.part3}\n            </p>\n            <p>${resources.instructions.part4}</p>\n            <div class=\"epi-content-approval__settings\">\n                <span class=\"dijitInline\">\n                    <input id=\"enable-approval\" data-dojo-attach-point=\"enableButton\" data-dojo-type=\"dijit/form/RadioButton\">\n                    <label class=\"dijitInline\" for=\"enable-approval\">${resources.enabled}</label>\n                </span>\n                <span class=\"dijitInline\">\n                    <input id=\"inherit-approval\" data-dojo-attach-point=\"inheritButton\" data-dojo-type=\"dijit/form/RadioButton\">\n                    <label class=\"dijitInline\" for=\"inherit-approval\">${resources.inherited}</label>\n                </span>\n                <span class=\"dijitInline\">\n                    <input id=\"disabled-approval\" data-dojo-attach-point=\"disableButton\" data-dojo-type=\"dijit/form/RadioButton\">\n                    <label class=\"dijitInline\" for=\"disabled-approval\">${resources.disabled}</label>\n                </span>\n            </div>\n        </div>\n        <div class=\"epi-content-approval__disabled-warning\" data-dojo-attach-point=\"disabledWarningNode\">\n            ${resources.disabledwarning}\n        </div>\n        <div class=\"epi-content-approval__filter\" data-dojo-attach-point=\"filterNode\">\n            <span class=\"dijitInline\">${resources.languagefilter.description}</span>\n            <div data-dojo-attach-point=\"languageFilter\" data-dojo-type=\"dijit/form/Select\" class=\"epi-chromeless epi-chromeless--with-arrow epi-visibleLink\"></div>\n        </div>\n        <div data-dojo-attach-point=\"stepList\" data-dojo-type=\"epi-cms/content-approval/ApprovalStepList\"></div>\n    </div>\n</div>\n"}});
define("epi-cms/content-approval/ApprovalComponent", [
    "dojo/_base/lang",
    "dojo/_base/declare",
    "dojo/Deferred",
    "dojo/dom-style",
    "epi/shell/DialogService",
    "epi/shell/command/builder/ButtonBuilder",
    "epi/shell/widget/dialog/Confirmation",
    "epi-cms/content-approval/ApprovalDefinitionStatus",
    "epi-cms/content-approval/viewmodels/ContentApprovalViewModel",
    // Parent class and mixins
    "dijit/layout/_LayoutWidget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "epi/shell/widget/_ModelBindingMixin",
    // Resources
    "dojo/text!./templates/ApprovalComponent.html",
    "epi/i18n!epi/nls/episerver.cms.contentapproval.component",
    "epi/i18n!epi/nls/episerver.shared.action",
    // Widgets in template
    "dijit/Toolbar",
    "dijit/form/RadioButton",
    "dijit/form/Select",
    "epi-cms/widget/Breadcrumb",
    "epi-cms/widget/NotificationStatusBar",
    "epi-cms/content-approval/ApprovalStepList"
], function (
    lang,
    declare,
    Deferred,
    domStyle,
    dialogService,
    ButtonBuilder,
    Confirmation,
    ApprovalDefinitionStatus,
    ContentApprovalViewModel,
    // Parent class and mixins
    _LayoutWidget,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    _ModelBindingMixin,
    // Resources
    template,
    localization,
    sharedLocalization
) {

    return declare([_LayoutWidget, _TemplatedMixin, _WidgetsInTemplateMixin, _ModelBindingMixin], {
        // summary:
        //      The view for the content approval component; responsible for creating the content
        //      approval view model and creating child view components.
        // tags:
        //      internal

        // templateString: [protected] String
        //      A string that represents the widget template.
        templateString: template,

        // languageWarningTemplate: [protected] String
        //      HTML template for showing a warning on languageFilter items that has validation issues.
        languageWarningTemplate: " <span class='dijitInline dijitReset dijitIcon epi-iconWarning' title='" + localization.languagefilter.warningmessage + "'></span>",

        // resources: [protected] Object
        //      An object containing resource strings in the current language.
        resources: localization,

        modelBindingMap: {
            currentContentLink: ["breadcrumbContentLink", "notificationContext"],
            isReadOnly: ["isReadOnly"],
            filterOptions: ["filterOptions"],
            status: ["status"]
        },

        postMixInProperties: function () {
            // summary:
            //      Processing after the parameters to the widget have been read-in, but before the
            //      widget template is instantiated.
            // tags:
            //      protected

            this.inherited(arguments);

            // Create the view model if one has not been injected in the constructor.
            this.model = this.model || new ContentApprovalViewModel();
            this.own(this.model);
        },

        buildRendering: function () {
            // summary:
            //      Build the approval component rendering from the template and then create buttons
            //      for the commands.
            // tags:
            //      protected

            this.inherited(arguments);

            // Generate buttons based on commands available in the view model
            var builder = new ButtonBuilder(),
                commands = this.model.get("commands");

            commands.forEach(function (command) {
                builder.create(command, this.commandNode);
            }, this);
        },

        postCreate: function () {
            // summary:
            //        Processing after the DOM fragment is created
            // tags:
            //        protected

            this.inherited(arguments);

            this.stepList.set("model", this.model);

            this.own(
                this.enableButton.on("click", this._updateStatus.bind(this, ApprovalDefinitionStatus.enabled)),
                this.disableButton.on("click", this._updateStatus.bind(this, ApprovalDefinitionStatus.disabled)),
                this.inheritButton.on("click", this._updateStatus.bind(this, ApprovalDefinitionStatus.inheritEnabled)),
                this.languageFilter.on("change", this._updateSelectedLanguage.bind(this))
            );
        },

        _isEnabled: function () {
            // summary:
            //      Determines if the approval definition is enabled.
            // tags:
            //      private

            return this.status === ApprovalDefinitionStatus.enabled || this.status === ApprovalDefinitionStatus.inheritEnabled;
        },

        _updateSelectedLanguage: function (language) {
            this.model.set("selectedLanguage", language);
        },

        _setNotificationContextAttr: function () {
            // summary:
            //      Set the validation message query to filter what messages on
            //      messageService should display in the NotificationStatusBar.
            // tags:
            //      private

            this.validation.set("notificationContext", {
                contextTypeName: "epi.cms.approval",
                contextId: this.model.currentContentLink
            });
        },

        _setBreadcrumbContentLinkAttr: function () {
            // summary:
            //      Sets the contentLink for the breadcrumb
            // tags:
            //      private

            this.breadcrumb.set("contentLink", this.model.currentContentLink);
        },

        _setStatusAttr: function (status) {
            this._set("status", status);
            this.enableButton.set("checked", status === ApprovalDefinitionStatus.enabled);
            this.disableButton.set("checked", status === ApprovalDefinitionStatus.disabled);
            this.inheritButton.set("checked", status === ApprovalDefinitionStatus.inheritEnabled || status === ApprovalDefinitionStatus.inheritDisabled);

            var enabled = this._isEnabled();

            // Toggle the visibility of the step list, the filter node and the disabled warning node
            domStyle.set(this.stepList.domNode, "display", enabled ? "" : "none");
            domStyle.set(this.filterNode, "display", enabled && !!this.model.get("filterOptions") ? "" : "none");
            domStyle.set(this.disabledWarningNode, "display", enabled ? "none" : "");
        },

        _setIsReadOnlyAttr: function (isReadOnly) {
            this._set("isReadOnly", isReadOnly);
            this.enableButton.set("disabled", isReadOnly);
            this.disableButton.set("disabled", isReadOnly);
            this.inheritButton.set("disabled", isReadOnly);
        },

        _setFilterOptionsAttr: function (filterOptions) {
            // summary:
            //      Shows or hides the filter widget and also sets its options.
            // tags:
            //      private

            var showFilter = !!filterOptions && this._isEnabled();
            domStyle.set(this.filterNode, "display", showFilter ? "" : "none");
            if (!filterOptions) {
                return;
            }

            // Clone the object so changes to it won't affect the model.
            filterOptions = lang.clone(filterOptions);
            // Keep track of the selected options. If it's "All Languages" use an empty string.
            var selectedLanguage = this.model.get("selectedLanguage") || "";
            filterOptions.forEach(function (filter) {
                if (!filter.isValid && this.model.get("showValidations")) {
                    filter.label += this.languageWarningTemplate;
                }

                filter.selected = selectedLanguage === filter.value;
            }, this);

            // Reset the filter options, and the selected item to update the displayed value.
            this.languageFilter.set("options", filterOptions);
            this.languageFilter.set("value", selectedLanguage);
        },

        _updateStatus: function (nextStatus) {
            var promise;
            switch (nextStatus) {
                case ApprovalDefinitionStatus.inheritEnabled:
                case ApprovalDefinitionStatus.inheritDisabled:
                    promise = this._confirmInherit();
                    break;
                case ApprovalDefinitionStatus.enabled:
                    this.model.enable();
                    promise = new Deferred().resolve();
                    break;
                case ApprovalDefinitionStatus.disabled:
                    promise = this._confirmDisable();
                    break;
            }

            // Reset the status if the user cancels the dialog.
            promise.otherwise(this.set.bind(this, "status", this.status));
        },

        _confirmDisable: function () {
            var settings = {
                title: this.resources.disable.title,
                description: this.resources.disable.description,
                confirmActionText: sharedLocalization.disable,
                cancelActionText: sharedLocalization.cancel
            };

            return dialogService.confirmation(settings)
                .then(this.model.disable.bind(this.model));
        },

        _confirmInherit: function () {
            var settings = {
                title: this.resources.inherit.title,
                description: this.resources.inherit.description,
                confirmActionText: this.resources.inherit.okbutton,
                cancelActionText: sharedLocalization.cancel,
                setFocusOnConfirmButton: false
            };

            return dialogService.confirmation(settings)
                .then(this.model.inheritDefinition.bind(this.model));
        }
    });
});
