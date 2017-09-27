//>>built
define("epi-cms/contentediting/viewmodel/EditActionPanelViewModel",["dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/Stateful","dojo/string","dojox/html/entities","epi-cms/contentediting/ContentActionSupport","epi-cms/contentediting/viewmodel/_ContentViewModelObserver","epi-cms/contentediting/viewmodel/PublishMenuViewModel","epi/datetime","epi/dependency","epi/i18n!epi/cms/nls/episerver.cms.contentediting.editactionpanel"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c){return _2([_8],{state:null,buttonText:null,statusText:null,statusIcon:null,additionalClass:null,nonEditableIndicator:null,visible:null,publishMenuViewModel:null,inUseNotificationManager:null,canApproveCurrentStep:null,approvalService:null,skipChildModels:false,_virtualStatusEnum:{NotCreated:0,NotPublishedYet:1,NoChangeToPublish:2,ChangesToPublish:3,ReadyToPublish:4,ScheduledPublish:5,Published:6,PreviouslyPublished:7,Expired:8,InUse:9,Deleted:10,AwaitingApproval:11,Rejected:12},_virtualStatusCssState:[],_virtualStatusLocalization:[],_statusIcon:[],_watchers:null,_statusMap:{},postscript:function(){this.res=this.res||_c;this.inherited(arguments);this.inUseNotificationManager=this.inUseNotificationManager||_b.resolve("epi.cms.contentediting.inUseNotificationManager");this.approvalService=this.approvalService||_b.resolve("epi.cms.ApprovalService");if(this._virtualStatusCssState.length===0){for(var _d in this._virtualStatusEnum){this._virtualStatusCssState.push(_d);this._virtualStatusLocalization.push(this.res["status"][_d.toLowerCase()]);}this._statusMap[_7.versionStatus.CheckedOut]=this._virtualStatusEnum.NotPublishedYet;this._statusMap[_7.versionStatus.CheckedIn]=this._virtualStatusEnum.ReadyToPublish;this._statusMap[_7.versionStatus.Rejected]=this._virtualStatusEnum.Rejected;this._statusMap[_7.versionStatus.DelayedPublish]=this._virtualStatusEnum.ScheduledPublish;this._statusMap[_7.versionStatus.Published]=this._virtualStatusEnum.Published;this._statusMap[_7.versionStatus.PreviouslyPublished]=this._virtualStatusEnum.PreviouslyPublished;this._statusMap[_7.versionStatus.Expired]=this._virtualStatusEnum.Expired;this._statusMap[_7.versionStatus.AwaitingApproval]=this._virtualStatusEnum.AwaitingApproval;this._statusIcon[_7.versionStatus.DelayedPublish]="epi-iconClock";this._statusIcon[_7.versionStatus.AwaitingApproval]="epi-icon--inverted epi-iconReview";}if(!this.skipChildModels){this.publishMenuViewModel=new _9({inUseNotificationManager:this.inUseNotificationManager});}},destroy:function(){if(this.publishMenuViewModel){this.publishMenuViewModel.destroy();}this.inherited(arguments);},_setDataModelAttr:function(_e){this.inherited(arguments);if(this.publishMenuViewModel){this.publishMenuViewModel.set("dataModel",_e);}},_onDataModelChange:function(_f){var _10=this._getVirtualStatus(_f);this.set("state",this._virtualStatusCssState[_10]);this.set("additionalClass",_10===this._virtualStatusEnum.ChangesToPublish?"animated8 shake":"");this._setStatusText(_10,_f);this.set("buttonText",this._getButtonText(_10,_f));this.set("statusIcon",this._statusIcon[_f.status]||"");var _11=this.dataModel.canChangeContent(_7.action.Edit);var _12=_f.status===_7.versionStatus.AwaitingApproval;this.set("nonEditableIndicator",!_11&&!_12);this.set("visible",!_f.isWastebasket);},onDataModelChange:function(){var _13=this.dataModel.contentData;if(_13.status===_7.versionStatus.AwaitingApproval){this.approvalService.getApproval(_13.contentLink).then(function(_14){_14&&this.set("canApproveCurrentStep",_14.canApproveCurrentStep);this._onDataModelChange(_13);}.bind(this));}else{this._onDataModelChange(_13);}},_setStatusText:function(_15,_16){if(_16.status===_7.versionStatus.DelayedPublish){this.set("statusText",_5.substitute(this._virtualStatusLocalization[_15],[_a.toUserFriendlyHtml(_16.properties.iversionable_startpublish)]));}else{if(_15===this._virtualStatusEnum.InUse){var _17=this.inUseNotificationManager.getOtherUsersInUseNotifications(_16.inUseNotifications);_17=_17.map(function(_18){return _6.encode(_18);}).join(",");this.set("statusText",_5.substitute(this._virtualStatusLocalization[_15],[_17]));}else{if(_16.status===_7.versionStatus.AwaitingApproval){if(this.canApproveCurrentStep){this.set("statusText",this.res.awaitingyourapproval.label);}else{this.set("statusText",this.res.currentlyinreview.label);}}else{this.set("statusText",this._virtualStatusLocalization[_15]);}}}},_getButtonText:function(_19,_1a){if((_19===this._virtualStatusEnum.NotPublishedYet||_19===this._virtualStatusEnum.ChangesToPublish||_19===this._virtualStatusEnum.ReadyToPublish)&&this.dataModel.canChangeContent(_7.action.Publish)){return this.res.buttonlabel.publish;}else{if(_19===this._virtualStatusEnum.AwaitingApproval&&this.canApproveCurrentStep){return this.res.awaitingyourapproval.button;}else{return this.res.buttonlabel.option;}}},_getVirtualStatus:function(_1b){if(_1b.isDeleted){return this._virtualStatusEnum.Deleted;}var _1c,_1d,_1e;_1c=this.inUseNotificationManager.ignoreOthersNotifications;this.inUseNotificationManager.ignoreOthersNotifications=true;_1d=this.dataModel.canChangeContent();this.inUseNotificationManager.ignoreOthersNotifications=_1c;_1e=this.inUseNotificationManager.hasInUseNotificationWarning(_1b.inUseNotifications);if(_1e&&_1d){return this._virtualStatusEnum.InUse;}if(_1b.isCommonDraft){if(_1b.status===_7.versionStatus.Published){return this._virtualStatusEnum.NoChangeToPublish;}if(_1b.status===_7.versionStatus.CheckedOut){return _1b.isMasterVersion?this._virtualStatusEnum.NotPublishedYet:this._virtualStatusEnum.ChangesToPublish;}}return this._statusMap[_1b.status];}});});