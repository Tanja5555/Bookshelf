(function(e,t){e.create("tinymce.plugins.epipersonalizedcontent",{_onInitCalled:!1,_pcDragging:!1,_pcInClipboard:!1,init:function(t,n){var i=this;if("undefined"==typeof epiContentBlockUtilities){var o=e.baseURI.toAbsolute("plugins/epipersonalizedcontent/epicontentblockutilities.js");e.ScriptLoader.load(o,function(){this._init(t,n)},this),e.ScriptLoader.loadQueue()}else this._init(t,n);t.addButton("epipersonalizedcontent",{title:"epipersonalizedcontent.epipersonalizedcontent_desc",cmd:"epipersonalizedcontent","class":"mce_epipersonalizedcontent"}),t.onInit.add(function(){i._onInitCalled=!0}),t.onPreInit.addToTop(function(){var n=e.trim(t.getParam("noneditable_noneditable_class","mceNonEditable")),o=e.trim(t.getParam("noneditable_editable_class","mceEditable"));t.parser.addAttributeFilter("class",function(e){for(var t=e.length;t--;)i._convertPCToMceNonEditable(e[t],n,o)})})},_init:function(n){t.extend(this,epiContentBlockUtilities);var i=this;i._personalizedContentHeaderClass=n.getParam("epipersonalizedcontent_headercssclass","epi_pc_h"),i._personalizedContentFooterClass=n.getParam("epipersonalizedcontent_footercssclass","epi_pc_f"),i._personalizedContentClass=n.getParam("epipersonalizedcontent_cssclass","epi_pc"),i._personalizedContentHolderClass=n.getParam("epipersonalizedcontent_holdercssclass","epi_pc_content"),i.ed=n,i._disabled=!1,i._enabledControls=n.getParam("epipersonalizedcontent_enabledcontrols",""),n.addCommand("epipersonalizedcontent",function(){if(!i._validateAndCorrectSelection())return n.windowManager.alert(n.translate("epipersonalizedcontent.invalidselectionwarning")),void 0;var e=i._getParentNode(i._getCommonAncestor(),i._personalizedContentClass),o=function(o){var a,r,s;if(n.windowManager.bookmark&&n.selection.moveToBookmark(n.windowManager.bookmark),o){var l=n.getBody(),d=l&&l.lastChild;n.selection.getNode()===d&&l.appendChild(n.dom.create("p",null,'<br _mce_bogus="1" />')),o.removePersonalization?e&&(s=n.dom.select("."+i._personalizedContentHolderClass,e)[0],a=s.innerHTML,n.dom.remove(e),n.execCommand("mceInsertContent",!1,a)):e?(s=n.dom.select("."+i._personalizedContentHolderClass,e),a=t(s).html(),r=o.replace("[personalizedContentPlaceHolder]",a),n.dom.remove(e),n.execCommand("mceInsertContent",!1,r)):(a=n.selection.getContent(),""===a&&(a='<p><br mce_bogus="1" /></p>'),r=o.replace("[personalizedContentPlaceHolder]",a),n.selection.getStart()===n.selection.getEnd()&&n.dom.remove(n.selection.getNode()),n.execCommand("mceInsertContent",!1,r)),i._onContentChanged()}},a={width:600,height:450},r=EPi.ResolveUrlFromUI("Editor/Dialogs/PersonalizedContent.aspx"),s={allContentGroups:i._getAllContentGroups()};if(e)s.groups=n.dom.getAttrib(e,"data-groups",""),s.contentGroup=n.dom.getAttrib(e,"data-contentgroup","");else if(n.selection.isCollapsed())return;n.windowManager.open({url:r+"?"+t.param(s),width:a.width,height:a.height,onCallback:o})});var o=function(t){var n=e.dom.Event.add(t.dom.doc,"click",function(e){i._handleButtonsClick(e)});i._showButton(t,t.controlManager,!1,!1),t.onRemove.add(function(t){e.dom.Event.remove(t.dom.doc,n)}),t.onNodeChange.add(function(e,t,n,o){setTimeout(function(){var a=!!i._getParentNode(n,i._personalizedContentClass),r=!!i._getParentNode(n,i._personalizedContentHolderClass);a&&!r&&i._updateCommandState(!1),i._showButton(e,t,!o||a,a)},0)}),t.onNodeChange.addToTop(function(e,t,n){var o=!!i._getParentNode(n,i._personalizedContentClass),a=!!i._getParentNode(n,i._personalizedContentHolderClass);(!o||a)&&i._updateCommandState(!0)}),t.dom.bind(t.getBody(),"dragstart",function(){i._pcDragging=i._selectionContainsPC()}),t.dom.bind(t.getBody(),"dragend",function(){i._pcDragging=!1}),t.dom.bind(t.getBody(),"cut",function(){i._pcInClipboard=i._selectionContainsPC()}),t.dom.bind(t.getBody(),"copy",function(){i._pcInClipboard=i._selectionContainsPC()}),t.dom.bind(t.getBody(),"drop",function(e){i._preventNestedPC(e)}),t.dom.bind(t.getBody(),"paste",function(e){i._preventNestedPC(e)})};i._onInitCalled?o(n):n.onInit.add(o)},_preventNestedPC:function(e){var t="drop"===e.type?this._pcDragging:"paste"===e.type?this._pcInClipboard:!1,n=e.srcElement||e.originalTarget;return n===this.ed.getBody()&&(n=this.ed.selection.isCollapsed()?this.ed.selection.getNode():n),t&&this._getParentNode(n,this._personalizedContentHolderClass)?(this.ed.dom.events.cancel(e),!1):void 0},_showButton:function(e,t,n,i){if(!e.destroyed){var o=e.dom.isHidden(e.container);t.setDisabled("epipersonalizedcontent",o||!n),t.setActive("epipersonalizedcontent",!o&&i)}},_handleButtonsClick:function(t){return this.ed.dom.hasClass(t.target,"epi_pc_editBtn")&&0===t.button?(tinyMCE.execCommand("epipersonalizedcontent"),e.dom.Event.cancel(t)):void 0},_validateAndCorrectSelection:function(){var e,t,n=this._getCommonAncestor(),i=this.ed.selection.getStart(),o=this.ed.selection.getEnd();if(i!==o?(t=this._getNotPersonalizableContainer(i,n),t?e=this._getPersonalizableParent(t):(t=this._getNotPersonalizableContainer(o,n),t&&(e=this._getPersonalizableParent(t)))):e=this._getPersonalizableParent(n),!e)return null===this.ed.selection.getContent().match(this._personalizedContentClass);if(this.ed.selection.select(e),!this.ed.dom.hasClass(e,this._personalizedContentClass)){var a=tinyMCE.activeEditor.dom.select("div."+this._personalizedContentClass,e);if(a.length>0)return!1}return!0},_getPersonalizableParent:function(e){var t=this;return this.ed.dom.getParent(e,function(n){return"LI"===e.nodeName?"UL"===n.nodeName||"OL"===n.nodeName:"TR"===e.nodeName||"TD"===e.nodeName||"TH"===e.nodeName||"TBODY"===e.nodeName||"THEAD"===e.nodeName||"TFOOT"===e.nodeName?"TABLE"===n.nodeName:"DT"===e.nodeName||"DD"===e.nodeName?"DL"===n.nodeName:t.ed.dom.isBlock(n)})},_isNotPersonalizableNode:function(e){return"TD"===e.nodeName||"TR"===e.nodeName||"TH"===e.nodeName||"TBODY"===e.nodeName||"THEAD"===e.nodeName||"TFOOT"===e.nodeName||"LI"===e.nodeName||"DT"===e.nodeName||"DD"===e.nodeName},_getNotPersonalizableContainer:function(e,t){var n=this;return this.ed.dom.getParent(e,function(e){return n._isNotPersonalizableNode(e)},t)},_selectionContainsPC:function(){var e=RegExp("<div.*"+this._personalizedContentClass+".*>(\\n|.)*<div.*"+this._personalizedContentHeaderClass+".*>(\\n|.)*<div.*"+this._personalizedContentHolderClass+".*>(\\n|.)*<div.*"+this._personalizedContentFooterClass+".*>");return this.ed.dom.hasClass(this.ed.selection.getNode(),this._personalizedContentClass)||this.ed.selection.getContent().match(e)},_getCommonAncestor:function(){if(this.ed.selection.getStart()==this.ed.selection.getEnd())return this.ed.selection.getStart();var e=this.ed.selection.getRng(!0).commonAncestorContainer;return e&&"HTML"!=e.tagName?e:this.ed.getBody()},_convertPCToMceNonEditable:function(e,t,n){var i=e.attr("class")+" ";-1!==i.indexOf("epi_pc ")&&0!==i.indexOf(t)?e.attr("class",i+t):-1!==i.indexOf("epi_pc_h ")?e.attr("contenteditable",null):-1!==i.indexOf("epi_pc_f ")?e.attr("contenteditable",null):-1!==i.indexOf("epi_pc_content ")&&0!==i.indexOf(t)&&e.attr("class",i+n)},getInfo:function(){return{longname:"EPiServer CMS Personalized Content Plug-in",author:"EPiServer AB",authorurl:"http://www.episerver.com",infourl:"http://www.episerver.com",version:"1.0"}}}),e.PluginManager.add("epipersonalizedcontent",e.plugins.epipersonalizedcontent)})(tinymce,epiJQuery);