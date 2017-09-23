(function(){tinymce.create("tinymce.plugins.XHTMLXtrasPlugin",{init:function(e,t){e.addCommand("mceCite",function(){e.windowManager.open({file:t+"/cite.htm",width:350+tinymce.parseInt(e.getLang("xhtmlxtras.cite_delta_width",0)),height:250+tinymce.parseInt(e.getLang("xhtmlxtras.cite_delta_height",0)),inline:1},{plugin_url:t})}),e.addCommand("mceAcronym",function(){e.windowManager.open({file:t+"/acronym.htm",width:350+tinymce.parseInt(e.getLang("xhtmlxtras.acronym_delta_width",0)),height:250+tinymce.parseInt(e.getLang("xhtmlxtras.acronym_delta_height",0)),inline:1},{plugin_url:t})}),e.addCommand("mceAbbr",function(){e.windowManager.open({file:t+"/abbr.htm",width:350+tinymce.parseInt(e.getLang("xhtmlxtras.abbr_delta_width",0)),height:250+tinymce.parseInt(e.getLang("xhtmlxtras.abbr_delta_height",0)),inline:1},{plugin_url:t})}),e.addCommand("mceDel",function(){e.windowManager.open({file:t+"/del.htm",width:340+tinymce.parseInt(e.getLang("xhtmlxtras.del_delta_width",0)),height:310+tinymce.parseInt(e.getLang("xhtmlxtras.del_delta_height",0)),inline:1},{plugin_url:t})}),e.addCommand("mceIns",function(){e.windowManager.open({file:t+"/ins.htm",width:340+tinymce.parseInt(e.getLang("xhtmlxtras.ins_delta_width",0)),height:310+tinymce.parseInt(e.getLang("xhtmlxtras.ins_delta_height",0)),inline:1},{plugin_url:t})}),e.addCommand("mceAttributes",function(){e.windowManager.open({file:t+"/attributes.htm",width:380+tinymce.parseInt(e.getLang("xhtmlxtras.attr_delta_width",0)),height:370+tinymce.parseInt(e.getLang("xhtmlxtras.attr_delta_height",0)),inline:1},{plugin_url:t})}),e.addButton("cite",{title:"xhtmlxtras.cite_desc",cmd:"mceCite"}),e.addButton("acronym",{title:"xhtmlxtras.acronym_desc",cmd:"mceAcronym"}),e.addButton("abbr",{title:"xhtmlxtras.abbr_desc",cmd:"mceAbbr"}),e.addButton("del",{title:"xhtmlxtras.del_desc",cmd:"mceDel"}),e.addButton("ins",{title:"xhtmlxtras.ins_desc",cmd:"mceIns"}),e.addButton("attribs",{title:"xhtmlxtras.attribs_desc",cmd:"mceAttributes"}),e.onNodeChange.add(function(e,t,n,i){if(n=e.dom.getParent(n,"CITE,ACRONYM,ABBR,DEL,INS"),t.setDisabled("cite",i),t.setDisabled("acronym",i),t.setDisabled("abbr",i),t.setDisabled("del",i),t.setDisabled("ins",i),t.setDisabled("attribs",n&&"BODY"==n.nodeName),t.setActive("cite",0),t.setActive("acronym",0),t.setActive("abbr",0),t.setActive("del",0),t.setActive("ins",0),n)do t.setDisabled(n.nodeName.toLowerCase(),0),t.setActive(n.nodeName.toLowerCase(),1);while(n=n.parentNode)}),e.onPreInit.add(function(){e.dom.create("abbr")})},getInfo:function(){return{longname:"XHTML Xtras Plugin",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/xhtmlxtras",version:tinymce.majorVersion+"."+tinymce.minorVersion}}}),tinymce.PluginManager.add("xhtmlxtras",tinymce.plugins.XHTMLXtrasPlugin)})();