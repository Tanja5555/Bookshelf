(function(){var e=tinymce.each;tinymce.create("tinymce.plugins.MediaPlugin",{init:function(t,n){function i(e){return/^(mceItemFlash|mceItemShockWave|mceItemWindowsMedia|mceItemQuickTime|mceItemRealMedia)$/.test(e.className)}function o(e,n){return n=RegExp(n+'="([^"]+)"',"g").exec(e),n?t.dom.decode(n[1]):""}var a=this;a.editor=t,a.url=n,t.onPreInit.add(function(){t.serializer.addRules("param[name|value|_mce_value]")}),t.addCommand("mceMedia",function(){t.windowManager.open({file:n+"/media.htm",width:430+parseInt(t.getLang("media.delta_width",0)),height:470+parseInt(t.getLang("media.delta_height",0)),inline:1},{plugin_url:n})}),t.addButton("media",{title:"media.desc",cmd:"mceMedia"}),t.onNodeChange.add(function(e,t,n){t.setActive("media","IMG"==n.nodeName&&i(n))}),t.onInit.add(function(){var i={mceItemFlash:"flash",mceItemShockWave:"shockwave",mceItemWindowsMedia:"windowsmedia",mceItemQuickTime:"quicktime",mceItemRealMedia:"realmedia"};t.selection.onSetContent.add(function(){a._spansToImgs(t.getBody())}),t.selection.onBeforeSetContent.add(a._objectsToSpans,a),t.settings.content_css!==!1&&t.dom.loadCSS(n+"/css/content.css"),t.theme&&t.theme.onResolveName&&t.theme.onResolveName.add(function(n,o){"img"==o.name&&e(i,function(e,n){return t.dom.hasClass(o.node,n)?(o.name=e,o.title=t.dom.getAttrib(o.node,"title"),!1):void 0})}),t&&t.plugins.contextmenu&&t.plugins.contextmenu.onContextMenu.add(function(e,t,n){"IMG"==n.nodeName&&/mceItem(Flash|ShockWave|WindowsMedia|QuickTime|RealMedia)/.test(n.className)&&t.add({title:"media.edit",icon:"media",cmd:"mceMedia"})})}),t.onBeforeSetContent.add(a._objectsToSpans,a),t.onSetContent.add(function(){a._spansToImgs(t.getBody())}),t.onPreProcess.add(function(t,n){var o=t.dom;n.set&&(a._spansToImgs(n.node),e(o.select("IMG",n.node),function(e){var t;i(e)&&(t=a._parse(e.title),o.setAttrib(e,"width",o.getAttrib(e,"width",t.width||100)),o.setAttrib(e,"height",o.getAttrib(e,"height",t.height||100)))})),n.get&&e(o.select("IMG",n.node),function(e){var n,r,s;if(t.getParam("media_use_script"))return i(e)&&(e.className=e.className.replace(/mceItem/g,"mceTemp")),void 0;switch(e.className){case"mceItemFlash":n="d27cdb6e-ae6d-11cf-96b8-444553540000",r="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0",s="application/x-shockwave-flash";break;case"mceItemShockWave":n="166b1bca-3f9c-11cf-8075-444553540000",r="http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=8,5,1,0",s="application/x-director";break;case"mceItemWindowsMedia":n=t.getParam("media_wmp6_compatible")?"05589fa1-c356-11ce-bf01-00aa0055595a":"6bf52a52-394a-11d3-b153-00c04f79faa6",r="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701",s="application/x-mplayer2";break;case"mceItemQuickTime":n="02bf25d5-8c17-4b23-bc80-d3488abddc6b",r="http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0",s="video/quicktime";break;case"mceItemRealMedia":n="cfcdaa03-8be4-11cf-b84b-0020afbbccfa",r="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0",s="audio/x-pn-realaudio-plugin"}n&&o.replace(a._buildObj({classid:n,codebase:r,type:s},e),e)})}),t.onPostProcess.add(function(e,t){t.content=t.content.replace(/_mce_value=/g,"value=")}),t.onPostProcess.add(function(e,t){e.getParam("media_use_script")&&(t.content=t.content.replace(/<img[^>]+>/g,function(e){var t=o(e,"class");return/^(mceTempFlash|mceTempShockWave|mceTempWindowsMedia|mceTempQuickTime|mceTempRealMedia)$/.test(t)&&(at=a._parse(o(e,"title")),at.width=o(e,"width"),at.height=o(e,"height"),e='<script type="text/javascript">write'+t.substring(7)+"({"+a._serialize(at)+"});</script>"),e}))})},getInfo:function(){return{longname:"Media",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/media",version:tinymce.majorVersion+"."+tinymce.minorVersion}},_objectsToSpans:function(e,t){var n=this,i=t.content;i=i.replace(/<script[^>]*>\s*write(Flash|ShockWave|WindowsMedia|QuickTime|RealMedia)\(\{([^\)]*)\}\);\s*<\/script>/gi,function(t,i,o){var a=n._parse(o);return'<img class="mceItem'+i+'" title="'+e.dom.encode(o)+'" src="'+n.url+'/img/trans.gif" width="'+a.width+'" height="'+a.height+'" />'}),i=i.replace(/<object([^>]*)>/gi,'<span class="mceItemObject" $1>'),i=i.replace(/<embed([^>]*)\/?>/gi,'<span class="mceItemEmbed" $1></span>'),i=i.replace(/<embed([^>]*)>/gi,'<span class="mceItemEmbed" $1>'),i=i.replace(/<\/(object)([^>]*)>/gi,"</span>"),i=i.replace(/<\/embed>/gi,""),i=i.replace(/<param([^>]*)>/gi,function(e,t){return"<span "+t.replace(/value=/gi,"_mce_value=")+' class="mceItemParam"></span>'}),i=i.replace(/\/ class=\"mceItemParam\"><\/span>/gi,'class="mceItemParam"></span>'),t.content=i},_buildObj:function(t,n){var i,o,a=this.editor,r=a.dom,s=this._parse(n.title);return o=a.getParam("media_strict",!0)&&"application/x-shockwave-flash"==t.type,s.width=t.width=r.getAttrib(n,"width")||100,s.height=t.height=r.getAttrib(n,"height")||100,s.src&&(s.src=a.convertURL(s.src,"src",n)),i=o?r.create("span",{id:s.id,_mce_name:"object",type:"application/x-shockwave-flash",data:s.src,style:r.getAttrib(n,"style"),width:t.width,height:t.height}):r.create("span",{id:s.id,_mce_name:"object",classid:"clsid:"+t.classid,style:r.getAttrib(n,"style"),codebase:t.codebase,width:t.width,height:t.height}),e(s,function(e,n){/^(width|height|codebase|classid|id|_cx|_cy)$/.test(n)||("application/x-mplayer2"!=t.type||"src"!=n||s.url||(n="url"),e&&r.add(i,"span",{_mce_name:"param",name:n,_mce_value:e}))}),o||r.add(i,"span",tinymce.extend({_mce_name:"embed",type:t.type,style:r.getAttrib(n,"style")},s)),i},_spansToImgs:function(t){var n,i=this,o=i.editor.dom;e(o.select("span",t),function(e){if("mceItemObject"!=o.getAttrib(e,"class")){if("mceItemEmbed"==o.getAttrib(e,"class"))switch(o.getAttrib(e,"type")){case"application/x-shockwave-flash":o.replace(i._createImg("mceItemFlash",e),e);break;case"application/x-director":o.replace(i._createImg("mceItemShockWave",e),e);break;case"application/x-mplayer2":o.replace(i._createImg("mceItemWindowsMedia",e),e);break;case"video/quicktime":o.replace(i._createImg("mceItemQuickTime",e),e);break;case"audio/x-pn-realaudio-plugin":o.replace(i._createImg("mceItemRealMedia",e),e);break;default:o.replace(i._createImg("mceItemFlash",e),e)}}else switch(n=o.getAttrib(e,"classid").toLowerCase().replace(/\s+/g,"")){case"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000":o.replace(i._createImg("mceItemFlash",e),e);break;case"clsid:166b1bca-3f9c-11cf-8075-444553540000":o.replace(i._createImg("mceItemShockWave",e),e);break;case"clsid:6bf52a52-394a-11d3-b153-00c04f79faa6":case"clsid:22d6f312-b0f6-11d0-94ab-0080c74c7e95":case"clsid:05589fa1-c356-11ce-bf01-00aa0055595a":o.replace(i._createImg("mceItemWindowsMedia",e),e);break;case"clsid:02bf25d5-8c17-4b23-bc80-d3488abddc6b":o.replace(i._createImg("mceItemQuickTime",e),e);break;case"clsid:cfcdaa03-8be4-11cf-b84b-0020afbbccfa":o.replace(i._createImg("mceItemRealMedia",e),e);break;default:o.replace(i._createImg("mceItemFlash",e),e)}})},_createImg:function(t,n){var i,o,a=this.editor.dom,r={};return o=["id","name","width","height","bgcolor","align","flashvars","src","wmode","allowfullscreen","quality","data"],i=a.create("img",{src:this.url+"/img/trans.gif",width:a.getAttrib(n,"width")||100,height:a.getAttrib(n,"height")||100,style:a.getAttrib(n,"style"),"class":t}),e(o,function(e){var t=a.getAttrib(n,e);t&&(r[e]=t)}),e(a.select("span",n),function(e){a.hasClass(e,"mceItemParam")&&(r[a.getAttrib(e,"name")]=a.getAttrib(e,"_mce_value"))}),r.movie&&(r.src=r.movie,delete r.movie),r.src||(r.src=r.data,delete r.data),n=a.select(".mceItemEmbed",n)[0],n&&e(o,function(e){var t=a.getAttrib(n,e);t&&!r[e]&&(r[e]=t)}),delete r.width,delete r.height,i.title=this._serialize(r),i},_parse:function(e){return tinymce.util.JSON.parse("{"+e+"}")},_serialize:function(e){return tinymce.util.JSON.serialize(e).replace(/[{}]/g,"")}}),tinymce.PluginManager.add("media",tinymce.plugins.MediaPlugin)})();