//>>built
require({cache:{"url:epi-cms/contentediting/editors/templates/_GroupTreeNode.html":"<div class=\"dijitTreeNode epi-tree-mngr--group\" role=\"presentation\" data-dojo-attach-point=\"rowNode\">\n    <div class=\"dijitTreeRow dijitInline epi-tree-mngr--group-header\" role=\"presentation\">\n        <div data-dojo-attach-point=\"indentNode\" class=\"dijitInline\"></div>\n        <img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"expandoNode\" class=\"dijitTreeExpando\" role=\"presentation\"/>\n        <span data-dojo-attach-point=\"expandoNodeText\" class=\"dijitExpandoText\" role=\"presentation\"></span>\n        <span data-dojo-attach-point=\"contentNode\" class=\"dijitTreeContent\" role=\"presentation\">\n            <span data-dojo-attach-point=\"extraIconsContainer\" class=\"epi-extraIconsContainer\" role=\"presentation\">\n                <span data-dojo-attach-point=\"iconNodeMenu\" class=\"epi-extraIcon epi-pt-contextMenu\" role=\"presentation\">&nbsp;</span>\n            </span>\n            <img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"iconNode\" class=\"dijitIcon dijitTreeIcon epi-iconUsers\" role=\"presentation\"/>\n            <span data-dojo-attach-point=\"labelNode\" class=\"dijitTreeLabel\" role=\"treeitem\" tabindex=\"-1\" aria-selected=\"false\"></span>\n        </span>\n    </div>\n    <hr />\n    <span data-dojo-attach-point=\"dropMoreMessageNode\" class=\"epi-tip epi-tip--block\">${resources.groupdropmoremessage}</span>\n    <div data-dojo-attach-point=\"containerNode\" class=\"dijitTreeContainer\" role=\"presentation\" style=\"display: none;\"></div>\n</div>\n"}});define("epi-cms/contentediting/editors/_GroupTreeNode",["dojo/aspect","dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/dom-class","dojo/dom-style","dijit/Tree","./_ContentAreaTreeNodeMixin","dojo/text!./templates/_GroupTreeNode.html","epi/i18n!epi/cms/nls/episerver.cms.contentediting.editors.contentarea"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){return _3([_7._TreeNode,_8],{templateString:_9,_contextMenuClass:"epi-iconContextMenu",resources:_a,buildRendering:function(){this.inherited(arguments);_5.remove(this.iconNode,"dijitFolderClosed");this.own(_1.after(this,"expand",_4.hitch(this,function(_b){_b.then(_4.hitch(this,function(){if(this._destroyed){return;}_5.add(this.domNode,"epi-treeNodeOpen");_2.forEach(this.getChildren(),function(_c){var _d=_c.item;if(_d.contentGroup&&_d.ensurePersonalization&&_d.hasAnyRoles&&!_d.hasAnyRoles()){_d.set("ensurePersonalization",false);_c.showPersonalizationSelector();}},this);}));return _b;})));this.own(_1.after(this,"collapse",_4.hitch(this,function(_e){_e.then(_4.hitch(this,function(){_5.remove(this.domNode,"epi-treeNodeOpen");}));return _e;})));this.own(this.item.watch("readOnly",_4.hitch(this,function(){this._toggleDropMoreMessageNode();})));},postCreate:function(){this.inherited(arguments);this.own(this.item.watch("count",_4.hitch(this,function(_f,_10,_11){this.set("count",_11);})));if(this.item){this.set("count",this.item.count);}},setSelected:function(_12){this.inherited(arguments);this.item.set("selected",_12);_5.remove(this.rowNode,"dijitTreeRowSelected");_5.toggle(this.domNode,"dijitTreeRowSelected",_12);},_setCountAttr:function(_13){this._set("count",_13);this._toggleDropMoreMessageNode();},_toggleDropMoreMessageNode:function(){_6.set(this.dropMoreMessageNode,"display",!this.item.readOnly&&this.count===1?"":"none");}});});