var TinyMCE_EditableSelects={editSelectElm:null,init:function(){var e,t,n=document.getElementsByTagName("select");for(e=0;n.length>e;e++)-1!=n[e].className.indexOf("mceEditableSelect")&&(t=new Option("(value)","__mce_add_custom__"),t.className="mceAddSelectValue",n[e].options[n[e].options.length]=t,n[e].onchange=TinyMCE_EditableSelects.onChangeEditableSelect)},onChangeEditableSelect:function(e){var t,n=document,o=window.event?window.event.srcElement:e.target;"__mce_add_custom__"==o.options[o.selectedIndex].value&&(t=n.createElement("input"),t.id=o.id+"_custom",t.name=o.name+"_custom",t.type="text",t.style.width=o.offsetWidth+"px",o.parentNode.insertBefore(t,o),o.style.display="none",t.focus(),t.onblur=TinyMCE_EditableSelects.onBlurEditableSelectInput,t.onkeydown=TinyMCE_EditableSelects.onKeyDown,TinyMCE_EditableSelects.editSelectElm=o)},onBlurEditableSelectInput:function(){var e=TinyMCE_EditableSelects.editSelectElm;e&&(""!=e.previousSibling.value?(addSelectValue(document.forms[0],e.id,e.previousSibling.value,e.previousSibling.value),selectByValue(document.forms[0],e.id,e.previousSibling.value)):selectByValue(document.forms[0],e.id,""),e.style.display="inline",e.parentNode.removeChild(e.previousSibling),TinyMCE_EditableSelects.editSelectElm=null)},onKeyDown:function(e){e=e||window.event,13==e.keyCode&&TinyMCE_EditableSelects.onBlurEditableSelectInput()}};