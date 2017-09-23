define("epi-cms/content-approval/command/EditApprovalDefinition", [
    "dojo/_base/declare",
    "dojo/topic",
    "dojo/when",
    "epi/dependency",
    "epi-cms/contentediting/ContentActionSupport",
    "epi/i18n!epi/nls/episerver.cms.contentapproval.command.edit",
    // Parent class and mixins
    "epi/shell/command/_Command"
], function (
    declare,
    topic,
    when,
    dependency,
    ContentActionSupport,
    localization,
    // Parent class and mixins
    _Command
) {

    return declare([_Command], {
        // summary:
        //      Redirects to the content approval view if there is an approval definition.
        // tags:
        //      internal

        // canExecute: [readonly] Boolean
        //      Flag which indicates whether this command is able to be executed.
        canExecute: false,

        // contentActionSupport: [public] object
        contentActionSupport: null,

        // iconClass: [public] String
        //      The icon class of the command to be used in visual elements.
        iconClass: "epi-iconApproval",

        // isAvailable: [public] Boolean
        //      Flag which indicates whether this command is available in the current context.
        isAvailable: false,

        // label: [public] String
        //      The action text of the command to be used in visual elements.
        label: null,

        postscript: function () {
            this.inherited(arguments);
            this.contentActionSupport = this.contentActionSupport || ContentActionSupport;

            this.profile = this.profile || dependency.resolve("epi.shell.Profile");
        },

        _onModelChange: function () {
            // summary:
            //      Enable the command if the user has access and sets the correct label.
            // tags:
            //      protected

            if (!this.model) {
                this._setEnabledState(false);
                return;
            }

            this._setEnabledState(true);

            var hasAdminAccess = this.contentActionSupport.hasAccess(this.model.accessMask, this.contentActionSupport.accessLevel.Administer);
            this.set("label", hasAdminAccess ? localization.editlabel : localization.viewlabel);
        },

        _setEnabledState: function (enabled) {
            // summary:
            //      Handles availability and if the command is executable.
            // tags:
            //      private

            when(this.profile.get("isEPiBetaUser"), function (isEPiBetaUser) {
                this.set("isAvailable", !!enabled && isEPiBetaUser);
            }.bind(this));
            this.set("canExecute", !!enabled);
        },

        _execute: function () {
            // summary:
            //      Redirects to the content approval view.
            // tags:
            //      protected

            topic.publish("/epi/shell/context/request",
                { uri: "epi.cms.approval:///" + this.model.contentLink },
                { sender: null });
        }
    });
});
