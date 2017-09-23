//>>built
require({cache:{"url:epi-cms/contentediting/editors/templates/TinyMCEInlineEditor.html":"<div id=\"widget_${id}\" style=\"position: relative; overflow: visible;\">\n    <div data-dojo-attach-point=\"stateNode, tooltipNode\">\n        <textarea data-dojo-attach-point=\"editorFrame\" id=\"${id}_editorFrame\" style=\"border: none; visibility: hidden; position: absolute; top:0; left:0; bottom:0; right:0;\"></textarea>\n    </div>\n    <div data-dojo-attach-point=\"dndOverlay\" style=\"background: rgba(0, 0, 0, 0.01); position: absolute; left: 0; top: 0; right: 0; bottom: 0; display: none\"></div>\n</div>\n"}});define("epi-cms/contentediting/editors/TinyMCEInlineEditor",["dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/dom","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/aspect","dojo/on","dojo/sniff","epi/string","epi-cms/contentediting/_HasFloatingComponent","epi-cms/contentediting/editors/TinyMCEEditor","dojo/text!./templates/TinyMCEInlineEditor.html"],function(_1,_2,_3,_4,_5,_6,_7,_8,on,_9,_a,_b,_c,_d){return _2([_b,_c],{baseClass:"epiTinyMCEInlineEditor",autoResizable:true,templateString:_d,inlineSettings:null,supportCustomDnd:true,_lastRng:null,_maxCheckRenderedTime:10,_editorIframe:null,onEditorBlur:function(){this._stopEditing();},onEditorResizing:function(_e){},onEditorResized:function(_f){},isEditing:function(){return this.domNode&&_7.get(this.domNode,"display").toLowerCase()!=="none";},startup:function(){this._checkingTime=0;if(this._started){return;}this.inherited(arguments);if(!this.ready){return;}this.own(this.watch("state",_3.hitch(this,function(_10,_11,_12){on.emit(this.domNode,"editorstatechanged",_12);})));},destroy:function(){this._clearLocalDefers();this._externalToolbar=this._toolbarSizeBox=this._toolbarRelativeContainer=this._toolbarRefContainer=null;this._latestButtonIds=this._editorIframe=this._toolbarFinishRender=null;this._lastRng=null;this.inherited(arguments);},focus:function(){this.inherited(arguments);var _13=this.getEditor();if(!_13){return;}if(!_9("trident")){_13.selection.setRng(this._lastRng||_13.selection.getRng());}this.resizeEditor();},resizeEditor:function(){if(_7.get(this.containerNode,"display")==="none"){this.onEditorResized();return;}var _14=this.getEditor(),_15={height:"auto"},_16=this._getEditorIframe();_7.set(_16,_15);_15.height=_14.getBody().parentNode.scrollHeight+"px";this.onEditorResizing({style:_15});_7.set(_16,_15);this.onEditorResized(_3.hitch(this,this._floatToolbar));this.isResized=true;},tryToStopEditing:function(){if(_9("trident")){this._refocus();}},_onBlur:function(){},_updateTinySettings:function(){this.inherited(arguments);this.settings.width=this.settings.height="100%";this.settings=_3.mixin(this.settings,this.inlineSettings);},_setupEditorEventHandling:function(_17,_18){this.inherited(arguments);this._disableSetTopStyle();this._appendEditorResizeHandler(_18);this._appendEditorFloatToolbarHandler(_18);(_9("ie")||_9("trident"))&&_18.onNodeChange.add(_3.hitch(this,function(_19){this._lastRng=_19.selection.getRng();}));},_clearLocalDefers:function(){this._deferToolbarFullSize&&this._deferToolbarFullSize.remove();this._deferOnKeyUp&&this._deferOnKeyUp.remove();},_appendEditorResizeHandler:function(_1a){var _1b=_3.hitch(this,this.resizeEditor);_1a.onChange.add(_1b);_1a.onSetContent.add(_1b);_1a.onPaste.add(_1b);_1a.onPostRender.add(_1b);_1a.onKeyUp.add(_3.hitch(this,function(){this._clearLocalDefers();this._deferOnKeyUp=this.defer(_1b,10);}));_1a.onExecCommand.add(_3.hitch(this,function(ed,cmd){if(cmd==="mceFullScreen"&&this._isFullScreen(tinyMCE.activeEditor)){_5.remove(tinyMCE.activeEditor.getBody(),this.settings.body_class);}}));},_appendEditorFloatToolbarHandler:function(_1c){_1c.onInit.add(_3.hitch(this,this._showEditorToolbar));_1c.onActivate.add(_3.hitch(this,this._floatToolbar));_1c.onMouseUp.add(_3.hitch(this,this._floatToolbar));},_showEditorToolbar:function(_1d){if(!_1d){return;}this.focus();_1d.dom.show(this._getExternalToolbar());this._floatToolbar();},_disableSetTopStyle:function(){this.own(_8.before(this.getEditorDOM(),"setStyle",_3.hitch(this,function(n,na,v){if(n===this._getExternalToolbar()&&na==="top"){return [];}return;})));},_floatToolbar:function(){this._clearLocalDefers();if(!this._getExternalToolbar()){return;}if(!this._isToolbarRendered()){this._deferToolbarFullSize=this.defer(this._floatToolbar,100);return;}this.onComponentFloat(this._getComponentFloatInfo());},_getComponentFloatInfo:function(){return {componentInfo:{component:this._getExternalToolbar(),componentSizeBox:_3.hitch(this,function(){return this._toolbarSizeBox||(this._toolbarSizeBox=_4.byId(this.editorFrame.id+"_tblext"));})(),relativeContainer:_3.hitch(this,function(){return this._toolbarRelativeContainer||(this._toolbarRelativeContainer=this._getExternalToolbar().parentNode);})(),refContainer:_3.hitch(this,function(){return this._toolbarRefContainer||(this._toolbarRefContainer=_4.byId(this.editorFrame.id+"_parent"));})()},floatingInfo:{refreshPosition:false}};},_isToolbarRendered:function(){if(this._checkingTime>this._maxCheckRenderedTime){return true;}this._checkingTime++;var _1e=null,_1f=0;return this._toolbarFinishRender||(this._toolbarFinishRender=this._getToolbarLatestButtonIds().every(function(_20){_1e=_4.byId(this.editorFrame.id+"_"+_20);_1f=_1e&&_6.position(_1e).w;return _1f!==0;},this));},_getToolbarLatestButtonIds:function(){if(this._latestButtonIds){return this._latestButtonIds;}this._latestButtonIds=[];var _21=null;for(var _22 in this.settings){if(_22.toLowerCase().indexOf("theme_advanced_button")!==-1){_21=this.settings[_22].split(",").pop();if(!_a.isNullOrEmpty(_21)){this._latestButtonIds.push(_21);}}}return this._latestButtonIds;},_getExternalToolbar:function(){return this._externalToolbar||(this._externalToolbar=_4.byId(this.editorFrame.id+"_external"));},_getEditorIframe:function(){return this._editorIframe||(this._editorIframe=_4.byId(this.editorFrame.id+"_ifr"));}});});