define("epi-cms/content-approval/viewmodels/ApproverViewModel", [
    "dojo/_base/declare",
    "dojo/Stateful"
], function (
    declare,
    Stateful
) {
    return declare([Stateful], {
        // summary:
        //      The view model for an approver.
        // tags:
        //      internal

        // displayName: [public] String
        //      The displayName for the approver.
        displayName: null,

        // userName: [public] String
        //      The userName for the approver.
        userName: null,

        // languages: [public] Array
        //      Languages that this approver can approve.
        languages: null,

        // canApprove: [public] Boolean
        //      Indicates if the approver can approve the selected language.
        canApprove: true,

        serialize: function () {
            // summary:
            //      Serialize approver
            // tags:
            //      public

            return {
                userName: this.userName,
                displayName: this.displayName,
                languages: this.languages
            };
        }

    });
});
