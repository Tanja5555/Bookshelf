define("epi-cms/content-approval/viewmodels/ApprovalStepViewModel", [
    "dojo/_base/declare",
    // Epi
    "epi-cms/content-approval/viewmodels/ApproverViewModel",
    // Parent class
    "dojo/Stateful",
    "dojo/Evented",
    "epi/shell/DestroyableByKey",
    // Commands
    "epi-cms/content-approval/command/AddApprovalStep",
    "epi-cms/content-approval/command/RemoveApprovalStep",
    // Store modules
    "dojo/store/Memory",
    "dojo/store/Observable",
    //Resources
    "epi/i18n!epi/nls/episerver.cms.contentapproval"
], function (
    declare,
    // Epi
    ApproverViewModel,
    // Parent class
    Stateful,
    Evented,
    DestroyableByKey,
    // Commands
    AddApprovalStep,
    RemoveApprovalStep,
    // Store modules
    Memory,
    Observable,
    //Resources
    localization
) {

    return declare([Stateful, DestroyableByKey, Evented], {
        // summary:
        //      The view model for an approval step.
        // tags:
        //      internal

        // approvers: [public] Store
        //      Approvers for the approval step.
        approvers: null,

        // commands: [public] Array
        //      An array of commands available for the approval step.
        commands: null,

        // userStore: [readonly] Store
        //      A REST store for fetching data for users
        userStore: null,

        // canBeDeleted: [public] Boolean
        //      Indicates if the approval step can be deleted
        canBeDeleted: true,

        // isReadOnly: [readonly] Boolean
        //      Indicates if the approval step can be modified
        isReadOnly: false,

        // name: [public] String
        //      The name of the approval step that appears in the header.
        name: "",

        // isValid: [public] Boolean
        //      Indicates if the approval step can be saved
        isValid: true,

        // validationMessage: [readonly] String
        //      Holds the validation message when 'isValid' is false.
        validationMessage: null,

        // languages: [public] Array
        //      All the languages that is enable for the whole approval sequence
        languages: null,

        // showValidations: [public] Boolean
        //      Indicates if we are in a state where we want to show the validation messages.
        showValidations: false,

        addApprover: function (approver) {
            // summary:
            //      Adds an approver.
            // approver: Object
            //      Approver to be added.
            // tags:
            //      public

            approver.languages = approver.languages || [];

            this.approvers.add(this._createApprover(approver));
        },

        filterOutExistingUsers: function (users) {
            // summary:
            //      Filters out existing users from the search result that
            //      is already in the approver list.
            // tags:
            //      public

            var approvers = this.get("approvers");

            //Remove already added users before displaying the
            //result so that we can't add them again
            return users = users.filter(function (user) {
                return !approvers.get(user.userName);
            }, this);
        },

        filterApprovers: function (selectedLanguage) {
            // summary:
            //      Filters out approvers that cannot approve the given language.
            // tags:
            //      public

            this.approvers.query().forEach(function (approver) {
                // Approver can approve when "All languages" is selected,
                // or the approver is set for all languages.
                if (selectedLanguage === null || approver.languages.length === 0) {
                    approver.set("canApprove", true);
                    return;
                }

                // Or an approver can only approve languages it's set up for.
                var canApprove = approver.languages.some(function (language) {
                    return language === selectedLanguage;
                });
                approver.set("canApprove", canApprove);
            });
        },

        createApprovalStep: function () {
            // summary:
            //      Emits event for creating new approval step
            // tags:
            //      public
            this.emit("create-step", this);
        },

        removeApprovalStep: function () {
            // summary:
            //      Emits event for deleting approval step
            // tags:
            //      public
            this.emit("remove-step", this);
        },

        removeApprover: function (approverId) {
            // summary:
            //      Removes approver by id
            // tags:
            //      public

            if (this.isReadOnly) {
                return;
            }

            this.approvers.remove(approverId);
        },

        serialize: function () {
            // summary:
            //      Serialize approval step
            // tags:
            //      public

            var approvers = this.approvers.data.map(function (approver) {
                return approver.serialize();
            });

            return {
                name: this.name,
                approvers: approvers
            };
        },

        validate: function () {
            // summary:
            //      Checks if the approval step is valid and sets isValid and validationMessage.
            // tags:
            //      public

            if (!this.approvers) {
                return;
            }

            var approvers = this.approvers.query(),
                validationMessage = this._validateApprovers(approvers);

            if (!validationMessage) {
                validationMessage = this._validateLanguages(approvers);
            }

            // validationMessage should be set before setting isValid as there might be watchers on isValid.
            this.set("validationMessage", validationMessage);
            this.set("isValid", !validationMessage);
        },

        _createApprover: function (approver) {
            // summary:
            //      Creates ApproverViewModel and hooking up language event that emits change event. Triggers validation.
            // tags:
            //      private
            var viewModel = new ApproverViewModel(approver);

            this.own(
                viewModel.watch("languages", function () {
                    this.validate();
                    this.emit("change");
                }.bind(this))
            );

            this.validate();
            return viewModel;
        },

        _nameSetter: function (value) {
            // summary:
            //      Sets the name property and emit change event
            // tags:
            //      protected

            // If the value is null or undefined then set an empty string instead.
            value = value || "";

            if (value === this.name) {
                return;
            }
            this.name = value;
            this.emit("change");
        },

        _nameGetter: function () {
            // summary:
            //      Gets the name property if any exist; otherwise returns the placeholder.
            // tags:
            //      protected

            return this.name || localization.step.header.placeholder;
        },

        _approversSetter: function (approvers) {
            // summary:
            //      Transforms a list of approvers into ApproverViewModels and creates an observable memory store
            //      and observe the store for changes. Triggers validation.
            // tags:
            //      protected

            var viewModels = approvers.map(function (approver) {
                return this._createApprover(approver);
            }, this);

            this.approvers = Observable(new Memory({
                idProperty: "userName",
                data: viewModels
            }));

            this.destroyByKey("approversObserveHandle");
            this.ownByKey("approversObserveHandle", this.approvers.query().observe(function () {
                // Validate when approvers change.
                this.validate();
                this.emit("change");
            }.bind(this)));

            // Validate when setting new approvers.
            this.validate();
        },

        _commandsGetter: function () {
            // summary:
            //      Lazy loads the commands associated with the approval step.
            // tags:
            //      protected

            if (this.commands === null) {
                this.commands = [
                    new AddApprovalStep({ model: this }),
                    new RemoveApprovalStep({ model: this })
                ];
            }
            return this.commands;
        },

        _validateLanguages: function (approvers) {
            // summary:
            //      Validates if the approvalStep have approvers in all languages and
            //      returns the validationMessage
            // tags:
            //      private

            var validationMessage = null;

            if (!this.languages) {
                return validationMessage;
            }

            this.languages.forEach(function (definitionLanguage) {
                var hasLanguageApprovers = approvers.some(function (approver) {
                    //When the approver is set to approve all languages
                    if (approver.languages.length === 0) {
                        return true;
                    }

                    //Otherwise verify that it approves this current language.
                    return approver.languages.some(function (approverLanguage) {
                        return approverLanguage === definitionLanguage.value;
                    });
                });

                if (!hasLanguageApprovers) {
                    // validation message can contain multiple missing languages with the same localized error message
                    if (validationMessage) {
                        validationMessage.languages.push(definitionLanguage.value);
                    } else {
                        validationMessage = {
                            value: localization.validationmessage.notenoughlanguagesmessage.title,
                            languages: [definitionLanguage.value],
                            level: "warning"
                        };
                    }
                }
            });

            return validationMessage;
        },

        _validateApprovers: function (approvers) {
            // summary:
            //      Validates if the approvalStep have any approvers
            // tags:
            //      private

            var validationMessage = null;

            var hasApprovers = approvers.length > 0;
            if (!hasApprovers) {
                validationMessage = {
                    value: localization.validationmessage.notenoughapproversmessage.title,
                    languages: null,
                    level: "error"
                };
            }

            return validationMessage;
        }
    });
});
