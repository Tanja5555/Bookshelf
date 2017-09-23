//>>built
define("epi-cms/notification/viewmodels/NotificationListViewModel",["dojo/_base/declare","dojo/Evented","dojo/Stateful","dojo/topic","dojo/when","dijit/Destroyable","epi/dependency","../command/MarkNotificationAsRead","../command/MarkAllNotificationsAsRead"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){return _1([_3,_2,_6],{store:null,service:null,query:null,queryOptions:null,commands:null,selectedNotification:null,postscript:function(){this.inherited(arguments);this.queryOptions=this.queryOptions||{sort:[{attribute:"posted",descending:true}]};this.store=this.store||_7.resolve("epi.storeregistry").get("epi.cms.notification");this.service=this.service||_7.resolve("epi.cms.NotificationService");this.query=this.query||{};this._createCommands();},initialize:function(){return _5(null);},readSelectedNotification:function(){this.markSelectedNotificationAsRead();this.gotoSelectedNotificationOrigin();},getCommands:function(){return this.commands;},gotoSelectedNotificationOrigin:function(){if(!this.selectedNotification||!this.selectedNotification.link){return;}var _a=this.selectedNotification.link;_4.publish("/epi/shell/context/request",{uri:_a},{sender:this});},markSelectedNotificationAsRead:function(){if(!this.selectedNotification){return;}this.service.markAsRead(this.selectedNotification.id).then(this.set.bind(this,"selectedNotification"));},markAllAsRead:function(){this.service.markAllAsRead().then(this.emit.bind(this,"notification-allread",{}));},_createCommands:function(){var _b=[new _8({model:this,order:10}),new _9({model:this})];this.own.apply(this,_b);this.set({commands:_b});}});});