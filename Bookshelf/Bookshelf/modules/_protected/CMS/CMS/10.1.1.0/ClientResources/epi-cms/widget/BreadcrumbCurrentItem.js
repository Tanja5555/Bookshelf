//>>built
require({cache:{"url:epi-cms/widget/templates/BreadcrumbCurrentItem.html":"<div>\n    <div class=\"epi-breadCrumbs-title-wrapper\"><span data-dojo-attach-point=\"iconNode\" class=\"dijitInline dijitIcon epi-breadCrumbsCurrentItem-icon\"></span><h1 data-dojo-attach-point=\"heading\" class=\"epi-breadcrumbContentItem dojoxEllipsis\"></h1></div>\n</div>"}});define("epi-cms/widget/BreadcrumbCurrentItem",["dojo/_base/declare","dojo/dom-class","dojo/Evented","dojo/topic","dojo/dom-construct","dijit/_TemplatedMixin","dijit/_WidgetBase","epi/string","epi/shell/TypeDescriptorManager","dojo/text!./templates/BreadcrumbCurrentItem.html"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){return _1([_7,_6],{templateString:_a,_currentIconClass:null,_setCurrentItemInfoAttr:function(_b){if(!_b){return;}this.heading.innerHTML=_8.encodeForWebString(_b.name);if(_b.dataType){var _c=_9.getValue(_b.dataType,"iconClass");if(_c&&_c!==this._currentIconClass){_2.remove(this.iconNode,this._currentIconClass);_2.add(this.iconNode,_c);this._currentIconClass=_c;}}}});});