(function(e,t){e.dom.Event,e.create("tinymce.plugins.epiaccesskeysremove",{init:function(e){e.onInit.add(function(e){t("[accesskey]",e.getContainer()).removeAttr("accessKey")})},getInfo:function(){return{longname:"EPiServer Access Keys Remove",author:"EPiServer AB",authorurl:"http://www.episerver.com",infourl:"http://www.episerver.com",version:1}}}),e.PluginManager.add("epiaccesskeysremove",e.plugins.epiaccesskeysremove)})(tinymce,epiJQuery);