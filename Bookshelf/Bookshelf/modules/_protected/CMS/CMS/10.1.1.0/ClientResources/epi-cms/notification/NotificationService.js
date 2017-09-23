//>>built
define("epi-cms/notification/NotificationService",["dojo/_base/declare","dojo/when","dojo/Deferred","dojo/Stateful","dojo/Evented","dijit/Destroyable","epi/shell/xhr/errorHandler","epi/dependency"],function(_1,_2,_3,_4,_5,_6,_7,_8){return _1([_4,_5,_6],{notificationStore:null,postscript:function(){this.inherited(arguments);this.notificationStore=this.notificationStore||_8.resolve("epi.storeregistry").get("epi.cms.notification");this.own(this.notificationStore.on("add",this._onNotificationUpdated.bind(this)),this.notificationStore.on("update",this._onNotificationUpdated.bind(this)));},_onNotificationUpdated:function(_9){this.emit("notification-updated",_9.target);},getUnreadNotificationCount:function(){return _7.wrapXhr(this.notificationStore.executeMethod("GetUnreadCount"));},markAsRead:function(_a){if(!_a){return new _3().reject();}return _7.wrapXhr(this.notificationStore.executeMethod("MarkAsRead",_a)).then(this.notificationStore.refresh.bind(this.notificationStore,_a));},markAllAsRead:function(){return _7.wrapXhr(this.notificationStore.executeMethod("MarkAllAsRead"));}});});