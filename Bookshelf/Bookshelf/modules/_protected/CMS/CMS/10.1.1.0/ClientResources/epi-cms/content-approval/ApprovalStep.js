//>>built
require({cache:{"url:epi-cms/content-approval/templates/ApprovalStep.html":"<div class=\"epi-approval-step\">\n    <div class=\"epi-approval-step__header\">\n        <div class=\"dijitInline dojoDndHandle\">\n            <span class=\"dijitInline epi-iconDnD\"></span>\n        </div>\n        <div placeholder=\"${resources.header.placeholder}\" title=\"${resources.header.tooltip}\" data-dojo-attach-point=\"headerTextbox\" data-dojo-type=\"dijit/form/TextBox\"></div>\n        <div class=\"dijitInline\" data-dojo-attach-point=\"removeNode\"></div>\n    </div>\n    <div class=\"epi-approval-step__container\">\n        <div data-dojo-attach-point=\"listNode\"></div>\n        <div class=\"epi-approver__add\">\n            <span class=\"dijitInline dijitIcon epi-iconUser\"></span>\n            <div class=\"dijitInline\" data-dojo-attach-point=\"searchNode\"></div>\n        </div>\n    </div>\n    <div class=\"epi-approval-step__add-step\" data-dojo-attach-point=\"arrowNode\"></div>\n</div>\n"}});define("epi-cms/content-approval/ApprovalStep",["dojo/_base/declare","dojo/aspect","dojo/dom-class","dojo/keys","epi/shell/command/builder/ButtonBuilder","epi/shell/command/builder/MenuAssembler","epi-cms/content-approval/viewmodels/ApproverViewModel","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","epi/shell/widget/_ModelBindingMixin","dgrid/List","epi/shell/dgrid/SingleQuery","epi/shell/dgrid/Formatter","dgrid/Keyboard","dgrid/extensions/DijitRegistry","epi/shell/dgrid/WidgetRow","dijit/form/ComboBox","./Approver","dojo/text!./templates/ApprovalStep.html","epi/i18n!epi/nls/episerver.cms.contentapproval.step","dijit/form/TextBox"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13,_14,_15,_16){var _17=_1([_c,_f,_10,_e,_d,_11]);var _18=_1([_12],{_onKey:function(evt){if(evt.keyCode===_4.UP_ARROW&&!this._opened){this.onMoveUp(evt);return;}if(evt.keyCode===_4.ENTER&&this._hasSuggestions()&&this._hasNoItemSelected()){this.set("item",this.dropDown.items[0]);}this.inherited(arguments);},onMoveUp:function(){},_hasSuggestions:function(){return this._opened&&!!this.get("value")&&this.dropDown.items.length>0;},_hasNoItemSelected:function(){return !this.item;}});return _1([_8,_9,_a,_b],{model:null,modelBindingMap:{isReadOnly:["isReadOnly"],isValid:["isValid"]},templateString:_14,resources:_15,buildRendering:function(){this.inherited(arguments);var _19=this.model.get("approvers");this.headerTextbox.set("value",this.model.name);this.list=new _17({className:"epi-chromeless",maintainOddEven:false,store:_19,renderRow:this._renderApprover.bind(this)},this.listNode);this.own(this.list.addKeyHandler(_4.DOWN_ARROW,function(evt){evt.stopPropagation();if(evt.target===evt.currentTarget.lastElementChild){this.searchBox.focus();}}.bind(this)),this.list.addKeyHandler(_4.UP_ARROW,function(evt){evt.stopPropagation();}),this.headerTextbox.on("change",function(_1a){this.model.set("name",_1a);}.bind(this)));var _1b={"class":"epi-approval-step__add-step__button",showLabel:false,tabIndex:-1},_1c=new _5({settings:_1b}),_1d=[{category:"add",builder:_1c,target:this.arrowNode},{category:"remove",builder:_1c,target:this.removeNode}];new _6({configuration:_1d,commandSource:this});var _1e=this.model.get("userStore");this.searchBox=new _18({labelAttr:"displayName",queryExpr:"${0}",store:_1e,searchAttr:"userName",autoComplete:false},this.searchNode);this.own(_2.before(this.searchBox,"onSearch",this._searchBoxOnSearch.bind(this)),this.searchBox.on("change",this._searchBoxOnChange.bind(this)),this.searchBox.on("moveUp",function(evt){_f.moveFocusEnd.call(this.list,evt);}.bind(this)),this.searchBox.on("keypress",function(evt){evt.stopPropagation();}));},_renderApprover:function(_1f){var _20=new _13({model:_1f,languageOptions:this.languageOptions});this.own(_20.on("remove-approver",function(_21){this.model.removeApprover(_21.userName);}.bind(this)));return _20.domNode;},_searchBoxOnSearch:function(_22,_23,_24){_22=this.model.filterOutExistingUsers(_22);return [_22,_23,_24];},_searchBoxOnChange:function(_25){if(!_25||!this.searchBox.item){return;}this.model.addApprover(this.searchBox.item);this.searchBox.set("value","");},startup:function(){if(this._started){return;}this.inherited(arguments);this.list.startup();this.searchBox.startup();this.list.contentNode.tabIndex=-1;},getCommands:function(){return this.model.get("commands");},_setIsReadOnlyAttr:function(_26){_3.toggle(this.domNode,"epi-approval-step--read-only",_26);this.headerTextbox.set({readOnly:_26,tabIndex:_26?-1:0});},_setIsValidAttr:function(_27){var _28=!_27&&this.model.get("showValidations");_3.toggle(this.domNode,"epi-approval-step--error",_28&&this.model.validationMessage.level==="error");_3.toggle(this.domNode,"epi-approval-step--warning",_28&&this.model.validationMessage.level==="warning");}});});