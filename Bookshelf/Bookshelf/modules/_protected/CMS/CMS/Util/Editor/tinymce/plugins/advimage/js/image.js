var ImageDialog={preInit:function(){var e;tinyMCEPopup.requireLangPack(),(e=tinyMCEPopup.getParam("external_image_list_url"))&&document.write('<script language="javascript" type="text/javascript" src="'+tinyMCEPopup.editor.documentBaseURI.toAbsolute(e)+'"></script>')},init:function(e){var t=document.forms[0],i=t.elements,e=tinyMCEPopup.editor,n=e.dom,a=e.selection.getNode();tinyMCEPopup.resizeToInnerSize(),this.fillClassList("class_list"),this.fillFileList("src_list","tinyMCEImageList"),this.fillFileList("over_list","tinyMCEImageList"),this.fillFileList("out_list","tinyMCEImageList"),TinyMCE_EditableSelects.init(),"IMG"==a.nodeName&&(i.src.value=n.getAttrib(a,"src").replace(/(\?|&)epi_image_timestamp=.*(&|$)/g,""),i.width.value=n.getAttrib(a,"width"),i.height.value=n.getAttrib(a,"height"),i.alt.value=n.getAttrib(a,"alt"),i.title.value=n.getAttrib(a,"title"),i.vspace.value=this.getAttrib(a,"vspace"),i.hspace.value=this.getAttrib(a,"hspace"),i.border.value=this.getAttrib(a,"border"),selectByValue(t,"align",this.getAttrib(a,"align")),selectByValue(t,"class_list",n.getAttrib(a,"class"),!0,!0),i.style.value=n.getAttrib(a,"style"),i.id.value=n.getAttrib(a,"id"),i.dir.value=n.getAttrib(a,"dir"),i.lang.value=n.getAttrib(a,"lang"),i.usemap.value=n.getAttrib(a,"usemap"),i.longdesc.value=n.getAttrib(a,"longdesc"),i.insert.value=e.getLang("update"),/^\s*this.src\s*=\s*\'([^\']+)\';?\s*$/.test(n.getAttrib(a,"onmouseover"))&&(i.onmouseoversrc.value=n.getAttrib(a,"onmouseover").replace(/^\s*this.src\s*=\s*\'([^\']+)\';?\s*$/,"$1")),/^\s*this.src\s*=\s*\'([^\']+)\';?\s*$/.test(n.getAttrib(a,"onmouseout"))&&(i.onmouseoutsrc.value=n.getAttrib(a,"onmouseout").replace(/^\s*this.src\s*=\s*\'([^\']+)\';?\s*$/,"$1")),e.settings.inline_styles&&(n.getAttrib(a,"align")&&this.updateStyle("align"),n.getAttrib(a,"hspace")&&this.updateStyle("hspace"),n.getAttrib(a,"border")&&this.updateStyle("border"),n.getAttrib(a,"vspace")&&this.updateStyle("vspace"))),document.getElementById("srcbrowsercontainer").innerHTML=getBrowserHTML("srcbrowser","src","image","theme_advanced_image"),isVisible("srcbrowser")&&(document.getElementById("src").style.width="260px"),document.getElementById("onmouseoversrccontainer").innerHTML=getBrowserHTML("overbrowser","onmouseoversrc","image","theme_advanced_image"),isVisible("overbrowser")&&(document.getElementById("onmouseoversrc").style.width="260px"),document.getElementById("onmouseoutsrccontainer").innerHTML=getBrowserHTML("outbrowser","onmouseoutsrc","image","theme_advanced_image"),isVisible("outbrowser")&&(document.getElementById("onmouseoutsrc").style.width="260px"),e.getParam("advimage_constrain_proportions",!0)&&(t.constrain.checked=!0),i.onmouseoversrc.value||i.onmouseoutsrc.value?this.setSwapImage(!0):this.setSwapImage(!1),this.changeAppearance(),this.showPreviewImage(i.src.value,1)},insert:function(){var e=tinyMCEPopup.editor,t=this,i=document.forms[0];return""===i.src.value?("IMG"==e.selection.getNode().nodeName&&(e.dom.remove(e.selection.getNode()),e.execCommand("mceRepaint")),tinyMCEPopup.close(),void 0):tinyMCEPopup.getParam("accessibility_warnings",1)&&!i.alt.value?(tinyMCEPopup.confirm(tinyMCEPopup.getLang("advimage_dlg.missing_alt"),function(e){e&&t.insertAndClose()}),void 0):(t.insertAndClose(),void 0)},insertAndClose:function(){var e,t=tinyMCEPopup.editor,i=document.forms[0],n=i.elements,a={};tinyMCEPopup.restoreSelection(),tinymce.isWebKit&&t.getWin().focus(),a=t.settings.inline_styles?{vspace:"",hspace:"",border:"",align:""}:{vspace:n.vspace.value,hspace:n.hspace.value,border:n.border.value,align:getSelectValue(i,"align")},tinymce.extend(a,{src:n.src.value,width:n.width.value,height:n.height.value,alt:n.alt.value,title:n.title.value,"class":getSelectValue(i,"class_list"),style:n.style.value,id:n.id.value,dir:n.dir.value,lang:n.lang.value,usemap:n.usemap.value,longdesc:n.longdesc.value}),a.onmouseover=a.onmouseout="",i.onmousemovecheck.checked&&(n.onmouseoversrc.value&&(a.onmouseover="this.src='"+n.onmouseoversrc.value+"';"),n.onmouseoutsrc.value&&(a.onmouseout="this.src='"+n.onmouseoutsrc.value+"';")),e=t.selection.getNode(),e&&"IMG"==e.nodeName?(t.dom.setAttribs(e,a),t.undoManager.add()):(t.execCommand("mceInsertContent",!1,'<img id="__mce_tmp" />',{skip_undo:1}),t.dom.setAttribs("__mce_tmp",a),t.dom.setAttrib("__mce_tmp","id",""),t.undoManager.add()),tinyMCEPopup.close()},getAttrib:function(e,t){var i,n,a=tinyMCEPopup.editor,o=a.dom;if(a.settings.inline_styles)switch(t){case"align":if(i=o.getStyle(e,"float"))return i;if(i=o.getStyle(e,"vertical-align"))return i;break;case"hspace":if(i=o.getStyle(e,"margin-left"),n=o.getStyle(e,"margin-right"),i&&i==n)return parseInt(i.replace(/[^0-9]/g,""));break;case"vspace":if(i=o.getStyle(e,"margin-top"),n=o.getStyle(e,"margin-bottom"),i&&i==n)return parseInt(i.replace(/[^0-9]/g,""));break;case"border":if(i=0,tinymce.each(["top","right","bottom","left"],function(t){return t=o.getStyle(e,"border-"+t+"-width"),!t||t!=i&&0!==i?(i=0,!1):(t&&(i=t),void 0)}),i)return parseInt(i.replace(/[^0-9]/g,""))}return(i=o.getAttrib(e,t))?i:""},setSwapImage:function(e){var t=document.forms[0];t.onmousemovecheck.checked=e,setBrowserDisabled("overbrowser",!e),setBrowserDisabled("outbrowser",!e),t.over_list&&(t.over_list.disabled=!e),t.out_list&&(t.out_list.disabled=!e),t.onmouseoversrc.disabled=!e,t.onmouseoutsrc.disabled=!e},fillClassList:function(e){var t=tinyMCEPopup.dom.get(e);addClassesToList(e,tinyMCEPopup.getParam("style_formats",!1)?{tag:"IMG"}:null),t.options.length>0?t.options[0].text=tinyMCEPopup.getLang("not_set"):dom.remove(dom.getParent(e,"tr"))},fillFileList:function(e,t){var i=tinyMCEPopup.dom,n=i.get(e);t=window[t],n.options.length=0,t&&t.length>0?(n.options[n.options.length]=new Option("",""),tinymce.each(t,function(e){n.options[n.options.length]=new Option(e[0],e[1])})):i.remove(i.getParent(e,"tr"))},resetImageData:function(){var e=document.forms[0];e.elements.width.value=e.elements.height.value=""},updateImageData:function(e,t){var i=document.forms[0];t||(i.elements.width.value=e.width,i.elements.height.value=e.height),this.preloadImg=e},changeAppearance:function(){var e=tinyMCEPopup.editor,t=document.forms[0],i=document.getElementById("alignSampleImg");i&&(e.getParam("inline_styles")?e.dom.setAttrib(i,"style",t.style.value):(i.align=t.align.value,i.border=t.border.value,i.hspace=t.hspace.value,i.vspace=t.vspace.value))},changeHeight:function(){var e,t=document.forms[0],i=this;t.constrain.checked&&i.preloadImg&&""!=t.width.value&&""!=t.height.value&&(e=parseInt(t.width.value)/parseInt(i.preloadImg.width)*i.preloadImg.height,t.height.value=e.toFixed(0))},changeWidth:function(){var e,t=document.forms[0],i=this;t.constrain.checked&&i.preloadImg&&""!=t.width.value&&""!=t.height.value&&(e=parseInt(t.height.value)/parseInt(i.preloadImg.height)*i.preloadImg.width,t.width.value=e.toFixed(0))},updateStyle:function(e){var t,i=tinyMCEPopup.dom,n=document.forms[0],a=i.create("img",{style:i.get("style").value});tinyMCEPopup.editor.settings.inline_styles&&("align"==e&&(i.setStyle(a,"float",""),i.setStyle(a,"vertical-align",""),t=getSelectValue(n,"align"),t&&("left"==t||"right"==t?i.setStyle(a,"float",t):a.style.verticalAlign=t)),"border"==e&&(i.setStyle(a,"border",""),t=n.border.value,(t||"0"==t)&&(a.style.border="0"==t?"0":t+"px solid black")),"hspace"==e&&(i.setStyle(a,"marginLeft",""),i.setStyle(a,"marginRight",""),t=n.hspace.value,t&&(a.style.marginLeft=t+"px",a.style.marginRight=t+"px")),"vspace"==e&&(i.setStyle(a,"marginTop",""),i.setStyle(a,"marginBottom",""),t=n.vspace.value,t&&(a.style.marginTop=t+"px",a.style.marginBottom=t+"px")),i.get("style").value=i.serializeStyle(i.parseStyle(a.style.cssText),"img"))},changeMouseMove:function(){},showPreviewImage:function(e,t){return e?(!t&&tinyMCEPopup.getParam("advimage_update_dimensions_onchange",!0)&&this.resetImageData(),e=tinyMCEPopup.editor.documentBaseURI.toAbsolute(e),t?tinyMCEPopup.dom.setHTML("prev",'<img id="previewImg" src="'+e+'" border="0" onload="ImageDialog.updateImageData(this, 1);" />'):tinyMCEPopup.dom.setHTML("prev",'<img id="previewImg" src="'+e+'" border="0" onload="ImageDialog.updateImageData(this);" onerror="ImageDialog.resetImageData();" />'),void 0):(tinyMCEPopup.dom.setHTML("prev",""),void 0)}};ImageDialog.preInit(),tinyMCEPopup.onInit.add(ImageDialog.init,ImageDialog);