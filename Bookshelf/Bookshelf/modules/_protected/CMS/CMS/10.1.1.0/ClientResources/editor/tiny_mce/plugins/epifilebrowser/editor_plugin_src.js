(function(e){e.create("tinymce.plugins.epifilebrowser",{init:function(e){if("undefined"!=typeof EPi&&"function"==typeof EPi.ResolveUrlFromUI){var t=function(e,t,n,i){var o=function(){return i.document.getElementById(e)},a=function(e){switch(e){case"image":return["episerver.core.icontentimage"];default:return["episerver.core.icontentmedia"]}};require(["dojo/_base/lang","dojo/on","dojo/when","epi/dependency","epi/UriParser","epi/shell/widget/dialog/Dialog","epi-cms/widget/ContentSelectorDialog","epi/i18n!epi/cms/nls/episerver.cms.widget.contentselector"],function(e,i,r,s,l,c,d,u){var m=s.resolve("epi.storeregistry"),p=m.get("epi.cms.content.light"),g=m.get("epi.shell.context"),h=s.resolve("epi.cms.contentRepositoryDescriptors"),v=h.media,f=new d({canSelectOwnerContent:!1,showButtons:!1,roots:v.roots,multiRootsMode:!0,showRoot:!0,allowedTypes:a(n)}),y=new c({title:u.title,dialogClass:"epi-dialog-portrait",content:f});if(t){var b=g.query({url:t});r(b,function(e){var t=new l(e.versionAgnosticUri);f.set("value",t.getId())})}y.show(),i(y,"execute",function(){var t=f.get("value");t&&r(p.get(t),e.hitch(this,function(e){var t=o();t.value=e.previewUrl,t.onchange&&t.onchange(e.publicUrl)}))})})};e.settings.file_browser_callback=t}},getInfo:function(){return{longname:"File Browser Plug-In",author:"EPiServer AB",authorurl:"http://www.episerver.com",infourl:"http://www.episerver.com",version:1}}}),e.PluginManager.add("epifilebrowser",e.plugins.epifilebrowser)})(tinymce,epiJQuery);