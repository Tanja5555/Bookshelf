//>>built
require({cache:{"url:epi-cms/widget/templates/_CategoryTreeNode.html":"<div class=\"dijitTreeNode epi-categoryTreeNode\" role=\"presentation\">\n    <a href=\"#\" tabIndex=\"-1\" data-dojo-attach-point=\"rowNode\" class=\"dijitTreeRow\" role=\"presentation\">\n        <div data-dojo-attach-point=\"indentNode\" class=\"dijitInline\"></div>\n        <span data-dojo-attach-point=\"contentNode\" class=\"dijitTreeContent\" role=\"presentation\">\n            <span data-dojo-attach-point=\"expandoNode\" class=\"dijitTreeExpando\" role=\"presentation\"></span>\n            <span data-dojo-attach-point=\"expandoNodeText\" class=\"dijitExpandoText\" role=\"presentation\"></span>\n            <span data-dojo-attach-point=\"iconNode\" class=\"dijitIcon dijitTreeIcon\" role=\"presentation\"></span>\n            <span data-dojo-attach-point=\"labelNode\" class=\"dijitTreeLabel epi-categoryTreeLabel\" role=\"treeitem\"\n                  tabindex=\"-1\" aria-selected=\"false\" data-dojo-attach-event=\"onclick:_onLabelClick, keyup:_onLabelKeyUp\">\n            </span>\n        </span>\n    </a>\n    <div data-dojo-attach-point=\"containerNode\" class=\"dijitTreeContainer\" role=\"presentation\" style=\"display: none;\"></div>\n</div>"}});define("epi-cms/widget/_CategoryTreeNode",["dojo/_base/declare","dojo/_base/lang","dojo/dom-class","dojo/dom-construct","dojo/keys","dojo/text!./templates/_CategoryTreeNode.html","dijit/_TemplatedMixin","dijit/form/CheckBox","epi","epi-cms/widget/_ContentTreeNode"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){return _1([_a,_7],{templateString:_6,_checkbox:null,checked:false,postCreate:function(){this.inherited(arguments);_3.add(this.iconNode,"dijitHidden");this._checkbox=this._createCheckbox();},_createCheckbox:function(){if(!this.item.selectable){return;}var _b=_4.create("span",{"class":"epi-checkboxNode dijitTreeExpando"});var _c=new _8({name:"checkboxCategory",value:this.item.id,tabIndex:-1,checked:false,onChange:_2.hitch(this,function(_d){this.onNodeSelectChanged(_d,this.item);})});_c.placeAt(_b);_4.place(_b,this.expandoNode,"after");return _c;},onNodeSelectChanged:function(_e,_f){},_onLabelClick:function(){if(!this._checkbox){return;}this.set("checked",!this._checkbox.checked);},_onLabelKeyUp:function(evt){if(evt.keyCode===_5.SPACE||evt.keyCode===_5.ENTER){this._onLabelClick();}},_setCheckedAttr:function(_10){if(!this._checkbox){return;}this._set("checked",_10);this._checkbox.set("checked",_10);},_setTotalSelectedNodesAttr:function(_11){var _12=this.tree.model.getLabel(this.item),_13=!this.isExpanded&&_11>0;this.labelNode.innerHTML=_13?_12+" ("+_11+")":_12;}});});