//>>built
define("epi-cms/compare/views/AllPropertiesCompareView",["dojo/_base/declare","dojo/_base/lang","dojo/Deferred","dojo/when","../viewmodels/AllPropertiesCompareViewModel","../AllPropertiesTransformer","../FormField","epi/shell/widget/FormContainer","epi-cms/contentediting/FormEditing","epi/shell/widget/_ModelBindingMixin"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){return _1([_9,_a],{modelBindingMap:{comparison:["comparison"],rightMetadata:["rightMetadata"]},postMixInProperties:function(){this.inherited(arguments);this._groupMap={};this.own(this.model=new _5({model:this.model}));},removeForm:function(_b){var _c=_b.containerLayout.selectedChildWidget;if(_c){this._selectedTabName=_c.name.toLowerCase();}this._groupMap={};this._mappingManager.clear();return this.inherited(arguments);},_createForm:function(){return new _8(_2.mixin({readOnly:!this.viewModel.canChangeContent(),metadata:this.viewModel.metadata,metadataTransformer:new _6({model:this.model}),baseClass:"epi-cmsEditingForm epi-form-container epi-form-container--compare"},this.formSettings));},_setupForm:function(){this.inherited(arguments);var _d=this._groupMap[this._selectedTabName];if(_d){this._form.containerLayout.selectChild(_d);}},_setComparisonAttr:function(_e){this._set("comparison",_e);for(var _f in this._groupMap){var _10=this._groupMap[_f];var _11=(_e&&_e[_f]&&_e[_f].length)||0;this._setGroupTitleWithChanges(_10,_11);}},_setRightMetadataAttr:function(_12){this._set("rightMetadata",_12);if(!this._started){return;}this._removeAndDestroyForm();if(_12&&this.model.leftMetadata&&this.viewModel){this._setupForm();}},onGroupCreated:function(_13,_14,_15){this.inherited(arguments);if(_15){return;}var _16=_13.toLowerCase(),_17=this.comparison;_14.groupName=_13;this._groupMap[_16]=_14;this._setGroupTitleWithChanges(_14,_17&&_17[_16]&&_17[_16].length);},_setViewModelAttr:function(_18){this.inherited(arguments);this.model.set("contentViewModel",this.viewModel);},_setGroupTitleWithChanges:function(_19,_1a){var _1b=_19.params.title;if(_1a){_1b=_2.replace("{0}<span class=\"epi-compare-tab--has-changes\">{1}</span>",[_1b,_1a]);}_19.set("title",_1b);}});});