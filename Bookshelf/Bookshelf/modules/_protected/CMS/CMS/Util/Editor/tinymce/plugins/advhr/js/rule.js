var AdvHRDialog={init:function(e){var t,n=e.dom,i=document.forms[0],a=e.selection.getNode();t=n.getAttrib(a,"width"),i.width.value=t?parseInt(t):n.getStyle("width")||"",i.size.value=n.getAttrib(a,"size")||parseInt(n.getStyle("height"))||"",i.noshade.checked=!!n.getAttrib(a,"noshade")||!!n.getStyle("border-width"),selectByValue(i,"width2",-1!=t.indexOf("%")?"%":"px")},update:function(){var e,t=tinyMCEPopup.editor,n=document.forms[0],i="";e="<hr",n.size.value&&(e+=' size="'+n.size.value+'"',i+=" height:"+n.size.value+"px;"),n.width.value&&(e+=' width="'+n.width.value+("%"==n.width2.value?"%":"")+'"',i+=" width:"+n.width.value+("%"==n.width2.value?"%":"px")+";"),n.noshade.checked&&(e+=' noshade="noshade"',i+=" border-width: 1px; border-style: solid; border-color: #CCCCCC; color: #ffffff;"),t.settings.inline_styles&&(e+=' style="'+tinymce.trim(i)+'"'),e+=" />",t.execCommand("mceInsertContent",!1,e),tinyMCEPopup.close()}};tinyMCEPopup.requireLangPack(),tinyMCEPopup.onInit.add(AdvHRDialog.init,AdvHRDialog);