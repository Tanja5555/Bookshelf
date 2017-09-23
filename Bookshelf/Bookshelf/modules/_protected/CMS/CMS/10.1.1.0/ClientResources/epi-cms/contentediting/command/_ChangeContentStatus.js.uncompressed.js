define("epi-cms/contentediting/command/_ChangeContentStatus", [
    "dojo/_base/declare",
    "dojo/topic",
    // Parent class
    "epi-cms/contentediting/command/_ContentCommandBase"
], function (
    declare,
    topic,
    // Parent class
    _ContentCommandBase
) {

    return declare([_ContentCommandBase], {
        // summary:
        //      Base class for any Change content status commands, like: Reject, Publish, ...
        // tags: private, abstract

        // action: [public] String
        //      Action to perform when changing content status. For example: publish, checkin, checkout, ...
        action: null,

        // canExecute: [readonly] Boolean
        //      Flag which indicates whether this command is able to be executed.
        canExecute: true,

        // forceReload: [public] Boolean
        //      Indicate whether the command should demand a reload together with the context change request.
        forceReload: false,

        // viewName: [public] String
        //      Represents the view that will be display after changing content status. It might be null or empty.
        viewName: null,

        // _defaultCanExecute: [readonly] Boolean
        //      The default state for canExecute property
        _defaultCanExecute: true,

        _execute: function () {
            // summary:
            //      Executes this command which asks the model to change the content status and then
            //      request a context change.
            // tags:
            //		protected

            return this.model.changeContentStatus(this.action).then(this._onContentStatusChange.bind(this));
        },

        _onContentStatusChange: function (result) {
            // summary:
            //      Callback which updates the context after the content status has been changed.
            // tags:
            //      protected

            var contextParameters = { uri: "epi.cms.contentdata:///" +  result.id };
            var callerData = {
                sender: this,
                trigger: "internal",
                forceContextChange: true,
                forceReload: this.forceReload
            };

            if (this.viewName) {
                callerData.viewName = this.viewName;
            }

            topic.publish("/epi/shell/context/request", contextParameters, callerData);
        }
    });
});
