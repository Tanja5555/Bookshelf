//>>built
define("epi-cms/component/command/_GlobalToolbarCommandProvider",["dojo/_base/declare","dojo/_base/lang","dijit/form/Button","epi/shell/command/_CommandProviderMixin"],function(_1,_2,_3,_4){return _1([_4],{addToLeading:function(_5,_6){this.addCommand(_5,_6);},addToCenter:function(_7,_8){_8=_2.mixin({category:"center"},_8);this.addCommand(_7,_8);},addToTrailing:function(_9,_a){_a=_2.mixin({category:"trailing"},_a);this.addCommand(_9,_a);},addCommand:function(_b,_c){_c=_2.mixin({iconClass:_b.iconClass,category:"leading",label:_b.label,tooltip:_b.tooltip,showLabel:false,widget:_3,model:_b},_c);_b=_2.delegate(_b,{settings:_c});this.add("commands",_b);}});});