define("epi-cms/contentediting/command/SendForReview", [
    "dojo/_base/declare",
    "dojo/topic",
    "epi-cms/contentediting/ContentActionSupport",
    "epi-cms/contentediting/command/_ChangeContentStatus",

//Resources
    "epi/i18n!epi/cms/nls/episerver.cms.contentediting.toolbar.buttons"
],

function (
    declare,
    topic,
    ContentActionSupport,
    _ChangeContentStatus,
    resources
) {

    return declare([_ChangeContentStatus], {
        // summary:
        //      Send for review command.
        //
        // tags:
        //      internal

        label: resources.sendforreview.label,

        executingLabel: resources.sendforreview.executinglabel,

        tooltip: resources.sendforreview.title,

        iconClass: "epi-iconCheckmark",

        action: ContentActionSupport.saveAction.CheckIn,

        _execute: function () {
            // summary:
            //    Executes this command. Send the current content for review.
            //
            // tags:
            //		protected

            // Disable Undo & Redo actions.
            topic.publish("/epi/cms/action/disableundoredoactions");

            return this.inherited(arguments);
        }
    });
});
