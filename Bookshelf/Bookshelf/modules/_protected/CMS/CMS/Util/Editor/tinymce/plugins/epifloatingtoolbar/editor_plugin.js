(function(e){e.create("tinymce.plugins.epifloatingtoolbar",{init:function(t){t.isFullscreen=!1,t.onInit.add(function(t){if(!t.isFullscreen){var n=e.DOM,i=n.get(t.id+"_external").parentNode;n.addClass(i,"mceEditor epi-lightSkin epi-lightSkinOpe"),n.setAttrib(i,"style",""),n.add("epi-opeToolbar",i)}})},getInfo:function(){return{longname:"Floating Toolbar plugin",author:"EPiServer AB",authorurl:"http://www.episerver.com",infourl:"http://www.episerver.com",version:1}}}),e.PluginManager.add("epifloatingtoolbar",e.plugins.epifloatingtoolbar)})(tinymce,epiJQuery);