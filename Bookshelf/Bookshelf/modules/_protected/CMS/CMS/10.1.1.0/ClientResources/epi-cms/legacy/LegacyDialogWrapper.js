//>>built
define("epi-cms/legacy/LegacyDialogWrapper",["dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/aspect","dojo/on","dojo/topic","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/has","dojo/query","dojo/string","dojo/when","dijit/_Contained","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/a11y","dijit/focus","dijit/layout/_LayoutWidget","epi/Url","epi/shell/widget/_ActionProviderWidget","epi-cms/legacy/_LegacyDialogObject","epi-cms/legacy/LegacyDialogPopup","epi/i18n!epi/cms/nls/episerver.shared.action"],function(_1,_2,_3,_4,on,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13,_14,Url,_15,_16,_17,_18){return _2([_14,_10,_11,_15,_f],{_currentUrl:null,dialogArguments:null,callbackArguments:null,features:null,autoFit:false,showCloseButton:false,_isIframeInitialLoad:true,_iframeFocusRegistration:null,_scrollbarWidth:null,_iframeHandles:null,templateString:"        <div style=\"position: relative;\" tabindex=\"0\">            <iframe data-dojo-attach-point=\"containerIframe\" tabindex=\"-1\" frameborder=\"0\" style=\"border: none; position: absolute, top:0, left: 0;\" src=\"about:blank\" ></iframe>        </div>",_mappedButtons:null,postMixInProperties:function(){this.inherited(arguments);this._isIframeInitialLoad=true;this._iframeHandles=[];this.features=_3.mixin({width:320,height:240},this.features);},postCreate:function(){this.inherited(arguments);this._legacyDialog=this._createLegacyDialogObject(_3.hitch(this,function(){this.onCallback.apply(this,arguments);}),this.callbackArguments,this.dialogArguments,this.opener||window);this._resetIframeContainerSize();this.own(_5.subscribe("/IsInLegacyWrapper/NeedToBeCloseOnLoad",_3.hitch(this,function(_19){this.onCancel();})));},startup:function(){this.inherited(arguments);if(this.containerIframe.attachEvent){this.containerIframe.attachEvent("onload",_3.hitch(this,this._onIframeLoad));}else{this.connect(this.containerIframe,"onload",_3.hitch(this,this._onIframeLoad));}},resize:function(){this.inherited(arguments);if(this._started){this._setIframeSizeFromDomNode();}},_setUrlAttr:function(_1a){var url=_1a||"about:blank";this._currentUrl=url;_6.set(this.containerIframe,"src",url);},onCallback:function(_1b){},onLoad:function(){},onCancel:function(){},onMapDialogButton:function(_1c){return true;},onBeforePerformAction:function(_1d){},getLegacyDialog:function(){return this._legacyDialog;},_focusIframeContent:function(){var _1e=this.containerIframe.contentWindow,doc=_1e&&_1e.document,_1f=(doc&&_12.getFirstInTabbingOrder(doc))||this.containerIframe;_13.focus(_1f);},_onIframeLoad:function(){if(!_b("ie")){this._iframeFocusRegistration=_13.registerIframe(this.containerIframe);}this._focusIframeContent();this._overrideLegacyDialogUtilities();var _20=this.containerIframe.contentWindow;this._iframeHandles.push(on(_20,"unload",_3.hitch(this,this._removeIframeHandles)));if(_20.EPi&&_20.EPi.ToolButton){this._iframeHandles.push(_4.after(_20.EPi.ToolButton,"SetEnabled",_3.hitch(this,this._toolButtonChanged),true));}this._iframeHandles.push(_4.after(this._legacyDialog,"ButtonChanged",_3.hitch(this,this._toolButtonChanged),true));this._mapDialogButtons();this._setTitle();var _21=_c(".epi-contentContainer",this.containerIframe.contentWindow.document)[0];if(_21){_7.add(_21,"epi-legacyDialog");}if(this.autoFit){this._calculateAndSetContentSize();}this.onResize();this.onResize();if(this.onLoad){this.onLoad.apply(this,arguments);}this._isIframeInitialLoad=false;},_removeIframeHandles:function(){_1.forEach(this._iframeHandles,function(_22){_22.remove();});this._iframeHandles=[];this._mappedButtons=null;},_setTitle:function(){if(this.dialogTitle){this.title=this.dialogTitle;return;}var _23=_c("title",this.containerIframe.contentWindow.document)[0];if(_23){this.title=_d.trim(_23.innerHTML);}},_getScrollbarWidth:function(){if(this._scrollbarWidth===null){var d=_8.create("div",{style:"position:absolute; top:-2000; left:-2000; width:100px; height:100px; overflow:scroll"},document.body);this._scrollbarWidth=d.offsetWidth-d.clientWidth;_8.destroy(d);}return this._scrollbarWidth;},_boxToStyle:function(_24){return {width:_24.w+"px",height:_24.h+"px"};},_setIframeSizeFromDomNode:function(){_a.set(this.containerIframe,this._boxToStyle(_9.getContentBox(this.domNode)));},_setContentSize:function(_25){_a.set(this.domNode,this._boxToStyle(_25));this._setIframeSizeFromDomNode();},_calculateAndSetContentSize:function(_26){function _27(doc,dir){if(doc&&doc.body&&doc.documentElement){return Math.max(doc.documentElement["client"+dir],doc.documentElement["scroll"+dir],doc.documentElement["offset"+dir],doc.body["scroll"+dir],doc.body["offset"+dir]);}return 0;};var _28=null;try{_28=this.containerIframe.contentWindow.document;}catch(e){return;}var _29=(_28.documentElement.scrollHeight-_28.documentElement.clientHeight)>0,_2a=_29&&this.autoFit?this._getScrollbarWidth():0,_2b={w:_27(_28,"Width")+_2a,h:_27(_28,"Height")};this._setContentSize(_2b);},_resetIframeContainerSize:function(){this._setContentSize({w:this.features.width,h:this.features.height});},_showNode:function(_2c,_2d){if(!_2c){return;}_a.set(_2c,"display",_2d?"":"none");},_toolButtonChanged:function(_2e,_2f){if(typeof _2e==="string"){var _30=_3.getObject("containerIframe.contentWindow.EPi",false,this);_2e=_30&&_30._GetDomObject&&_30._GetDomObject(_2e);}if(_2e){if(this.hasAction(_2e.id)){this.setActionProperty(_2e.id,"disabled",_2e.disabled);this.setActionProperty(_2e.id,"visible",_2e.style.display!=="none");this.setActionProperty(_2e.id,"label",_2e.value||_2e.innerHTML);}var _31=this._mappedButtons[_2e.id];if(_31){this._showNode(_31.containerNode,false);}}},_mapDialogButtons:function(){var _32=_c(this.legacyButtonQuery||"[data-epi-dialog-button]",this.containerIframe.contentWindow.document);this.removeActions(this.getActions());this._mappedButtons={};_1.forEach(_32,function(_33){var _34=_6.get(_33,"data-epi-dialog-button"),_35=null;switch(_34){case "functioner":return;case "container":_35=_c("[data-epi-dialog-button=\"functioner\"]",_33)[0];break;default:if(_33.tagName==="INPUT"){_35=_33;if(_7.contains(_35.parentNode,"epi-cmsButton")){_33=_35.parentNode;}}else{_35=_c("INPUT",_33)[0];}break;}this._mappedButtons[_35.id]={containerNode:_33,functionNode:_35};this._showNode(_33,false);_e(this.onMapDialogButton(_35),_3.hitch(this,function(_36){if(_36){var _37=_35.tagName==="INPUT"?_35.value:_35.innerHTML,_38=_35.tagName==="INPUT"?_6.get(_35,"title"):_35.innerHTML,_39={name:_35.id,label:_37,disabled:_35.disabled,title:_38,action:_3.hitch(this,function(){this.onBeforePerformAction(_39,_35);_35.click();})};this.addActions(_39);}}));},this);if(this.showCloseButton){this.addActions({name:"close",label:_18.close,action:_3.hitch(this,this.onCancel)});}},_overrideLegacyDialogUtilities:function(){var _3a=this.containerIframe.contentWindow;if(!_3a.EPi){_3a.EPi={};}_3a.EPi.CreateDialog=_3.hitch(this,this._createLegacyDialogFnc);_3a.EPi.GetDialog=_3.hitch(this,this._getLegacyDialogFnc);},_getLegacyDialogFnc:function(win){if(win){return win.EPi.GetDialog();}return this._legacyDialog;},_createLegacyDialogFnc:function(url,_3b,_3c,_3d,_3e,_3f){var _40=new _17({url:url,dialogArguments:_3d,callbackArguments:_3c,features:_3e,opener:_3f});_40.on("Callback",_3.hitch(this,function(){if(_3b){_3b.apply(this,arguments);}}));_40.show();return _40.legacyDialogObject;},_createLegacyDialogObject:function(_41,_42,_43,_44){var obj=new _16({callbackMethod:_41,callbackArguments:_42,dialogArguments:_43,_opener:_44?_44:window.top});try{this.containerIframe.contentWindow.opener=_44;obj._dialog=this.containerIframe.contentWindow;}catch(e){obj._dialog=null;}return obj;},_reloadUrl:function(_45){this._isIframeInitialLoad=_45;if(this._isIframeInitialLoad){this._resetIframeContainerSize();}var url=new Url(this._currentUrl);_3.mixin(url.query,{"epi.preventCache":new Date().valueOf()});this.set("url",url.toString());},cleanup:function(){var _46=this.containerIframe.contentWindow;_46.EPi.CreateDialog=null;_46.EPi.GetDialog=null;if(this._legacyDialog&&!this._legacyDialog.IsCleaned()){this._legacyDialog.Cleanup();}},destroy:function(){this.cleanup();if(this._iframeFocusRegistration){this._iframeFocusRegistration.remove();this._iframeFocusRegistration=null;}this.inherited(arguments);}});});