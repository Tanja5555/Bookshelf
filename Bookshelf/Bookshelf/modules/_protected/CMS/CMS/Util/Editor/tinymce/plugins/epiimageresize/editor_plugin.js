(function(e){e.create("tinymce.plugins.epiimageresize",{init:function(e){e.onInit.add(function(e){var t={},n=e.dom,i=function(e,n){var i=o(n),r=null!==t?t[i]:null;r&&(r.height!==n.height||r.width!==n.width)&&e.undoManager.add()},o=function(t){var i=n.getAttrib(t,"mce_epiimageresize_id");return i||(i=e.id+"_"+e.dom.uniqueId(),n.setAttrib(t,"mce_epiimageresize_id",i)),i},r=function(e){var n=o(e),i={height:e.height,width:e.width};t[n]=i};e.onMouseDown.add(function(e){var t=e.selection.getNode();return null!=t&&"IMG"==t.nodeName&&(e.undoManager.hasUndo()||e.undoManager.add(),r(t)),!0}),e.onMouseUp.add(function(e){var t=e.selection.getNode();return null!=t&&"IMG"==t.nodeName&&setTimeout(function(){i(e,t)},0),!0})})},getInfo:function(){return{longname:"image resizing plugin",author:"EPiServer AB",authorurl:"http://www.episerver.com",infourl:"http://www.episerver.com",version:1}}}),e.PluginManager.add("epiimageresize",e.plugins.epiimageresize)})(tinymce);