tinyMCEPopup.requireLangPack();var LinkDialog={preInit:function(){var e;(e=tinyMCEPopup.getParam("external_link_list_url"))&&document.write('<script language="javascript" type="text/javascript" src="'+tinyMCEPopup.editor.documentBaseURI.toAbsolute(e)+'"></script>')},init:function(){var t=document.forms[0],n=tinyMCEPopup.editor;document.getElementById("hrefbrowsercontainer").innerHTML=getBrowserHTML("hrefbrowser","href","file","theme_advanced_link"),isVisible("hrefbrowser")&&(document.getElementById("href").style.width="180px"),this.fillClassList("class_list"),this.fillFileList("link_list","tinyMCELinkList"),this.fillTargetList("target_list"),(e=n.dom.getParent(n.selection.getNode(),"A"))&&(t.href.value=n.dom.getAttrib(e,"href"),t.linktitle.value=n.dom.getAttrib(e,"title"),t.insert.value=n.getLang("update"),selectByValue(t,"link_list",t.href.value),selectByValue(t,"target_list",n.dom.getAttrib(e,"target")),selectByValue(t,"class_list",n.dom.getAttrib(e,"class")))},update:function(){var e,t,n=document.forms[0],i=tinyMCEPopup.editor;return tinyMCEPopup.restoreSelection(),e=i.dom.getParent(i.selection.getNode(),"A"),!n.href.value&&e?(tinyMCEPopup.execCommand("mceBeginUndoLevel"),t=i.selection.getBookmark(),i.dom.remove(e,1),i.selection.moveToBookmark(t),tinyMCEPopup.execCommand("mceEndUndoLevel"),tinyMCEPopup.close(),void 0):(tinyMCEPopup.execCommand("mceBeginUndoLevel"),null==e?(i.getDoc().execCommand("unlink",!1,null),tinyMCEPopup.execCommand("CreateLink",!1,"#mce_temp_url#",{skip_undo:1}),tinymce.each(i.dom.select("a"),function(t){"#mce_temp_url#"==i.dom.getAttrib(t,"href")&&(e=t,i.dom.setAttribs(e,{href:n.href.value,title:n.linktitle.value,target:n.target_list?getSelectValue(n,"target_list"):null,"class":n.class_list?getSelectValue(n,"class_list"):null}))})):i.dom.setAttribs(e,{href:n.href.value,title:n.linktitle.value,target:n.target_list?getSelectValue(n,"target_list"):null,"class":n.class_list?getSelectValue(n,"class_list"):null}),(1!=e.childNodes.length||"IMG"!=e.firstChild.nodeName)&&(i.focus(),i.selection.select(e),i.selection.collapse(0),tinyMCEPopup.storeSelection()),tinyMCEPopup.execCommand("mceEndUndoLevel"),tinyMCEPopup.close(),void 0)},checkPrefix:function(e){e.value&&Validator.isEmail(e)&&!/^\s*mailto:/i.test(e.value)&&confirm(tinyMCEPopup.getLang("advanced_dlg.link_is_email"))&&(e.value="mailto:"+e.value),/^\s*www\./i.test(e.value)&&confirm(tinyMCEPopup.getLang("advanced_dlg.link_is_external"))&&(e.value="http://"+e.value)},fillFileList:function(e,t){var n=tinyMCEPopup.dom,i=n.get(e);t=window[t],t&&t.length>0?(i.options[i.options.length]=new Option("",""),tinymce.each(t,function(e){i.options[i.options.length]=new Option(e[0],e[1])})):n.remove(n.getParent(e,"tr"))},fillClassList:function(e){var t=tinyMCEPopup.dom,n=t.get(e);addClassesToList(e,tinyMCEPopup.getParam("style_formats",!1)?{tag:"A"}:null),n.options.length>0?n.options[0].text=tinyMCEPopup.getLang("not_set"):t.remove(t.getParent(e,"tr"))},fillTargetList:function(e){var t,n=tinyMCEPopup.dom,i=n.get(e);i.options[i.options.length]=new Option(tinyMCEPopup.getLang("not_set"),""),i.options[i.options.length]=new Option(tinyMCEPopup.getLang("advanced_dlg.link_target_same"),"_self"),i.options[i.options.length]=new Option(tinyMCEPopup.getLang("advanced_dlg.link_target_blank"),"_blank"),(t=tinyMCEPopup.getParam("theme_advanced_link_targets"))&&tinymce.each(t.split(","),function(e){e=e.split("="),i.options[i.options.length]=new Option(e[0],e[1])})}};LinkDialog.preInit(),tinyMCEPopup.onInit.add(LinkDialog.init,LinkDialog);