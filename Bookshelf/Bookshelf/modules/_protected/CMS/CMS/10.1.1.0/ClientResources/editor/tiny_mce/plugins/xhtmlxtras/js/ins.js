function init(){SXE.initElementDialog("ins"),"update"==SXE.currentAction&&(setFormValue("datetime",tinyMCEPopup.editor.dom.getAttrib(SXE.updateElement,"datetime")),setFormValue("cite",tinyMCEPopup.editor.dom.getAttrib(SXE.updateElement,"cite")),SXE.showRemoveButton())}function setElementAttribs(e){setAllCommonAttribs(e),setAttrib(e,"datetime"),setAttrib(e,"cite"),e.removeAttribute("data-mce-new")}function insertIns(){var e=tinyMCEPopup.editor.dom.getParent(SXE.focusElement,"INS");if(null==e){var t=SXE.inst.selection.getContent();if(t.length>0){insertInlineElement("ins");for(var n=SXE.inst.dom.select("ins[data-mce-new]"),i=0;n.length>i;i++){var e=n[i];setElementAttribs(e)}}}else setElementAttribs(e);tinyMCEPopup.editor.nodeChanged(),tinyMCEPopup.execCommand("mceEndUndoLevel"),tinyMCEPopup.close()}function removeIns(){SXE.removeElement("ins"),tinyMCEPopup.close()}tinyMCEPopup.onInit.add(init);