function preinit(){var e;(e=tinyMCEPopup.getParam("external_link_list_url"))&&document.write('<script language="javascript" type="text/javascript" src="'+tinyMCEPopup.editor.documentBaseURI.toAbsolute(e)+'"></script>')}function changeClass(){var e=document.forms[0];e.classes.value=getSelectValue(e,"classlist")}function init(){tinyMCEPopup.resizeToInnerSize();var e,t=document.forms[0],i=tinyMCEPopup.editor,n=i.selection.getNode(),o="insert";if(document.getElementById("hrefbrowsercontainer").innerHTML=getBrowserHTML("hrefbrowser","href","file","advlink"),document.getElementById("popupurlbrowsercontainer").innerHTML=getBrowserHTML("popupurlbrowser","popupurl","file","advlink"),document.getElementById("targetlistcontainer").innerHTML=getTargetListHTML("targetlist","target"),e=getLinkListHTML("linklisthref","href"),""==e?document.getElementById("linklisthrefrow").style.display="none":document.getElementById("linklisthrefcontainer").innerHTML=e,e=getAnchorListHTML("anchorlist","href"),""==e?document.getElementById("anchorlistrow").style.display="none":document.getElementById("anchorlistcontainer").innerHTML=e,isVisible("hrefbrowser")&&(document.getElementById("href").style.width="260px"),isVisible("popupurlbrowser")&&(document.getElementById("popupurl").style.width="180px"),n=i.dom.getParent(n,"A"),null==n){var a=i.dom.create("p",null,i.selection.getContent());1===a.childNodes.length&&(n=a.firstChild)}if(null!=n&&"A"==n.nodeName&&(o="update"),t.insert.value=tinyMCEPopup.getLang(o,"Insert",!0),setPopupControlsDisabled(!0),"update"==o){var r=i.dom.getAttrib(n,"href"),s=i.dom.getAttrib(n,"onclick"),l=i.dom.getAttrib(n,"target")?i.dom.getAttrib(n,"target"):"_self";setFormValue("href",r),setFormValue("title",i.dom.getAttrib(n,"title")),setFormValue("id",i.dom.getAttrib(n,"id")),setFormValue("style",i.dom.getAttrib(n,"style")),setFormValue("rel",i.dom.getAttrib(n,"rel")),setFormValue("rev",i.dom.getAttrib(n,"rev")),setFormValue("charset",i.dom.getAttrib(n,"charset")),setFormValue("hreflang",i.dom.getAttrib(n,"hreflang")),setFormValue("dir",i.dom.getAttrib(n,"dir")),setFormValue("lang",i.dom.getAttrib(n,"lang")),setFormValue("tabindex",i.dom.getAttrib(n,"tabindex",n.tabindex!==void 0?n.tabindex:"")),setFormValue("accesskey",i.dom.getAttrib(n,"accesskey",n.accesskey!==void 0?n.accesskey:"")),setFormValue("type",i.dom.getAttrib(n,"type")),setFormValue("onfocus",i.dom.getAttrib(n,"onfocus")),setFormValue("onblur",i.dom.getAttrib(n,"onblur")),setFormValue("onclick",s),setFormValue("ondblclick",i.dom.getAttrib(n,"ondblclick")),setFormValue("onmousedown",i.dom.getAttrib(n,"onmousedown")),setFormValue("onmouseup",i.dom.getAttrib(n,"onmouseup")),setFormValue("onmouseover",i.dom.getAttrib(n,"onmouseover")),setFormValue("onmousemove",i.dom.getAttrib(n,"onmousemove")),setFormValue("onmouseout",i.dom.getAttrib(n,"onmouseout")),setFormValue("onkeypress",i.dom.getAttrib(n,"onkeypress")),setFormValue("onkeydown",i.dom.getAttrib(n,"onkeydown")),setFormValue("onkeyup",i.dom.getAttrib(n,"onkeyup")),setFormValue("target",l),setFormValue("classes",i.dom.getAttrib(n,"class")),null!=s&&-1!=s.indexOf("window.open")?parseWindowOpen(s):parseFunction(s),selectByValue(t,"dir",i.dom.getAttrib(n,"dir")),selectByValue(t,"rel",i.dom.getAttrib(n,"rel")),selectByValue(t,"rev",i.dom.getAttrib(n,"rev")),selectByValue(t,"linklisthref",r),"#"==r.charAt(0)&&selectByValue(t,"anchorlist",r),addClassesToList("classlist",tinyMCEPopup.getParam("style_formats",!1)?{tag:"A"}:"advlink_styles"),selectByValue(t,"classlist",i.dom.getAttrib(n,"class"),!0),selectByValue(t,"targetlist",l,!0)}else addClassesToList("classlist",tinyMCEPopup.getParam("style_formats",!1)?{tag:"A"}:"advlink_styles")}function checkPrefix(e){e.value&&Validator.isEmail(e)&&!/^\s*mailto:/i.test(e.value)&&confirm(tinyMCEPopup.getLang("advlink_dlg.is_email"))&&(e.value="mailto:"+e.value),/^\s*www\./i.test(e.value)&&confirm(tinyMCEPopup.getLang("advlink_dlg.is_external"))&&(e.value="http://"+e.value)}function setFormValue(e,t){document.forms[0].elements[e].value=t}function parseWindowOpen(e){var t=document.forms[0];-1!=e.indexOf("return false;")?(t.popupreturn.checked=!0,e=e.replace("return false;","")):t.popupreturn.checked=!1;var i=parseLink(e);if(null!=i){t.ispopup.checked=!0,setPopupControlsDisabled(!1);var n=parseOptions(i.options),o=i.url;t.popupname.value=i.target,t.popupurl.value=o,t.popupwidth.value=getOption(n,"width"),t.popupheight.value=getOption(n,"height"),t.popupleft.value=getOption(n,"left"),t.popuptop.value=getOption(n,"top"),-1!=t.popupleft.value.indexOf("screen")&&(t.popupleft.value="c"),-1!=t.popuptop.value.indexOf("screen")&&(t.popuptop.value="c"),t.popuplocation.checked="yes"==getOption(n,"location"),t.popupscrollbars.checked="yes"==getOption(n,"scrollbars"),t.popupmenubar.checked="yes"==getOption(n,"menubar"),t.popupresizable.checked="yes"==getOption(n,"resizable"),t.popuptoolbar.checked="yes"==getOption(n,"toolbar"),t.popupstatus.checked="yes"==getOption(n,"status"),t.popupdependent.checked="yes"==getOption(n,"dependent"),buildOnClick()}}function parseFunction(e){document.forms[0],parseLink(e)}function getOption(e,t){return e[t]===void 0?"":e[t]}function setPopupControlsDisabled(e){var t=document.forms[0];t.popupname.disabled=e,t.popupurl.disabled=e,t.popupwidth.disabled=e,t.popupheight.disabled=e,t.popupleft.disabled=e,t.popuptop.disabled=e,t.popuplocation.disabled=e,t.popupscrollbars.disabled=e,t.popupmenubar.disabled=e,t.popupresizable.disabled=e,t.popuptoolbar.disabled=e,t.popupstatus.disabled=e,t.popupreturn.disabled=e,t.popupdependent.disabled=e,setBrowserDisabled("popupurlbrowser",e)}function parseLink(e){e=e.replace(RegExp("&#39;","g"),"'");var t=e.replace(RegExp("\\s*([A-Za-z0-9.]*)\\s*\\(.*","gi"),"$1"),i=templates[t];if(i){for(var n=i.match(RegExp("'?\\$\\{[A-Za-z0-9.]*\\}'?","gi")),o="\\s*[A-Za-z0-9.]*\\s*\\(",a="",r=0;n.length>r;r++)o+=-1!=n[r].indexOf("'${")?"'(.*)'":"([0-9]*)",a+="$"+(r+1),n[r]=n[r].replace(RegExp("[^A-Za-z0-9]","gi"),""),r!=n.length-1?(o+="\\s*,\\s*",a+="<delim>"):o+=".*";o+="\\);?";var s=[];s._function=t;for(var l=e.replace(RegExp(o,"gi"),a).split("<delim>"),r=0;n.length>r;r++)s[n[r]]=l[r];return s}return null}function parseOptions(e){if(null==e||""==e)return[];e=e.toLowerCase(),e=e.replace(/;/g,","),e=e.replace(/[^0-9a-z=,]/g,"");for(var t=e.split(","),i=[],n=0;t.length>n;n++){var o=t[n].split("=");2==o.length&&(i[o[0]]=o[1])}return i}function buildOnClick(){var e=document.forms[0];if(!e.ispopup.checked)return e.onclick.value="",void 0;var t="window.open('",i=e.popupurl.value;t+=i+"','",t+=e.popupname.value+"','",e.popuplocation.checked&&(t+="location=yes,"),e.popupscrollbars.checked&&(t+="scrollbars=yes,"),e.popupmenubar.checked&&(t+="menubar=yes,"),e.popupresizable.checked&&(t+="resizable=yes,"),e.popuptoolbar.checked&&(t+="toolbar=yes,"),e.popupstatus.checked&&(t+="status=yes,"),e.popupdependent.checked&&(t+="dependent=yes,"),""!=e.popupwidth.value&&(t+="width="+e.popupwidth.value+","),""!=e.popupheight.value&&(t+="height="+e.popupheight.value+","),""!=e.popupleft.value&&(t+="c"!=e.popupleft.value?"left="+e.popupleft.value+",":"left='+(screen.availWidth/2-"+e.popupwidth.value/2+")+',"),""!=e.popuptop.value&&(t+="c"!=e.popuptop.value?"top="+e.popuptop.value+",":"top='+(screen.availHeight/2-"+e.popupheight.value/2+")+',"),","==t.charAt(t.length-1)&&(t=t.substring(0,t.length-1)),t+="');",e.popupreturn.checked&&(t+="return false;"),e.onclick.value=t,""==e.href.value&&(e.href.value=i)}function setAttrib(e,t,i){var n=document.forms[0],o=n.elements[t.toLowerCase()],a=tinyMCEPopup.editor.dom;(i===void 0||null==i)&&(i="",o&&(i=o.value)),"style"==t&&(i=a.serializeStyle(a.parseStyle(i),"a")),a.setAttrib(e,t,i)}function getAnchorListHTML(e,t){var i,n,o,a=tinyMCEPopup.editor,r=a.dom.select("a"),s="";for(n=0,o=r.length;o>n;n++)""!=(i=a.dom.getAttrib(r[n],"name"))&&(s+='<option value="#'+i+'">'+i+"</option>"),""==(i=r[n].id)||r[n].href||(s+='<option value="#'+i+'">'+i+"</option>");return""==s?"":s='<select id="'+e+'" name="'+e+'" class="mceAnchorList"'+' onchange="this.form.'+t+'.value=this.options[this.selectedIndex].value"'+">"+'<option value="">---</option>'+s+"</select>"}function insertAction(){var e,t,i,n=tinyMCEPopup.editor;if(e=n.selection.getNode(),checkPrefix(document.forms[0].href),e=n.dom.getParent(e,"A"),!document.forms[0].href.value)return i=n.selection.getBookmark(),n.dom.remove(e,1),n.selection.moveToBookmark(i),tinyMCEPopup.execCommand("mceEndUndoLevel"),tinyMCEPopup.close(),void 0;if(null==e)for(n.getDoc().execCommand("unlink",!1,null),tinyMCEPopup.execCommand("mceInsertLink",!1,"#mce_temp_url#",{skip_undo:1}),t=tinymce.grep(n.dom.select("a"),function(e){return"#mce_temp_url#"==n.dom.getAttrib(e,"href")}),i=0;t.length>i;i++)setAllAttribs(e=t[i]);else setAllAttribs(e);(1!=e.childNodes.length||"IMG"!=e.firstChild.nodeName)&&(n.focus(),n.selection.select(e),n.selection.collapse(0),tinyMCEPopup.storeSelection()),tinyMCEPopup.execCommand("mceEndUndoLevel"),tinyMCEPopup.close()}function setAllAttribs(e){var t=document.forms[0],i=t.href.value.replace(/ /g,"%20"),n=getSelectValue(t,"targetlist");setAttrib(e,"href",i),setAttrib(e,"title"),setAttrib(e,"target","_self"==n?"":n),setAttrib(e,"id"),setAttrib(e,"style"),setAttrib(e,"class",getSelectValue(t,"classlist")),setAttrib(e,"rel"),setAttrib(e,"rev"),setAttrib(e,"charset"),setAttrib(e,"hreflang"),setAttrib(e,"dir"),setAttrib(e,"lang"),setAttrib(e,"tabindex"),setAttrib(e,"accesskey"),setAttrib(e,"type"),setAttrib(e,"onfocus"),setAttrib(e,"onblur"),setAttrib(e,"onclick"),setAttrib(e,"ondblclick"),setAttrib(e,"onmousedown"),setAttrib(e,"onmouseup"),setAttrib(e,"onmouseover"),setAttrib(e,"onmousemove"),setAttrib(e,"onmouseout"),setAttrib(e,"onkeypress"),setAttrib(e,"onkeydown"),setAttrib(e,"onkeyup"),tinyMCE.isMSIE5&&(e.outerHTML=e.outerHTML)}function getSelectValue(e,t){var i=e.elements[t];return i&&null!=i.options&&-1!=i.selectedIndex?i.options[i.selectedIndex].value:""}function getLinkListHTML(e,t,i){if("undefined"==typeof tinyMCELinkList||0==tinyMCELinkList.length)return"";var n="";n+='<select id="'+e+'" name="'+e+'"',n+=' class="mceLinkList" onchange="this.form.'+t+".value=",n+="this.options[this.selectedIndex].value;",i!==void 0&&(n+=i+"('"+t+"',this.options[this.selectedIndex].text,this.options[this.selectedIndex].value);"),n+='"><option value="">---</option>';for(var o=0;tinyMCELinkList.length>o;o++)n+='<option value="'+tinyMCELinkList[o][1]+'">'+tinyMCELinkList[o][0]+"</option>";return n+="</select>"}function getTargetListHTML(e,t){var i=tinyMCEPopup.getParam("theme_advanced_link_targets","").split(";"),n="";n+='<select id="'+e+'" name="'+e+'" onchange="this.form.'+t+".value=",n+='this.options[this.selectedIndex].value;">',n+='<option value="_self">'+tinyMCEPopup.getLang("advlink_dlg.target_same")+"</option>",n+='<option value="_blank">'+tinyMCEPopup.getLang("advlink_dlg.target_blank")+" (_blank)</option>",n+='<option value="_parent">'+tinyMCEPopup.getLang("advlink_dlg.target_parent")+" (_parent)</option>",n+='<option value="_top">'+tinyMCEPopup.getLang("advlink_dlg.target_top")+" (_top)</option>";for(var o=0;i.length>o;o++){var a,r;""!=i[o]&&(a=i[o].split("=")[0],r=i[o].split("=")[1],n+='<option value="'+a+'">'+r+" ("+a+")</option>")}return n+="</select>"}tinyMCEPopup.requireLangPack();var templates={"window.open":"window.open('${url}','${target}','${options}')"};preinit(),tinyMCEPopup.onInit.add(init);