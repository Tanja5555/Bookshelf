//>>built
define("epi-cms/component/ContentContextMenuCommandProvider",["dojo/_base/declare","dijit/Destroyable","epi/shell/command/_CommandProviderMixin","../command/CopyContent","../command/CutContent","../command/PasteContent","../command/TranslateContent","../command/DeleteContent","../plugin-area/navigation-tree","../widget/CreateCommandsMixin","epi/shell/command/_SelectionCommandMixin","epi/shell/selection"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c){return _1([_3,_a,_2],{treeModel:null,clipboardManager:null,_settings:null,constructor:function(_d){_1.safeMixin(this,_d);this.own(_9.on("added, removed",this._updateCommands.bind(this)));},postscript:function(){this.inherited(arguments);this._updateCommands();},updateCommandModel:function(_e){this.get("commands").forEach(function(_f){if(!_f.isInstanceOf(_b)){_f.set("model",_e);}});this._settings.selection.set("data",[{type:"epi.cms.contentdata",data:_e}]);},_updateCommands:function(){this.get("commands").forEach(function(_10){if(typeof _10.destroy==="function"){_10.destroy();}});this._settings={category:"context",model:this.treeModel,clipboard:this.clipboardManager,selection:new _c()};var _11=this.getCreateCommands(),_12=[];for(var key in _11){_12.push(_11[key].command);}_12.push(new _7({category:"context"}),new _5(this._settings),new _4(this._settings),new _6(this._settings),new _8(this._settings));_9.get().forEach(function(_13){_13.category="context";_12.push(_13);});this.set("commands",_12);}});});