//>>built
require({cache:{"url:epi-cms/project/templates/Activity.html":"<div class=\"epi-event epi-activity\">\n    <div class=\"epi-event__title-wrapper\">\n        <span class=\"dijitInline\" data-dojo-attach-point=\"iconNode\"></span>\n        <span class=\"epi-event__title\" data-dojo-attach-point=\"titleNode\"></span>\n    </div>\n    <div class=\"epi-event__status\" data-dojo-attach-point=\"actionNode\">\n        <span class=\"dijitInline epi-event__status__icon\">\n            <span data-dojo-attach-point=\"actionIconNode\"></span>\n        </span><span class=\"epi-event__status__message\" data-dojo-attach-point=\"actionTextNode\"></span>\n    </div><div data-dojo-attach-point=\"messageNode\"></div\n    ><div class=\"epi-activity__comments\" data-dojo-attach-point=\"containerNode\"></div>\n    <div data-dojo-type=\"epi-cms/project/ActivityCommentForm\" data-dojo-attach-point=\"commentForm\"></div>\n</div>\n"}});define("epi-cms/project/Activity",["dojo/_base/declare","dojo/_base/lang","dojo/dom-class","epi/datetime","epi/shell/TypeDescriptorManager","epi/username","epi-cms/ApplicationSettings","./ActivityComment","./viewmodels/ActivityViewModel","./viewmodels/ActivityCommentViewModel","./viewmodels/MessageActivityViewModel","dijit/layout/_LayoutWidget","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","epi/shell/widget/_ModelBindingMixin","dojo/text!./templates/Activity.html","epi/i18n!epi/cms/nls/episerver.cms.activities.activity","epi-cms/project/ActivityCommentForm"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11){return _1([_c,_d,_e,_f],{templateString:_10,model:null,modelBindingMap:{upsertActivityComment:["upsertActivityComment"]},buildRendering:function(){this.inherited(arguments);var _12=this.activity;var _13=new _9({id:_12.id,hasMessage:!!_12.message,upsertActivityComment:null});this.commentForm.set("model",_13);this.set("model",_13);var _14=_12.name;var _15=_12.language;if(_15&&_15!==_7.currentContentLanguage){_14=_2.replace("{0} ({1})",[_14,_15]);}this.titleNode.textContent=_14;var _16=_5.getValue(_12.typeIdentifier,"iconClass");_3.add(this.iconNode,_16||"epi-iconProject");var _17=_2.replace("epi-icon{0} epi-icon--{1}",[_12.actionIcon,_12.actionColor]);_3.add(this.actionIconNode,_17);_3.add(this.actionNode,"epi-event--"+_12.actionColor);var _18=_12.delayPublishUntil?_11.delaypublishmessagetemplate:_11.messagetemplate;this.actionTextNode.textContent=_2.replace(_18,{event:_12.actionText,delaypublish:_4.toUserFriendlyString(_12.delayPublishUntil),user:_6.toUserFriendlyString(_12.changedBy),date:_4.toUserFriendlyString(_12.created)});if(_12.message){_3.add(this.domNode,"epi-activity__message");this.own(this._messageForm=new _8({model:new _b(_12)},this.messageNode));}if(_12.comments){_12.comments.forEach(function(_19){this.set("upsertActivityComment",_19);},this);}},startup:function(){this.inherited(arguments);this._messageForm&&this._messageForm.startup();},_getActivityCommentComponent:function(_1a){var _1b=-1;var _1c=null;var _1d=this.getChildren()||[];for(var i=0;i<_1d.length;i++){_1b=i;var _1e=_1d[i];if(_1e.get("model").id===_1a){_1c=_1e;break;}}return {position:(_1c!==null?_1b:-1),activityComment:_1c};},_setUpsertActivityCommentAttr:function(_1f){if(!_1f){return;}var _20=this._getActivityCommentComponent(_1f.id);var _21=_20.activityComment;var _22=(_20.position===-1?this.getChildren().length:_20.position);if(_21){var _23=new Date(_21.get("model").lastUpdated).getTime();var _24=new Date(_1f.lastUpdated).getTime();if(_23===_24){return;}this.removeChild(_21);_21.destroyRecursive();}var _25=new _8({model:new _a(_1f)});this.addChild(_25,_22);}});});