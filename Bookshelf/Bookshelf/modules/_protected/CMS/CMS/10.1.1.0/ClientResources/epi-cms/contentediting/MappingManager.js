//>>built
define("epi-cms/contentediting/MappingManager",["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/json","dojo/_base/connect","dojo/dom-attr","dojox/encoding/digests/SHA1"],function(_1,_2,_3,_4,_5,_6,_7){return _1(null,{_mappings:null,domUtils:null,attrNames:["data-epi-property-name","data-epi-property-display-names","data-epi-property-customsettings-customtag","data-epi-use-mvc","data-epi-disabled","data-epi-useoverlay","data-epi-overlay-z-index","data-epi-property-type","data-epi-property-edittype","data-epi-property-editorsetting","data-epi-property-editor","data-epi-property-render"],constructor:function(){this._mappings=[];this.domUtils=_6;},clear:function(){var _8;try{while((_8=this._mappings.pop())){for(var _9 in _8){if(_8[_9]){if(_9!=="node"){if(_2.isFunction(_8[_9].destroyRecursive)){_8[_9].destroyRecursive();}else{if(_2.isFunction(_8[_9].destroy)){_8[_9].destroy();}else{if(_2.isFunction(_8[_9].remove)){_8[_9].remove();}}}}_8[_9]=null;}}}}catch(ex){console.error(ex);}},_calculateNodeHash:function(_a){if(!_a){return "";}var _b=_3.map(this.attrNames,_2.hitch(this,function(n){return this.domUtils.get(_a,n)||"";}));return _7(_4.toJson(_b));},update:function(_c,_d){_2.mixin(_c,_d);if(_d.node){_c.nodeHash=this._calculateNodeHash(_d.node);}},add:function(_e){if(_e.node){_e.nodeHash=this._calculateNodeHash(_e.node);}if(_e.blockPropertyInfo&&!_e.propertyName){_e.propertyName=_e.blockPropertyInfo.name;}this._mappings.push(_e);},_tryRemapNode:function(_f,_10){if(this._calculateNodeHash(_10.node)===_f.nodeHash){_f.node=_10.node;_f.updateController.displayNode=_10.node;_f.updateController.checkEmptyHtml();if(_f.overlayItem){_f.overlayItem.set("disabled",false);_f.overlayItem.set("sourceItemNode",_10.node);_f.overlayItem.refresh();}return {success:true,mappedNode:_10};}return {success:false};},remap:function(_11){var _12=[];var _13=(_11!=null?_11.slice(0):[]);_3.forEach(this._mappings,_2.hitch(this,function(_14){if(!_14.updateController){return;}var _15=null;var _16=_3.some(_13,_2.hitch(this,function(_17){var _18=this._tryRemapNode(_14,_17);_15=_15||_18.mappedNode;return _18.success;}));if(_16){if(_15){_13.splice(_3.indexOf(_13,_15),1);}}else{_14.updateController.destroy();delete _14.updateController;if(_14.overlayItem){_14.overlayItem.destroy();delete _14.overlayItem;}delete _14.node;delete _14.nodeHash;}if(this._isEmpty(_14)){_12.push(_14);}if(_14.wrapper&&_14.node){_14.wrapper.set("blockDisplayNode",_14.node);}}));var _19;while((_19=_12.pop())){this._mappings.splice(_3.indexOf(this._mappings,_19),1);}return _13;},_isEmpty:function(_1a){for(var _1b in _1a){if(_1a.hasOwnProperty(_1b)){return false;}}return true;},findOne:function(_1c,_1d){var _1e;_3.some(this._mappings,function(m){if(m[_1c]===_1d){_1e=m;return true;}});return _1e;},find:function(){var _1f;if(arguments[0]===undefined){return this._mappings;}else{if(_2.isFunction(arguments[0])){_1f=arguments[0];}else{var _20=arguments[0],_21=arguments[1];_1f=function(m){return m[_20]===_21;};}}return _3.filter(this._mappings,_1f);}});});