define("epi-cms/content-approval/command/ApproveChanges", [
    "dojo/_base/declare",
    "epi/i18n!epi/nls/episerver.cms.contentapproval.command.approvechanges",
    // Parent class and mixins
    "epi-cms/content-approval/command/_ApprovalTransitionCommand"
], function (
    declare,
    localization,
    // Parent class and mixins
    _ApprovalTransitionCommand
) {

    return declare([_ApprovalTransitionCommand], {
        // summary:
        //      Approve the current approval
        // tags:
        //      internal

        // label: [public] String
        //      The action text of the command to be used in visual elements.
        label: localization.label,

        // executingLabel: [public] String
        //      The executing action text of the command to be used in visual elements.
        executingLabel: localization.label,

        // executeMethod: [public] String
        //      The method to execute on the approvalservice
        executeMethod: "approveChanges"
    });
});
