//>>built
define("epi-cms/project/viewmodels/_ProjectViewModel",["dojo/_base/declare","dojo/_base/lang","dojo/aspect","dojo/Deferred","dojo/Evented","dojo/Stateful","dojo/topic","dojo/dom-class","dojo/promise/all","dojo/when","dojo/string","dijit/Destroyable","epi/epi","epi/datetime","epi/dependency","epi/username","epi/shell/_ContextMixin","epi/shell/xhr/errorHandler","../../contentediting/ContentActionSupport","epi/shell/command/withConfirmation","../command/AddProject","../command/PublishProject","../command/EditProjectItem","../command/ReadyForReviewProjectItem","../command/ReadyToPublishProjectItem","../command/RefreshProjectItems","../command/RemoveProject","../command/RemoveProjectItem","../command/RemoveProjectScheduling","../command/RenameProject","../command/SortProjectItems","../command/ScheduleProject","epi/i18n!epi/nls/episerver.cms.components.project","epi/i18n!epi/nls/episerver.shared.action"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13,_14,_15,_16,_17,_18,_19,_1a,_1b,_1c,_1d,_1e,_1f,_20,res,_21){return _1([_6,_c,_5,_11],{commands:null,namedCommands:null,created:"",createdBy:"",profile:null,contentLanguage:"",dndEnabled:false,isActivitiesVisible:false,projectStore:null,projectSortOrder:null,projectItemStore:null,projectItemQuery:null,activitiesStore:null,projectItemSortOrder:null,projectStatus:"",projectName:"",notificationMessage:"",selectedProject:null,selectedProjectItems:null,projectItemCountMessage:"",placeholderState:"noProjects",_sortOrderProfileKey:"epi.project-sort-order",_isActivitiesVisibleProfileKey:"epi.project-is-activities-visible",_messages:null,constructor:function(){this.projectItemSortOrder=[];this.projectSortOrder=[{attribute:"created",descending:true}];this.selectedProjectItems=[];},postscript:function(){this.inherited(arguments);this.projectService=this.projectService||_f.resolve("epi.cms.ProjectService");this.projectStore=this.projectStore||_f.resolve("epi.storeregistry").get("epi.cms.project");this.projectItemStore=this.projectItemStore||_f.resolve("epi.storeregistry").get("epi.cms.project.item");this.activitiesStore=this.activitiesStore||_f.resolve("epi.storeregistry").get("epi.cms.activities");this.profile=this.profile||_f.resolve("epi.shell.Profile");this._messages=this.isProjectModeEnabled()?res.status.message:_2.mixin({},res.status.message,res.status["messagelegacy"]);this._createCommands();this.own(this.projectService.on("project-item-updated",_2.hitch(this,this._updateSelectedItems)),this.projectService.on("project-updated",_2.hitch(this,this._projectUpdated)));},initialize:function(){return _9(_a(this.profile.get(this._sortOrderProfileKey),_2.hitch(this,function(_22){var _23=this._findSortOption("key",_22)||this.namedCommands.sortProjectItems.options[0];this._changeAttrValue("projectItemSortOrder",_23.value);})),_a(this._loadSelectedProject(),_2.hitch(this,function(_24){this._updateSelectedProjectDependencies(_24);this._changeAttrValue("selectedProject",_24);})),_a(this.profile.getContentLanguage(),_2.hitch(this,function(_25){this.set("contentLanguage",_25);})),_a(this.profile.get(this._isActivitiesVisibleProfileKey),_2.hitch(this,function(_26){if(typeof _26==="boolean"){this.set("isActivitiesVisible",_26);}})));},isProjectModeEnabled:function(){return this.projectService.isProjectModeEnabled;},getCommands:function(){return this.commands;},addProject:function(_27){this.projectStore.add(_27).then(_2.hitch(this,function(_28){this.set("selectedProject",_28);})).otherwise(_12.forXhr);},getProject:function(){return this.get("selectedProject");},updateProject:function(_29){this.projectStore.put(_29).then(_2.hitch(this,"set","selectedProject")).otherwise(_12.forXhr);},publishProject:function(_2a,_2b){var _2c=this;return this.projectService.publishProject(_2a,_2b).then(function(_2d){return _2c._updateSelectedProjectAndRefreshContextRequest(_2d).then(function(){return _2d;});});},reactivateProject:function(_2e){var _2f=this;if(isNaN(_2e)){throw new Error("The given project ID is not a number.");}return this.projectService.reactivateProject(_2e).then(function(_30){return _2f._updateSelectedProjectAndRefreshContextRequest(_30).then(function(){return _30;});});},refreshActivities:function(){this.emit("refresh-activities");},refreshProject:function(_31){var _32=this;if(_31===undefined){_31=true;}if(this.selectedProject){return this.projectStore.refresh(this.selectedProject.id).then(function(_33){_32.set("selectedProject",_33);if(_31){_32.emit("refresh");}return _33;},function(ex){_32.set("selectedProject",null);});}if(_31){this.emit("refresh");}},removeProject:function(){var _34=this,_35=this.projectStore;if(!this.selectedProject){return new _4().resolve();}return _35.remove(this.selectedProject.id).then(function(){_34.set("selectedProject",null);});},canAddContent:function(_36){var _37=this.get("selectedProject").id;return this.projectService.canAddContent(_37,_36);},canPublishProject:function(_38){var _39;function _3a(){return Object.keys(_39).some(function(key){if(key.indexOf("nopublishaccess")>-1){if(_39[key]>0){return true;}}});};function _3b(_3c){return _39[_3c]>0;};_38=_38||this.selectedProject;_39=_38&&_38.itemStatusCount;if(this.isProjectModeEnabled()){return !!_38&&_38.itemStatusCount.checkedin>0;}else{return !!_38&&(_38.status==="active"||_38.status==="publishfailed")&&!_3a()&&!_3b("notcreated")&&!_3b("rejected")&&!_3b("checkedout")&&(_3b("checkedin")||_3b("published")||_3b("previouslypublished")||_3b("delayedpublish"));}},addProjectItems:function(_3d,_3e){var _3f=this.get("selectedProject");_3e=_3e||(_3f&&_3f.id);if(!_3e){throw new Error("If no projectId is provided a selectedProject must be set in the context");}return this.projectService.addProjectItems(_3e,_3d);},removeSelectedProjectItems:function(){var _40=this.projectService.removeProjectItems(this.selectedProjectItems);_40.then(_2.hitch(this,function(){this.emit("clear-selection");}));return _40;},markProjectItemsAsReadyForReview:function(){this._setStatusOnProjectItems("markAsReadyForReview");},markProjectItemsAsReadyToPublish:function(){this._setStatusOnProjectItems("markAsReadyToPublish");},_setStatusOnProjectItems:function(_41){if(!this.selectedProjectItems.length){return new _4().resolve();}var _42=this;var _43=this.selectedProjectItems.map(function(_44){return _44.id;});return this.projectService[_41](_43).then(function(){return _a(_42.getCurrentContext());}).then(function(ctx){var _45;_42.selectedProjectItems.some(function(_46){if(_46.contentLink===ctx.id){_45=_46;return true;}});if(_45){_42.requestContextChange(_45.contentLink);}});},requestContextChange:function(_47){var _48=_47.uri?_47:{uri:"epi.cms.contentdata:///"+_47};_7.publish("/epi/shell/context/request",_48,{sender:this});},updateActivityFeed:function(_49){},_projectUpdated:function(_4a){if(this.selectedProject&&this.selectedProject.id===_4a.id){this.set("selectedProject",_4a);}},_updateSelectedItems:function(_4b){var _4c=this.selectedProjectItems.length;for(var i=0;i<_4c;i++){if(this.selectedProjectItems[i].id===_4b.id){this.selectedProjectItems[i]=_4b;this.set("selectedProjectItems",this.selectedProjectItems);this.emit("selected-project-items-updated",this.selectedProjectItems);break;}}},_createCommands:function(){var _4d=_2.mixin(this._createProjectCommands(),this._createProjectItemCommands()),_4e;_4e=Object.keys(_4d).map(function(key){return _4d[key];}).sort(function(a,b){return a.sortOrder-b.sortOrder;});this.own.apply(this,_4e);this.set({commands:_4e,namedCommands:_4d});},_createProjectCommands:function(){return {addProject:new _15({model:this,order:10}),renameProject:new _1e({model:this,order:20}),removeProject:new _1b({model:this,order:30,store:this.projectStore}),publishProject:new _16({model:this,order:40}),scheduleProject:new _20({model:this,order:50}),removeProjectScheduling:_14(new _1d({model:this,order:60}),null,{title:res.command.removeschedulingprojectitem.title,description:res.command.removeschedulingprojectitem.confirmation,confirmActionText:_21.remove,cancelActionText:_21.cancel})};},_createProjectItemCommands:function(){return {readyForReviewProjectItem:new _18({model:this,order:90}),readyToPublishProjectItem:new _19({model:this,order:100}),editProjectItem:new _17({model:this,order:110}),removeProjectItem:_14(new _1c({model:this,order:120}),null,{title:res.command.removeprojectitem.label,description:res.command.removeprojectitem.confirmation,confirmActionText:_21.remove,cancelActionText:_21.cancel}),sortProjectItems:new _1f({model:this,order:130}),refreshProjectItems:new _1a({model:this,order:140})};},_loadSelectedProject:function(){return this.projectService.getCurrentProject();},_persistSelectedProject:function(_4f){this.profile.set(this._selectedProjectProfileKey,_4f&&_4f.id,{location:"server"});},_persistSortOrder:function(_50){var _51=this._findSortOption("value",_50),key=_51&&_51.key||null;this.profile.set(this._sortOrderProfileKey,key,{location:"server"});},_persistIsActivitiesPanelVisible:function(_52){this.profile.set(this._isActivitiesVisibleProfileKey,_52,{location:"server"});},_findSortOption:function(key,_53){var _54=this.namedCommands.sortProjectItems.options,_55=null;_53&&_54.some(function(_56){if(_53===_56[key]){_55=_56;return true;}});return _55;},_updateSelectedProjectDependencies:function(_57){var _58="",_59="",_5a="",_5b=false,_5c="",_5d=null,_5e="",_5f="",_60=this.isProjectModeEnabled();if(_57){_58=_e.toUserFriendlyString(new Date(_57.created));_59=_10.toUserFriendlyString(_57.createdBy,null,true);_5b=(_60&&_57.status!=="publishing")||_57.status==="active"||_57.status==="publishfailed";_5d={projectId:_57.id};_5f=_57.name;if(!this.canPublishProject(_57)||_60){_5e=this._messages[_57.status]||"";if(_57.status==="delayedpublished"&&!_60){_5a=_e.toUserFriendlyString(_57.delayPublishUntil);_5e=_2.replace(_5e,{date:_5a});_5c=_2.replace(res.status.state.delayedpublished,{delayPublishUntil:_5a});}}if(_57.status==="publishfailed"){_5c=this._getProjectFailedMessage(_57);}}this.set({created:_58,createdBy:_59,dndEnabled:_5b,notificationMessage:_5c,projectItemQuery:_5d,projectStatus:_5e,projectName:_5f});},_getProjectFailedMessage:function(_61){var _62=0,_63="",_64=res.notifications.publishfailed;_62=this._getUnpublishedItems(_61.itemStatusCount);if(_62>0){_63=_2.replace(_62>1?_64.notificationtextmultipleitems:_64.notificationtextsingleitem,{failedItemsCount:_62});}return _63;},_getUnpublishedItems:function(_65){var _66=0;Object.keys(_65).forEach(function(key){if(key.indexOf("checkedin")===0){_66+=_65[key];}});return _66;},_isActivitiesVisibleSetter:function(_67){if(_67===this.isActivitiesVisible){return;}this.isActivitiesVisible=_67;this._persistIsActivitiesPanelVisible(_67);},_selectedProjectSetter:function(_68){_68=_2.clone(_68);if(_d.areEqual(this.selectedProject,_68)){return;}if(this.selectedProject&&(!_68||this.selectedProject.id!==_68.id)){this.emit("clear-selection");}this.selectedProject=_68;this._updateSelectedProjectDependencies(_68);},_projectItemSortOrderSetter:function(_69){if(_69&&_69===this.projectItemSortOrder){return;}this.projectItemSortOrder=_69;this._persistSortOrder(_69);},_updateSelectedProjectAndRefreshContextRequest:function(_6a){var _6b=this;_6b.set("selectedProject",_6a);return _a(this.getCurrentContext()).then(function(_6c){_6b.requestContextChange(_6c);return _6c;});},_selectedProjectItemsSetter:function(_6d){this.selectedProjectItems=_6d;this._updateProjectCountMessage(_6d);},_updateProjectCountMessage:function(_6e){var _6f=_6e&&_6e.length>0?_6e.length:null,_70="";function _71(_72,_73){_70=_b.substitute(res.notifications.selecteditems[_73],{count:_72});};if(_6f){if(_6f===1){_71(_6f,"singular");}else{if(_6f>1){_71(_6f,"plural");}}}this.set("projectItemCountMessage",_70);}});});