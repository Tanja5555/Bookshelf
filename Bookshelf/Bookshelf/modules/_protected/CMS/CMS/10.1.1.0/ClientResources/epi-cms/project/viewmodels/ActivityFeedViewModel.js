//>>built
define("epi-cms/project/viewmodels/ActivityFeedViewModel",["dojo/_base/declare","./_ProjectFeedViewModel"],function(_1,_2){return _1([_2],{_contentLink:null,postscript:function(){this.inherited(arguments);this.set("noDataMessage",this.noQueryMessage);},_selectedProjectItemsSetter:function(_3){_3=_3||[];var _4=_3.filter(function(_5){return !!_5.contentLink;});var _6=_3.length===1&&_4.length===1;this.set("isSingleItemSelected",_6);var _7=_6?_4[0].name:"";this.set("placeholderName",_7);this._contentLink=_6?_4[0].contentLink:null;this.set("noDataMessage",_3.length?this.noAccessMessage:this.noQueryMessage);this.set("store",_4.length?this.activitiesStore:null);var _8={contentReferences:_4.map(function(_9){return _9.contentLink;}),projectId:this.selectedProjectId};this.set("query",_4.length?_8:null);}});});