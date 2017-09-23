define("epi-cms/contentediting/command/ScheduleForPublish", [
//Dojo
    "dojo/_base/declare",
//EPi shell
    "epi/shell/widget/dialog/Dialog",
//EPi cms
    "epi-cms/contentediting/command/_ChangeContentStatus",
    "epi-cms/contentediting/ContentActionSupport",
    "epi-cms/contentediting/ScheduledPublishSelector",
    "epi-cms/contentediting/ScheduledPublishSelectorViewModel",

//Resources
    "epi/i18n!epi/cms/nls/episerver.cms.contentediting.toolbar.buttons",
    "epi/i18n!epi/cms/nls/episerver.cms.widget.scheduledpublishselector"
],

function (
//Dojo
    declare,
//EPi
    Dialog,
    _ChangeContentStatus,
    ContentActionSupport,
    ScheduledPublishSelector,
    ScheduledPublishSelectorViewModel,

//Resources
    buttonResources,
    widgetResources
) {

    return declare([_ChangeContentStatus], {
        // summary:
        //      Schedule publish command.
        //
        // tags:
        //      internal

        label: buttonResources.scheduleforpublish.label,

        tooltip: buttonResources.scheduleforpublish.title,

        iconClass: "epi-iconClock",

        action: ContentActionSupport.saveAction.Schedule,

        _execute: function () {
            // summary:
            //		Executes this command. Reject content sent for review.
            // tags:
            //		protected
            var viewModel = new ScheduledPublishSelectorViewModel();
            viewModel.set("contentData", this.model.contentData);
            var widget = new ScheduledPublishSelector({ model: viewModel });

            var inherited = this.getInherited(arguments);

            var dateSelectorDialog = new Dialog({ content: widget, title: widgetResources.title, defaultActionsVisible: false });
            dateSelectorDialog.on("execute", function () {
                // Update the "StartPublish" metadata property and then change the status.
                this.model.forceSaveProperty("iversionable_startpublish", viewModel.dateValue)
                    .then(inherited.bind(this));
            }.bind(this));

            dateSelectorDialog.show(true);
        }
    });
});
