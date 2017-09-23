define("epi-cms/contentediting/viewmodel/PublishMenuViewModel", [
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/when",
    "dojo/Deferred",
    "dijit/Destroyable",
    "dojox/html/entities",
    "epi",
    "epi/datetime",
    "epi/dependency",
    "epi/username",
    "epi-cms/contentediting/ContentActionSupport",
    "epi-cms/contentediting/viewmodel/_ContentViewModelObserver",
    "epi/shell/command/_CommandConsumerMixin",
    "epi/shell/command/_GlobalCommandProviderMixin",
    "epi/i18n!epi/cms/nls/episerver.cms.contentediting.editactionpanel.publishactionmenu"
],

function (
    declare,
    lang,
    when,
    Deferred,
    Destroyable,
    entities,
    epi,
    epiDate,
    dependency,
    username,
    ContentActionSupport,
    _ContentViewModelObserver,
    _CommandConsumerMixin,
    _GlobalCommandProviderMixin,
    res
    ) {

    return declare([_ContentViewModelObserver, _CommandConsumerMixin, _GlobalCommandProviderMixin, Destroyable], {
        // tags:
        //      internal

        commandKey: "epi.cms.publishmenu",

        contentActionSupport: null,
        inUseNotificationManager: null,

        _currentUser: null,

        // Declare view model properties
        // ---------------------------------------------------------------------

        commands: null,
        mainButtonCommand: null,
        lastExecutedCommand: null,

        mainButtonSectionVisible: null,

        lastChangeStatus: null,

        topInfoSectionVisible: null,

        publishInfoSectionVisible: null,
        lastPublishedText: null,
        lastPublishedViewLinkVisible: null,
        lastPublishedViewLinkHref: null,

        additionalInfoSectionVisible: null,
        additionalInfoText: null,

        isOpen: null,

        typeIdentifier: null,

        // Methods
        // ---------------------------------------------------------------------
        postscript: function () {
            this.inherited(arguments);

            this.res = this.res || res;
            this.projectService = this.projectService || dependency.resolve("epi.cms.ProjectService");
            this.approvalService = this.approvalService || dependency.resolve("epi.cms.ApprovalService");
            this.contentActionSupport = this.contentActionSupport || ContentActionSupport;
            this.initializeCommandProviders();
        },

        _setDataModelAttr: function (value) {
            this.updateCommandModel(value);
            this.inherited(arguments);
        },

        _setIsOpenAttr: function (value) {
            if (value) {
                var contentData = this.dataModel.contentData;
                this._setLastChangeStatus(contentData);
                if (contentData.status === ContentActionSupport.versionStatus.AwaitingApproval) {
                    this._setApprovalInfo(contentData);
                }
            }
        },

        onDataModelChange: function (name, oldValue, value) {
            // when data model changes, update view model properties accordingly.
            var contentData = this.dataModel.contentData,
                contentHasPublishedVersion = (contentData.publishedBy !== null && contentData.publishedBy !== undefined);

            // Update commands
            this._updateCommands();

            // Update other properties
            // -----------------------------------------------------------------------------

            this.set("typeIdentifier", contentData.typeIdentifier);
            this._setAdditionalInfo(contentData);

            if (contentData.status === ContentActionSupport.versionStatus.AwaitingApproval) {
                this._setApprovalInfo(contentData);
                return;
            }

            this._setLastChangeStatus(this.dataModel.contentData);

            // Top info section should be invisible if there is no main command and content is non-commondraft published version.
            this.set("topInfoSectionVisible", this._getTopInfoSectionVisible(contentData));

            this.set("publishInfoSectionVisible", this._getPublishInfoSectionVisible(contentData));
            this.set("lastPublishedTitle", this._getLastPublishedTitle(contentData));
            this.set("lastPublishedTitleVisible", contentHasPublishedVersion);
            this.set("lastPublishedText", this._getLastPublishedText(contentData));
            this.set("lastPublishedViewLinkVisible", this._getLastPublishedViewLinkVisible(contentData, contentHasPublishedVersion));
            this.set("lastPublishedViewLinkHref", contentData.publicUrl);
        },

        onCommandsChanged: function (name, removed, added) {

            added.forEach(function (command) {
                if (command.options && command.options.isMain) {
                    this.own(command.watch("canExecute", function () {
                        this._calculateMainButtonCommand();
                    }.bind(this)));
                }
            }, this);
        },

        _setApprovalInfo: function (contentData) {
            // summary:
            //      Retrieve and renders the approval information if found.
            // contentData:
            //      The content data object
            // tags:
            //      private

            return this.approvalService.getApproval(contentData.contentLink).then(lang.hitch(this, function (approval) {
                if (approval) {
                    var heading = lang.replace(res.approvalinfo.timepassed, {
                        timepassed: epiDate.timePassed(new Date(approval.startDate))
                    });

                    var stepInfo = lang.replace(res.approvalinfo.stepinfo, {
                        activeStepIndex: approval.activeStepIndex + 1,
                        totalsteps: approval.totalSteps
                    });

                    // render the top heading
                    var topInfoSection = heading + " <br /> " + stepInfo;
                    this.set("topInfoSectionVisible", true);
                    this.set("lastChangeStatus", topInfoSection);

                    var requestedBy = lang.replace(res.approvalinfo.requestedby, {
                        username: this._getFriendlyUsername(approval.startedBy, true),
                        time: epiDate.toUserFriendlyHtml(approval.startDate)
                    });

                    // render who requested/started the approval
                    this.set("publishInfoSectionVisible", true);
                    this.set("lastPublishedText", requestedBy);

                    // hide everything else.
                    this.set("lastPublishedTitleVisible", false);
                    this.set("lastPublishedViewLinkVisible", false);
                    return approval;
                }

                return null;
            }));
        },

        _lastChangeStatusSetter: function (lastChangeStatus) {
            this.lastChangeStatus = lastChangeStatus;
            return when(lastChangeStatus);
        },

        _updateCommands: function () {
            this._calculateMainButtonCommand();
            this.set("commands", this.getCommands());
        },

        _calculateMainButtonCommand: function () {
            var commands = this.getCommands(),
                mainCommand = null;

            commands.forEach(function (command) {
                if (command.canExecute &&
                    command.options && command.options.isMain && command.options.priority && (!mainCommand || mainCommand.options.priority < command.options.priority)) {

                    mainCommand = command;
                }
            });

            this.set("mainButtonCommand", mainCommand);
            this.set("mainButtonSectionVisible", mainCommand !== null);
        },

        _getTopInfoSectionVisible: function (contentData) {
            return this.mainButtonCommand || !((contentData.status === ContentActionSupport.versionStatus.Published ||
                contentData.status === ContentActionSupport.versionStatus.Expired) && !contentData.isCommonDraft);
        },

        _getPublishInfoSectionVisible: function (contentData) {
            // REMARK: Make it possible to do this in a plugin

            var hasInUseNotificationWarning = this.inUseNotificationManager.hasInUseNotificationWarning(contentData.inUseNotifications),
                originallyEditable = this._isOriginallyEditable();

            return !(hasInUseNotificationWarning && originallyEditable);
        },

        _getLastPublishedViewLinkVisible: function (contentData, contentHasPublishedVersion) {
            return contentHasPublishedVersion && !!contentData.publicUrl;
        },

        _setLastChangeStatus: function (contentData) {

            if (contentData.status === ContentActionSupport.versionStatus.AwaitingApproval) {
                return;
            }

            var defaultText, lastChangeStatus,
                self = this;

            lastChangeStatus = defaultText = this._getTemplatedText(this.res.lastchangestatus, contentData.changedBy, contentData.saved);

            if (this.lastExecutedCommand && this.lastExecutedCommand.options && this.lastExecutedCommand.options.successStatus) {
                var successStatus = this.lastExecutedCommand.options.successStatus;
                this.lastExecutedCommand = this.mainButtonCommand;
                lastChangeStatus = successStatus;
            }

            if (contentData.missingLanguageBranch && contentData.missingLanguageBranch.isTranslationNeeded) {
                lastChangeStatus = lang.replace(this.res.nottranslated, {
                    languageName: epi.resources.language[contentData.missingLanguageBranch.languageId],
                    languageId: contentData.missingLanguageBranch.languageId
                });
            }

            if (contentData.status === ContentActionSupport.versionStatus.Published ||
                contentData.status === ContentActionSupport.versionStatus.Expired) {
                lastChangeStatus = this.res.notmodifiedsincelastpublish;
            }

            if (contentData.status === ContentActionSupport.versionStatus.PreviouslyPublished) {
                lastChangeStatus = this._getTemplatedText(this.res.previouslypublished, contentData.versionCreatedBy, contentData.versionCreatedTime);
            }

            if (contentData.status === ContentActionSupport.versionStatus.Rejected) {
                lastChangeStatus = this._getTemplatedText(this.res.rejectedapproval, contentData.versionCreatedBy, contentData.versionCreatedTime);
            }

            if (contentData.status === ContentActionSupport.versionStatus.DelayedPublish) {
                lastChangeStatus = this.projectService.getProjectsForContent(contentData.contentLink).then(function (projects) {
                    projects = projects.filter(function (project) {
                        return project.status === "delayedpublished";
                    });

                    if (projects.length) {
                        return lang.replace(self.res.projectdelayedpublish, {
                            date: epiDate.toUserFriendlyHtml(contentData.properties.iversionable_startpublish),
                            project: entities.encode(projects[0].name)
                        });
                    }
                    return defaultText;
                });
            }

            when(lastChangeStatus, lang.hitch(this, "set", "lastChangeStatus"));
        },

        _getLastPublishedTitle: function (contentData) {
            return contentData.status === ContentActionSupport.versionStatus.PreviouslyPublished ?
                this.res.currentlypublished : this.res.lastpublishedby;
        },

        _getLastPublishedText: function (contentData) {
            return (contentData.publishedBy === null || contentData.publishedBy === undefined) ?
                this.res.notpublishedbefore :
                this._getTemplatedText(this.res.publishedtime, contentData.publishedBy, contentData.lastPublished, true);
        },

        _setAdditionalInfo: function (contentData) {
            // REMARK: Make it possible to do this in a plugin

            var hasInUseNotificationWarning = this.inUseNotificationManager.hasInUseNotificationWarning(contentData.inUseNotifications),
                originallyEditable = this._isOriginallyEditable(),
                visible = hasInUseNotificationWarning && originallyEditable;

            this.set("additionalInfoSectionVisible", visible);

            if (visible) {
                var userList = this.inUseNotificationManager.getOtherUsersInUseNotifications(contentData.inUseNotifications);
                this.set("additionalInfoText", this._getTemplatedText(this.res.inusewarning, userList.join(",")));
            }
        },

        _isOriginallyEditable: function () {
            // Temporarily ignore inuse notification warning to check original editable status
            var ignoreFlag = this.inUseNotificationManager.ignoreOthersNotifications;
            this.inUseNotificationManager.ignoreOthersNotifications = true;

            var originallyEditable = this.dataModel.canChangeContent();

            this.inUseNotificationManager.ignoreOthersNotifications = ignoreFlag;

            return originallyEditable;
        },

        _getFriendlyUsername: function (name, capitalizeUsername) {
            // summary:
            //      Get friendly username: if the username to be displayed is the same
            //      as the current username, this will returns "you"
            // name:
            //      the username to be displayed
            // capitalizeUsername:
            //      If the first character should always be displayed with upper case.
            // tags:
            //      private

            return username.toUserFriendlyHtml(name, null, capitalizeUsername);
        },

        _getTemplatedText: function (template, username, datetime, capitalizeUsername) {
            // summary:
            //      Return text represent last update time
            // tags:
            //      private

            var date = new Date(datetime);

            return lang.replace(template, {
                username: this._getFriendlyUsername(username, capitalizeUsername),
                time: epiDate.toUserFriendlyHtml(date),
                timepassed: epiDate.timePassed(date)
            });
        }
    });
});
