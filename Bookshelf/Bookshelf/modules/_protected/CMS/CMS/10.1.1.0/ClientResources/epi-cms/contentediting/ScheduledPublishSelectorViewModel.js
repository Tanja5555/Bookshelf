//>>built
define("epi-cms/contentediting/ScheduledPublishSelectorViewModel",["dojo/_base/declare","dojo/Stateful","epi/i18n!epi/cms/nls/episerver.cms.widget.scheduledpublishselector"],function(_1,_2,_3){return _1([_2],{breadcrumbModel:null,title:"",dateLabel:"",dateValue:null,scheduleButtonEnabled:false,constructor:function(){var _4=new Date();_4.setDate(_4.getDate()+1);_4.setHours(12,0,0,0);this.set("dateValue",_4);},_isPublishedSetter:function(_5){this.set("dateLabel",_5?_3.publishchangeson:_3.publishon);},_contentDataSetter:function(_6){this.set("title",_6.name);this.set("isPublished",!_6.isPendingPublish);this.set("breadcrumbModel",_6.contentLink);var _7=new Date(_6.properties.iversionable_startpublish);if(!isNaN(_7)&&_7>new Date()){this.set("dateValue",_7);}},_dateValueSetter:function(_8){this.dateValue=_8;this.set("scheduleButtonEnabled",!!(_8&&_8>new Date()));}});});