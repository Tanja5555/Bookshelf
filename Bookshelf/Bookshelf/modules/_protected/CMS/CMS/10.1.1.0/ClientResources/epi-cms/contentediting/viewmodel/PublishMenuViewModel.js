//>>built
define("epi-cms/contentediting/viewmodel/PublishMenuViewModel",["dojo/_base/declare","dojo/_base/lang","dojo/when","dojo/Deferred","dijit/Destroyable","dojox/html/entities","epi","epi/datetime","epi/dependency","epi/username","epi-cms/contentediting/ContentActionSupport","epi-cms/contentediting/viewmodel/_ContentViewModelObserver","epi/shell/command/_CommandConsumerMixin","epi/shell/command/_GlobalCommandProviderMixin","epi/i18n!epi/cms/nls/episerver.cms.contentediting.editactionpanel.publishactionmenu"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f){return _1([_c,_d,_e,_5],{commandKey:"epi.cms.publishmenu",contentActionSupport:null,inUseNotificationManager:null,_currentUser:null,commands:null,mainButtonCommand:null,lastExecutedCommand:null,mainButtonSectionVisible:null,lastChangeStatus:null,topInfoSectionVisible:null,publishInfoSectionVisible:null,lastPublishedText:null,lastPublishedViewLinkVisible:null,lastPublishedViewLinkHref:null,additionalInfoSectionVisible:null,additionalInfoText:null,isOpen:null,typeIdentifier:null,postscript:function(){this.inherited(arguments);this.res=this.res||_f;this.projectService=this.projectService||_9.resolve("epi.cms.ProjectService");this.approvalService=this.approvalService||_9.resolve("epi.cms.ApprovalService");this.contentActionSupport=this.contentActionSupport||_b;this.initializeCommandProviders();},_setDataModelAttr:function(_10){this.updateCommandModel(_10);this.inherited(arguments);},_setIsOpenAttr:function(_11){if(_11){var _12=this.dataModel.contentData;this._setLastChangeStatus(_12);if(_12.status===_b.versionStatus.AwaitingApproval){this._setApprovalInfo(_12);}}},onDataModelChange:function(_13,_14,_15){var _16=this.dataModel.contentData,_17=(_16.publishedBy!==null&&_16.publishedBy!==undefined);this._updateCommands();this.set("typeIdentifier",_16.typeIdentifier);this._setAdditionalInfo(_16);if(_16.status===_b.versionStatus.AwaitingApproval){this._setApprovalInfo(_16);return;}this._setLastChangeStatus(this.dataModel.contentData);this.set("topInfoSectionVisible",this._getTopInfoSectionVisible(_16));this.set("publishInfoSectionVisible",this._getPublishInfoSectionVisible(_16));this.set("lastPublishedTitle",this._getLastPublishedTitle(_16));this.set("lastPublishedTitleVisible",_17);this.set("lastPublishedText",this._getLastPublishedText(_16));this.set("lastPublishedViewLinkVisible",this._getLastPublishedViewLinkVisible(_16,_17));this.set("lastPublishedViewLinkHref",_16.publicUrl);},onCommandsChanged:function(_18,_19,_1a){_1a.forEach(function(_1b){if(_1b.options&&_1b.options.isMain){this.own(_1b.watch("canExecute",function(){this._calculateMainButtonCommand();}.bind(this)));}},this);},_setApprovalInfo:function(_1c){return this.approvalService.getApproval(_1c.contentLink).then(_2.hitch(this,function(_1d){if(_1d){var _1e=_2.replace(_f.approvalinfo.timepassed,{timepassed:_8.timePassed(new Date(_1d.startDate))});var _1f=_2.replace(_f.approvalinfo.stepinfo,{activeStepIndex:_1d.activeStepIndex+1,totalsteps:_1d.totalSteps});var _20=_1e+" <br /> "+_1f;this.set("topInfoSectionVisible",true);this.set("lastChangeStatus",_20);var _21=_2.replace(_f.approvalinfo.requestedby,{username:this._getFriendlyUsername(_1d.startedBy,true),time:_8.toUserFriendlyHtml(_1d.startDate)});this.set("publishInfoSectionVisible",true);this.set("lastPublishedText",_21);this.set("lastPublishedTitleVisible",false);this.set("lastPublishedViewLinkVisible",false);return _1d;}return null;}));},_lastChangeStatusSetter:function(_22){this.lastChangeStatus=_22;return _3(_22);},_updateCommands:function(){this._calculateMainButtonCommand();this.set("commands",this.getCommands());},_calculateMainButtonCommand:function(){var _23=this.getCommands(),_24=null;_23.forEach(function(_25){if(_25.canExecute&&_25.options&&_25.options.isMain&&_25.options.priority&&(!_24||_24.options.priority<_25.options.priority)){_24=_25;}});this.set("mainButtonCommand",_24);this.set("mainButtonSectionVisible",_24!==null);},_getTopInfoSectionVisible:function(_26){return this.mainButtonCommand||!((_26.status===_b.versionStatus.Published||_26.status===_b.versionStatus.Expired)&&!_26.isCommonDraft);},_getPublishInfoSectionVisible:function(_27){var _28=this.inUseNotificationManager.hasInUseNotificationWarning(_27.inUseNotifications),_29=this._isOriginallyEditable();return !(_28&&_29);},_getLastPublishedViewLinkVisible:function(_2a,_2b){return _2b&&!!_2a.publicUrl;},_setLastChangeStatus:function(_2c){if(_2c.status===_b.versionStatus.AwaitingApproval){return;}var _2d,_2e,_2f=this;_2e=_2d=this._getTemplatedText(this.res.lastchangestatus,_2c.changedBy,_2c.saved);if(this.lastExecutedCommand&&this.lastExecutedCommand.options&&this.lastExecutedCommand.options.successStatus){var _30=this.lastExecutedCommand.options.successStatus;this.lastExecutedCommand=this.mainButtonCommand;_2e=_30;}if(_2c.missingLanguageBranch&&_2c.missingLanguageBranch.isTranslationNeeded){_2e=_2.replace(this.res.nottranslated,{languageName:_7.resources.language[_2c.missingLanguageBranch.languageId],languageId:_2c.missingLanguageBranch.languageId});}if(_2c.status===_b.versionStatus.Published||_2c.status===_b.versionStatus.Expired){_2e=this.res.notmodifiedsincelastpublish;}if(_2c.status===_b.versionStatus.PreviouslyPublished){_2e=this._getTemplatedText(this.res.previouslypublished,_2c.versionCreatedBy,_2c.versionCreatedTime);}if(_2c.status===_b.versionStatus.Rejected){_2e=this._getTemplatedText(this.res.rejectedapproval,_2c.versionCreatedBy,_2c.versionCreatedTime);}if(_2c.status===_b.versionStatus.DelayedPublish){_2e=this.projectService.getProjectsForContent(_2c.contentLink).then(function(_31){_31=_31.filter(function(_32){return _32.status==="delayedpublished";});if(_31.length){return _2.replace(_2f.res.projectdelayedpublish,{date:_8.toUserFriendlyHtml(_2c.properties.iversionable_startpublish),project:_6.encode(_31[0].name)});}return _2d;});}_3(_2e,_2.hitch(this,"set","lastChangeStatus"));},_getLastPublishedTitle:function(_33){return _33.status===_b.versionStatus.PreviouslyPublished?this.res.currentlypublished:this.res.lastpublishedby;},_getLastPublishedText:function(_34){return (_34.publishedBy===null||_34.publishedBy===undefined)?this.res.notpublishedbefore:this._getTemplatedText(this.res.publishedtime,_34.publishedBy,_34.lastPublished,true);},_setAdditionalInfo:function(_35){var _36=this.inUseNotificationManager.hasInUseNotificationWarning(_35.inUseNotifications),_37=this._isOriginallyEditable(),_38=_36&&_37;this.set("additionalInfoSectionVisible",_38);if(_38){var _39=this.inUseNotificationManager.getOtherUsersInUseNotifications(_35.inUseNotifications);this.set("additionalInfoText",this._getTemplatedText(this.res.inusewarning,_39.join(",")));}},_isOriginallyEditable:function(){var _3a=this.inUseNotificationManager.ignoreOthersNotifications;this.inUseNotificationManager.ignoreOthersNotifications=true;var _3b=this.dataModel.canChangeContent();this.inUseNotificationManager.ignoreOthersNotifications=_3a;return _3b;},_getFriendlyUsername:function(_3c,_3d){return _a.toUserFriendlyHtml(_3c,null,_3d);},_getTemplatedText:function(_3e,_3f,_40,_41){var _42=new Date(_40);return _2.replace(_3e,{username:this._getFriendlyUsername(_3f,_41),time:_8.toUserFriendlyHtml(_42),timepassed:_8.timePassed(_42)});}});});