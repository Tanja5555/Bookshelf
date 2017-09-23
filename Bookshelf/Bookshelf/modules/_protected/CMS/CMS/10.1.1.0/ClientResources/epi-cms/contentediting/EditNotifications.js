//>>built
define("epi-cms/contentediting/EditNotifications",["dojo/_base/declare","dojo/_base/lang","dojo/Evented","epi/shell/DestroyableByKey","epi-cms/plugin-area/edit-notifications"],function(_1,_2,_3,_4,_5){return _1([_4,_3],{_notificationChangedKey:"_EditingNotificationHandles",_notificationsKey:"_notifications",_notifications:null,postscript:function(){this.inherited(arguments);this.own(_5.on("added, removed",this._watchNotifications.bind(this)));this._watchNotifications();},update:function(_6,_7){this._notifications.forEach(function(_8){_8.set("value",{contentData:_6,context:_7});});},suspend:function(){this._notifications.forEach(function(_9){_9.set("isSuspended",true);});},wakeUp:function(){this._notifications.forEach(function(_a){_a.set("isSuspended",false);});},_watchNotifications:function(){this.destroyByKey(this._notificationsKey);this._notifications=_5.get().map(function(_b){this.ownByKey(this._notificationsKey,_b);return _b;},this);this.destroyByKey(this._notificationChangedKey);this._notifications.forEach(function(_c){this.ownByKey(this._notificationChangedKey,_c.watch("notification",function(_d,_e,_f){this.emit("changed",{notification:_c,oldValue:_e,newValue:_f});}.bind(this)));},this);}});});