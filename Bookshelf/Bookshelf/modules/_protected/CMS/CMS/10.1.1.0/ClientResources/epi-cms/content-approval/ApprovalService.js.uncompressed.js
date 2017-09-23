define("epi-cms/content-approval/ApprovalService", [
    "dojo/_base/declare",
    "dojo/when",
    "dojo/Deferred",
    "dojo/Stateful",

    "epi/shell/xhr/errorHandler",
    "epi/dependency"
], function (
    declare,
    when,
    Deferred,
    Stateful,

    errorHandler,
    dependency
) {
    return declare([Stateful], {
        // summary:
        //      A service for interacting with content approvals.
        // tags:
        //      internal

        // approvalStore: [readonly] Store
        //      A REST store for saving and loading approval.
        approvalStore: null,

        // approvalDefinitionStore: [readonly] Store
        //      A REST store for saving and loading approval definitions.
        approvalDefinitionStore: null,

        postscript: function () {
            this.inherited(arguments);

            this.approvalStore = this.approvalStore || dependency.resolve("epi.storeregistry").get("epi.cms.approval");
            this.approvalDefinitionStore = this.approvalDefinitionStore || dependency.resolve("epi.storeregistry").get("epi.cms.approval.definition");
        },

        getApproval: function (contentLink) {
            // summary:
            //      Gets the approval for the given content link.
            // tags:
            //      public

            return when(this.approvalStore.get(contentLink)).otherwise(function () {
                // If the approval doesn't exist then return null.
                return null;
            });
        },

        approveChanges: function (approval) {
            // summary: approves the changes for the given approval
            // tags:
            //      public

            return errorHandler.wrapXhr(this.approvalStore.executeMethod("ApproveChanges", approval.id, { activeStepIndex: approval.activeStepIndex}));
        },

        forceCompleteApproval: function (approval) {
            // summary:
            //      Force completes an approval instance as approved.
            // tags:
            //      public

            var result = this.approvalStore.executeMethod("ForceComplete", approval.id);

            return errorHandler.wrapXhr(result);
        },

        rejectChanges: function (approval) {
            // summary: reject the changes for the given approval
            // tags:
            //      public

            return errorHandler.wrapXhr(this.approvalStore.executeMethod("RejectChanges", approval.id, { activeStepIndex: approval.activeStepIndex}));
        },

        cancelChanges: function (approval) {
            // summary: cancel the changes for the given approval
            // tags:
            //      public

            return errorHandler.wrapXhr(this.approvalStore.executeMethod("CancelChanges", approval.id));
        },

        getDefinition: function (contentLink) {
            // summary:
            //      Gets the approval definition for the given content link.
            // tags:
            //      public

            return when(this.approvalDefinitionStore.get(contentLink)).otherwise(function () {
                // If the approval definition doesn't exist then return null.
                return null;
            });
        },

        hasDefinition: function (contentLink) {
            // summary:
            //      Determines whether an approval definition has been created or inherited for the
            //      given content link.
            // tags:
            //      public

            return this.getDefinition(contentLink).then(function (definition) {
                // If a definition exists but has no id then it is the default empty definition.
                return definition !== null && definition.id !== 0;
            });
        },

        saveDefinition: function (definition) {
            // summary:
            //      Saves the approval definition.
            // tags:
            //      internal

            if (!definition) {
                return new Deferred().reject();
            }

            return errorHandler.wrapXhr(this.approvalDefinitionStore.put(definition));
        },

        deleteDefinition: function (contentLink) {
            // summary:
            //      Deletes the approval definition.
            // tags:
            //      internal

            return errorHandler.wrapXhr(this.approvalDefinitionStore.remove(contentLink));
        },

        inheritDefinition: function (contentLink) {
            // summary:
            //      Deletes the approval definition for given contentLink and returns its ancestor's definition.
            // returns: Promise
            //      A promise that resolves to the parent approval definition
            // tags:
            //      internal

            return errorHandler.wrapXhr(this.approvalDefinitionStore.executeMethod("Inherit", contentLink));
        }
    });
});
