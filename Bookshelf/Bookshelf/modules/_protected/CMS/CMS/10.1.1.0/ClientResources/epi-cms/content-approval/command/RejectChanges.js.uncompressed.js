define("epi-cms/content-approval/command/RejectChanges", [
    "dojo/_base/declare",
    "epi/i18n!epi/nls/episerver.cms.contentapproval.command.rejectchanges",
    // Parent class and mixins
    "epi-cms/content-approval/command/_ApprovalTransitionCommand"
],
function (
    declare,
    localization,
    // Parent class and mixins
    _ApprovalTransitionCommand
) {

    return declare([_ApprovalTransitionCommand], {
        // summary:
        //      Reject the changes in the current approval step
        // tags:
        //      internal

        // label: [public] String
        //      The action text of the command to be used in visual elements.
        label: localization.label,

        // iconClass: [public] String
        //      The icon class of the command to be used in visual elements.
        iconClass: "epi-iconStop",

        // executeMethod: [public] String
        //      The method to execute on the approvalservice
        executeMethod: "rejectChanges"
    });
});
