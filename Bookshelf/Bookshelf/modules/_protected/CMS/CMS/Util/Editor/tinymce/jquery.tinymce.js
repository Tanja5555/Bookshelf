(function(t){function n(){function n(t){"remove"===t&&this.each(function(t,n){var e=r(n);e&&e.remove()}),this.find("span.mceEditor,div.mceEditor").each(function(t,n){var e=tinyMCE.get(n.id.replace(/_parent$/,""));e&&e.remove()})}function i(t){var i,r=this;if(t!==e)n.call(r),r.each(function(n,e){var i;(i=tinyMCE.get(e.id))&&i.setContent(t)});else if(r.length>0&&(i=tinyMCE.get(r[0].id)))return i.getContent()}function r(t){var n=null;return t&&t.id&&a.tinymce&&(n=tinyMCE.get(t.id)),n}function c(t){return!!(t&&t.length&&a.tinymce&&t.is(":tinymce"))}var u={};t.each(["text","html","val"],function(n,a){var s=u[a]=t.fn[a],l="text"===a;t.fn[a]=function(n){var a=this;if(!c(a))return s.apply(a,arguments);if(n!==e)return i.call(a.filter(":tinymce"),n),s.apply(a.not(":tinymce"),arguments),a;var u="",o=arguments;return(l?a:a.eq(0)).each(function(n,e){var i=r(e);u+=i?l?i.getContent().replace(/<(?:"[^"]*"|'[^']*'|[^'">])*>/g,""):i.getContent():s.apply(t(e),o)}),u}}),t.each(["append","prepend"],function(n,i){var a=u[i]=t.fn[i],s="prepend"===i;t.fn[i]=function(t){var n=this;return c(n)?t!==e?(n.filter(":tinymce").each(function(n,e){var i=r(e);i&&i.setContent(s?t+i.getContent():i.getContent()+t)}),a.apply(n.not(":tinymce"),arguments),n):void 0:a.apply(n,arguments)}}),t.each(["remove","replaceWith","replaceAll","empty"],function(e,i){var r=u[i]=t.fn[i];t.fn[i]=function(){return n.call(this,i),r.apply(this,arguments)}}),u.attr=t.fn.attr,t.fn.attr=function(n,a,s){var l=this;if(!n||"value"!==n||!c(l))return u.attr.call(l,n,a,s);if(a!==e)return i.call(l.filter(":tinymce"),a),u.attr.call(l.not(":tinymce"),n,a,s),l;var o=l[0],f=r(o);return f?f.getContent():u.attr.call(t(o),n,a,s)}}var e,i,r=[],a=window;t.fn.tinymce=function(e){function c(){var i=[],r=0;n&&(n(),n=null),f.each(function(t,n){var a,c=n.id,u=e.oninit;c||(n.id=c=tinymce.DOM.uniqueId()),a=new tinymce.Editor(c,e),i.push(a),u&&a.onInit.add(function(){var t,n=u;++r==i.length&&(tinymce.is(n,"string")&&(t=-1===n.indexOf(".")?null:tinymce.resolve(n.replace(/\.\w+$/,"")),n=tinymce.resolve(n)),n.apply(t||tinymce,i))})}),t.each(i,function(t,n){n.render()})}var u,s,l,o,f=this,p="",m="";return f.length?e?(a.tinymce||i||!(u=e.script_url)?1===i?r.push(c):c():(i=1,s=u.substring(0,u.lastIndexOf("/")),/_(src|dev)\.js/g.test(u)&&(m="_src"),l=u.lastIndexOf("?"),-1!=l&&(p=u.substring(l+1)),a.tinyMCEPreInit=a.tinyMCEPreInit||{base:s,suffix:m,query:p},-1!=u.indexOf("gzip")&&(o=e.language||"en",u=u+(/\?/.test(u)?"&":"?")+"js=true&core=true&suffix="+escape(m)+"&themes="+escape(e.theme)+"&plugins="+escape(e.plugins)+"&languages="+o,a.tinyMCE_GZ||(tinyMCE_GZ={start:function(){function n(t){tinymce.ScriptLoader.markDone(tinyMCE.baseURI.toAbsolute(t))}tinymce.suffix=m,n("langs/"+o+".js"),n("themes/"+e.theme+"/editor_template"+m+".js"),n("themes/"+e.theme+"/langs/"+o+".js"),t.each(e.plugins.split(","),function(t,e){e&&(n("plugins/"+e+"/editor_plugin"+m+".js"),n("plugins/"+e+"/langs/"+o+".js"))})},end:function(){}})),t.ajax({type:"GET",url:u,dataType:"script",cache:!0,success:function(){tinymce.dom.Event.domLoaded=1,i=2,e.script_loaded&&e.script_loaded(),c(),t.each(r,function(t,n){n()})}})),f):tinyMCE.get(f[0].id):f},t.extend(t.expr[":"],{tinymce:function(t){return t.id&&!!tinyMCE.get(t.id)}})})(jQuery);