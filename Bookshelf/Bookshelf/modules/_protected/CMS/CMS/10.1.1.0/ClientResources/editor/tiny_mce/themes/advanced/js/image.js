var ImageDialog={preInit:function(){var e;tinyMCEPopup.requireLangPack(),(e=tinyMCEPopup.getParam("external_image_list_url"))&&document.write('<script language="javascript" type="text/javascript" src="'+tinyMCEPopup.editor.documentBaseURI.toAbsolute(e)+'"></script>')},init:function(){var t=document.forms[0],n=tinyMCEPopup.editor;document.getElementById("srcbrowsercontainer").innerHTML=getBrowserHTML("srcbrowser","src","image","theme_advanced_image"),isVisible("srcbrowser")&&(document.getElementById("src").style.width="180px"),e=n.selection.getNode(),this.fillFileList("image_list",tinyMCEPopup.getParam("external_image_list","tinyMCEImageList")),"IMG"==e.nodeName&&(t.src.value=n.dom.getAttrib(e,"src"),t.alt.value=n.dom.getAttrib(e,"alt"),t.border.value=this.getAttrib(e,"border"),t.vspace.value=this.getAttrib(e,"vspace"),t.hspace.value=this.getAttrib(e,"hspace"),t.width.value=n.dom.getAttrib(e,"width"),t.height.value=n.dom.getAttrib(e,"height"),t.insert.value=n.getLang("update"),this.styleVal=n.dom.getAttrib(e,"style"),selectByValue(t,"image_list",t.src.value),selectByValue(t,"align",this.getAttrib(e,"align")),this.updateStyle())},fillFileList:function(e,t){var n=tinyMCEPopup.dom,i=n.get(e);t="function"==typeof t?t():window[t],t&&t.length>0?(i.options[i.options.length]=new Option("",""),tinymce.each(t,function(e){i.options[i.options.length]=new Option(e[0],e[1])})):n.remove(n.getParent(e,"tr"))},update:function(){var e,t=document.forms[0],n=t.elements,i=tinyMCEPopup.editor,o={};return tinyMCEPopup.restoreSelection(),""===t.src.value?("IMG"==i.selection.getNode().nodeName&&(i.dom.remove(i.selection.getNode()),i.execCommand("mceRepaint")),tinyMCEPopup.close(),void 0):(i.settings.inline_styles?o.style=this.styleVal:o=tinymce.extend(o,{vspace:n.vspace.value,hspace:n.hspace.value,border:n.border.value,align:getSelectValue(t,"align")}),tinymce.extend(o,{src:t.src.value.replace(/ /g,"%20"),alt:t.alt.value,width:t.width.value,height:t.height.value}),e=i.selection.getNode(),e&&"IMG"==e.nodeName?(i.dom.setAttribs(e,o),tinyMCEPopup.editor.execCommand("mceRepaint"),tinyMCEPopup.editor.focus()):(tinymce.each(o,function(e,t){""===e&&delete o[t]}),i.execCommand("mceInsertContent",!1,tinyMCEPopup.editor.dom.createHTML("img",o),{skip_undo:1}),i.undoManager.add()),tinyMCEPopup.close(),void 0)},updateStyle:function(){var e,t=tinyMCEPopup.dom,n={},i=document.forms[0];tinyMCEPopup.editor.settings.inline_styles&&(tinymce.each(tinyMCEPopup.dom.parseStyle(this.styleVal),function(e,t){n[t]=e}),e=getSelectValue(i,"align"),e?"left"==e||"right"==e?(n["float"]=e,delete n["vertical-align"]):(n["vertical-align"]=e,delete n["float"]):(delete n["float"],delete n["vertical-align"]),e=i.border.value,e||"0"==e?n.border="0"==e?"0":e+"px solid black":delete n.border,e=i.hspace.value,e?(delete n.margin,n["margin-left"]=e+"px",n["margin-right"]=e+"px"):(delete n["margin-left"],delete n["margin-right"]),e=i.vspace.value,e?(delete n.margin,n["margin-top"]=e+"px",n["margin-bottom"]=e+"px"):(delete n["margin-top"],delete n["margin-bottom"]),n=tinyMCEPopup.dom.parseStyle(t.serializeStyle(n),"img"),this.styleVal=t.serializeStyle(n,"img"))},getAttrib:function(e,t){var n,i,o=tinyMCEPopup.editor,a=o.dom;if(o.settings.inline_styles)switch(t){case"align":if(n=a.getStyle(e,"float"))return n;if(n=a.getStyle(e,"vertical-align"))return n;break;case"hspace":if(n=a.getStyle(e,"margin-left"),i=a.getStyle(e,"margin-right"),n&&n==i)return parseInt(n.replace(/[^0-9]/g,""));break;case"vspace":if(n=a.getStyle(e,"margin-top"),i=a.getStyle(e,"margin-bottom"),n&&n==i)return parseInt(n.replace(/[^0-9]/g,""));break;case"border":if(n=0,tinymce.each(["top","right","bottom","left"],function(t){return t=a.getStyle(e,"border-"+t+"-width"),!t||t!=n&&0!==n?(n=0,!1):(t&&(n=t),void 0)}),n)return parseInt(n.replace(/[^0-9]/g,""))}return(n=a.getAttrib(e,t))?n:""},resetImageData:function(){var e=document.forms[0];e.width.value=e.height.value=""},updateImageData:function(){var e=document.forms[0],t=ImageDialog;""==e.width.value&&(e.width.value=t.preloadImg.width),""==e.height.value&&(e.height.value=t.preloadImg.height)},getImageData:function(){var e=document.forms[0];this.preloadImg=new Image,this.preloadImg.onload=this.updateImageData,this.preloadImg.onerror=this.resetImageData,this.preloadImg.src=tinyMCEPopup.editor.documentBaseURI.toAbsolute(e.src.value)}};ImageDialog.preInit(),tinyMCEPopup.onInit.add(ImageDialog.init,ImageDialog);