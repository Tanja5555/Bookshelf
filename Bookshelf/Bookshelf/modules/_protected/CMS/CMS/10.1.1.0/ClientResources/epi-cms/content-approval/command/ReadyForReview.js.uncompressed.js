define("epi-cms/content-approval/command/ReadyForReview", [
    "dojo/_base/declare",
    "epi-cms/contentediting/ContentActionSupport",
    // Parent class
    "epi-cms/contentediting/command/_ChangeContentStatus",
    // Resources
    "epi/i18n!epi/nls/episerver.cms.contentapproval.command.requestapproval"
], function (
    declare,
    ContentActionSupport,
    // Parent class
    _ChangeContentStatus,
    // Resources
    localization
) {

    return declare([_ChangeContentStatus], {
        // summary:
        //      Set the content as ready to review.
        // tags:
        //      internal

        label: localization.label,

        executingLabel: localization.label,

        action: ContentActionSupport.saveAction.RequestApproval
    });
});
