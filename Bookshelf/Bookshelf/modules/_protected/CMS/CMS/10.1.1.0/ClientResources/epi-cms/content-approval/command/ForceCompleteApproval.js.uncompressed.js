define("epi-cms/content-approval/command/ForceCompleteApproval", [
    "dojo/_base/declare",
    "epi/i18n!epi/nls/episerver.cms.contentapproval.command.forcecompleteapproval",
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
        //      Force completes an approval instance as approved.
        // tags:
        //      internal

        // label: [public] String
        //      The action text of the command to be used in visual elements.
        label: localization.label,

        // executeMethod: [public] String
        //      The method to execute on the approval service.
        executeMethod: "forceCompleteApproval"
    });
});
