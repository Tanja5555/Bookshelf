define("epi-cms/contentediting/commandproviders/PublishMenuGlobal", [
    "dojo/_base/declare",

    "epi/shell/command/withConfirmation",
    "epi/shell/command/_CommandProviderMixin",

    "epi-cms/command/TranslateContent",
    "epi-cms/contentediting/command/ForPublishMenu",
    "epi-cms/contentediting/command/RevertToPublished",
    "epi-cms/contentediting/command/SendForReview",
    "epi-cms/contentediting/command/Publish",
    "epi-cms/contentediting/command/CreateDraft",
    "epi-cms/contentediting/command/EditCommonDraft",
    "epi-cms/contentediting/command/Withdraw",
    "epi-cms/contentediting/command/ScheduleForPublish",
    "epi-cms/contentediting/command/CancelAndEdit",

    "epi-cms/content-approval/command/ApproveChanges",
    "epi-cms/content-approval/command/CancelReview",
    "epi-cms/content-approval/command/ForceCompleteApproval",
    "epi-cms/content-approval/command/RejectChanges",
    "epi-cms/content-approval/command/ReadyForReview",

    "epi/i18n!epi/cms/nls/episerver.cms.contentediting.editactionpanel.publishactionmenu"
], function (
    declare,

    withConfirmation,
    _CommandProviderMixin,

    TranslateContentCommand,
    ForPublishMenu,
    RevertToPublishedCommand,
    SendForReviewCommand,
    PublishCommand,
    CreateDraftCommand,
    EditCommonDraft,
    WithdrawCommand,
    ScheduleForPublishCommand,
    CancelAndEditCommand,

    ApproveChangesCommand,
    CancelReviewCommand,
    ForceCompleteApprovalCommand,
    RejectChangesCommand,
    ReadyForReviewCommand,

    res
) {

    return declare([_CommandProviderMixin], {
        // summary:
        //      Builtin Command provider for publish menu.
        // tags:
        //      internal

        commandMap: null,

        constructor: function () {
            this.commandMap = {
                approvechanges: ForPublishMenu(new ApproveChangesCommand(), {
                    isMain: true,
                    priority: 10000,
                    mainButtonClass: "epi-success"
                }),
                cancelreview: ForPublishMenu(new CancelReviewCommand()),
                forcecompleteapproval: ForPublishMenu(new ForceCompleteApprovalCommand()),
                publish: ForPublishMenu(new PublishCommand(), {
                    resetLabelAfterExecution: true,
                    isMain: true,
                    priority: 9000,
                    mainButtonClass: "epi-success",
                    keepMenuOpen: true,
                    successStatus: res.successfullypublished
                }),
                readyforreview: ForPublishMenu(new ReadyForReviewCommand(), {
                    isMain: true,
                    priority: 10000,
                    mainButtonClass: "epi-success"
                }),
                readytopublish: ForPublishMenu(new SendForReviewCommand(), {
                    isMain: true,
                    priority: 8000,
                    mainButtonClass: "epi-success",
                    keepMenuOpen: true
                }),
                rejectchanges: ForPublishMenu(new RejectChangesCommand()),
                removescheduling: ForPublishMenu(new CancelAndEditCommand()),
                scheduleforpublish: ForPublishMenu(new ScheduleForPublishCommand()),
                withdraw: ForPublishMenu(new WithdrawCommand(), {
                    resetLabelAfterExecution: false,
                    keepMenuOpen: true
                })
            };
        },

        updateCommandModel: function (model) {
            // summary:
            //        Creates commands based on the status transitions available for the content as
            //        well as several additional commands that are not status based.
            // tags:
            //        private

            var commands = [];

            model.contentData.transitions.forEach(function (transition) {
                var command = this.commandMap[transition.name];
                if (command) {
                    commands.push(command);
                }
            }, this);

            // Adds builtin commands

            // Translate
            commands.push(ForPublishMenu(new TranslateContentCommand(), {
                isMain: true,
                priority: 10000,
                mainButtonClass: "epi-primary"
            }));

            // Edit the common draft
            commands.push(ForPublishMenu(new EditCommonDraft()));

            // Create new draft from here
            commands.push(ForPublishMenu(new CreateDraftCommand()));

            // Revert to publish version
            commands.push(ForPublishMenu(withConfirmation(
                new RevertToPublishedCommand(), null, {
                    title: res.reverttopublishconfirmation.dialogtitle,
                    heading: res.reverttopublishconfirmation.confirmquestion,
                    description: res.reverttopublishconfirmation.description
                }
            )));

            this.set("commands", commands);

            this.inherited(arguments);
        }
    });
});
