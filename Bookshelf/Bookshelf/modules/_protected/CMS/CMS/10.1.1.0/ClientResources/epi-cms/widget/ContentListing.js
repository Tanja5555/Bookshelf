//>>built
require({cache:{"url:epi-cms/widget/templates/ContentListing.html":"<div>\n    <h1 data-dojo-attach-point=\"header\"></h1>\n    <div data-dojo-type=\"epi-cms/component/ContentQueryGrid\" data-dojo-attach-point=\"contentQuery\">\n    </div>\n</div>"}});define("epi-cms/widget/ContentListing",["dojo","dojo/_base/declare","dojo/_base/Deferred","dojo/html","dijit/_TemplatedMixin","dijit/_Widget","dijit/_WidgetsInTemplateMixin","epi-cms/_ContentContextMixin","epi-cms/component/ContentQueryGrid","dojo/text!./templates/ContentListing.html"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a){return _2([_6,_5,_7,_8],{templateString:_a,startup:function(){this.inherited(arguments);_3.when(this.getCurrentContext(),_1.hitch(this,function(_b){this.contextChanged(_b);}));},contentContextChanged:function(_c,_d,_e){_4.set(this.header,_c.name);this.contentQuery.set("queryParameters",{referenceId:_c.id});this.contentQuery.set("queryName","getchildren");}});});