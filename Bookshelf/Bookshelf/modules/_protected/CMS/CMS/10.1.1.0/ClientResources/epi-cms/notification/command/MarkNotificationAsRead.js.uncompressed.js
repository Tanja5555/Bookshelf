define("epi-cms/notification/command/MarkNotificationAsRead", [
    "dojo/_base/declare",
// Parent class and mixins
    "epi/shell/command/_PropertyWatchCommand",
// Resources
    "epi/i18n!epi/cms/nls/episerver.cms.notification.command"
], function (
    declare,
// Parent class and mixins
    _PropertyWatchCommand,
// Resources
    res
) {
    return declare([_PropertyWatchCommand], {
        // summary:
        //      A command for marking notification as read.
        // tags:
        //      internal

        // category: [readonly] String
        //      A category which provides a hint about how the command could be displayed.
        category: "itemContext",

        // label: [public] String
        //      The action text of the command to be used in visual elements.
        label: res.markasread,

        // canExecute: [public] Boolean
        //      Flag which indicates whether this command is able to be executed.
        canExecute: false,

        // propertiesToWatch: [public] String
        //      Property to watch on the model.
        propertiesToWatch: ["selectedNotification"],

        _execute: function () {
            // summary:
            //      Executes this command assuming canExecute has been checked.
            // tags:
            //      protected

            return this.model.markSelectedNotificationAsRead();
        },

        _onPropertyChanged: function () {
            // summary:
            //      Sets canExecute based on the state of the model.
            // tags:
            //      private

            var notification = this.model.selectedNotification;
            var canExecute = !!notification && !notification.hasRead;
            this.set("canExecute", canExecute);
        }
    });
});
