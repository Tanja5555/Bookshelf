//>>built
define("epi-cms/compare/viewmodels/AllPropertiesCompareViewModel",["dojo/_base/declare","dojo/_base/lang","dojo/aspect","dojo/when","epi","epi/dependency","epi/string","epi-cms/core/ContentReference","dojo/Stateful","dijit/Destroyable"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){return _1([_9,_a],{_metadataManager:null,contentViewModel:null,leftMetadata:null,leftPropertyMap:null,rightMetadata:null,rightPropertyMap:null,postscript:function(){this.inherited(arguments);this._metadataManager=this._metadataManager||_6.resolve("epi.shell.MetadataManager");this.initialize();},initialize:function(){var _b=_2.hitch(this,function(_c,_d,_e){if(!_e||(_d&&_d.contentLink===_e.contentLink)){return;}_4(this._metadataManager.getMetadataForType("EPiServer.Core.ContentData",{contentLink:_e.contentLink}),_2.hitch(this,function(_f){this.set("rightMetadata",_f);}));});_b("rightVersion",null,this.model.rightVersion);this.own(this.model.watch("rightVersion",_b),this.model.watch("contentLink",_2.hitch(this,function(_10,_11,_12){if(!_8.compareIgnoreVersion(_11,_12)){this.set({leftMetadata:null,leftPropertyMap:null,rightMetadata:null,rightPropertyMap:null});}})));},generateComparison:function(){var _13={},_14=this.rightMetadata;if(!this.leftPropertyMap||!this.rightPropertyMap){this.set("comparison",null);return;}_14.groups.forEach(function(_15){_13[_15.name.toLowerCase()]=[];});_14.properties.forEach(_2.hitch(this,function(_16){this._addPropertyToComparison(_13,_16,_16.groupName);}));this.set("comparison",_13);},copy:function(_17){if(!_17){throw new Error("propertyName is required");}var _18=this.contentViewModel,_19=_2.getObject(_17,false,this.rightPropertyMap);if(_18&&_19!==undefined){_18.setProperty(_17,_2.clone(_19));_18.save();}},_addPropertyToComparison:function(_1a,_1b,_1c,_1d){var _1e=_7.pascalToCamel((_1d||"")+_1b.name),_1f=_2.getObject(_1e,false,this.leftPropertyMap),_20=_2.getObject(_1e,false,this.rightPropertyMap);if(_1b.showForEdit&&!_5.areEqual(_1f,_20)){if(_1b.properties.length){_1b.properties.forEach(_2.hitch(this,function(_21){this._addPropertyToComparison(_1a,_21,_1c,_1e+".");}));}else{_1a[_1c.toLowerCase()].push(_1e.toLowerCase());}}},_contentViewModelSetter:function(_22){this.contentViewModel=_22;this.set({leftMetadata:_22.metadata,leftPropertyMap:_22.contentData.properties});this.own(_22.watch("contentData",_2.hitch(this,function(_23,_24,_25){this.set("leftPropertyMap",_25.properties);})),_3.after(_22,"onPropertySaved",_2.hitch(this,"_onPropertySaved"),true));},_leftPropertyMapSetter:function(_26){this.leftPropertyMap=_2.clone(_26);this.generateComparison();},_rightPropertyMapSetter:function(_27){this.rightPropertyMap=_2.clone(_27);this.generateComparison();},_rightMetadataSetter:function(_28){this.rightMetadata=_28;if(this.rightMetadata){_4(this.model.contentDataStore.get(this.model.rightVersion.contentLink)).then(_2.hitch(this,function(_29){this.set("rightPropertyMap",_29.properties);}));}},_onPropertySaved:function(_2a,_2b){var _2c=this.comparison;if(this.leftPropertyMap){_2.setObject(_2a,_2b,this.leftPropertyMap);}if(!_2c){return;}var _2d=this.rightMetadata.getPropertyMetadata(_2a.split(".")[0]),_2e=this.rightMetadata.getPropertyMetadata(_2a),_2f=this.rightPropertyMap&&_2.getObject(_2a,false,this.rightPropertyMap);if(!_2e.showForEdit){return;}var _30=_2c[_2d.groupName.toLowerCase()],_31=_2a.toLowerCase(),_32=_30.indexOf(_31),_33=_5.areEqual(_2b,_2f);if(_32>=0&&_33){_30.splice(_32,1);}else{if(_32<0&&!_33){_30.splice(0,0,_31);}}this.set("comparison",_2c);}});});