//>>built
define("epi-cms/project/CreateNewDraftConfirmationDialog",["dojo/_base/declare","dojo/string","dgrid/Grid","epi/shell/widget/dialog/Confirmation","epi/string","epi-cms/dgrid/listItemFormatters","epi-cms/dgrid/formatters","epi/i18n!epi/nls/episerver.shared","epi/i18n!epi/cms/nls/episerver.cms.components.project.newdraftconfirmation"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){return _1([_4],{projectItems:null,contentReferences:null,title:_9.allreadypartofproject,cancelActionText:_8.action.cancel,dialogClass:"epi-dialog-contentReferences epi-contentReferences",setFocusOnConfirmButton:false,buildRendering:function(){this.inherited(arguments);var _a={showHeader:true,"class":"epi-plain-grid epi-plain-grid--no-border",columns:{name:{sortable:false,label:_8.header.name,className:"epi-grid--30 epi-cursor--default",renderCell:function(_b,_c,_d,_e){var _f=_b.name+", ID: "+_b.contentLink;_d.innerHTML=_6.statusFormatter(_7.contentItem(_b.typeIdentifier,"",_c,_f),_b,_d,_e);}},path:{sortable:false,label:_9.path,className:"epi-grid--40 epi-cursor--default",formatter:_7.path},projectName:{sortable:false,className:"epi-grid--30 epi-cursor--default",label:_9.project,renderCell:function(_10,_11,_12,_13){_12.textContent=_10.projectName;}}}};this.own(this.content=new _1([_3])(_a));this.content.renderArray(this.projectItems);this.set("description",_2.substitute(_9.confirmationtext,[this.projectItems.length,this.contentReferences.length]));this.set("confirmActionText",this.projectItems.length===1?_9.addnewdraft:_9.addnewdrafts);},_size:function(){this.inherited(arguments);this.content.resize();}});});