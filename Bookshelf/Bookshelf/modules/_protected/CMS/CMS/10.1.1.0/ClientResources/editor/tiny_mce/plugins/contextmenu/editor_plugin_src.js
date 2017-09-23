(function(){var e=tinymce.dom.Event,t=(tinymce.each,tinymce.DOM);tinymce.create("tinymce.plugins.ContextMenu",{init:function(t){function n(t,n){return a=0,n&&2==n.button?(a=n.ctrlKey,void 0):(s._menu&&(s._menu.removeAll(),s._menu.destroy(),e.remove(t.getDoc(),"click",r),s._menu=null),void 0)}var i,o,a,r,s=this;s.editor=t,o=t.settings.contextmenu_never_use_native,s.onContextMenu=new tinymce.util.Dispatcher(this),r=function(e){n(t,e)},i=t.onContextMenu.add(function(t,n){(0!==a?a:n.ctrlKey)&&!o||(e.cancel(n),"IMG"==n.target.nodeName&&t.selection.select(n.target),s._getMenu(t).showMenu(n.clientX||n.pageX,n.clientY||n.pageY),e.add(t.getDoc(),"click",r),t.nodeChanged())}),t.onRemove.add(function(){s._menu&&s._menu.removeAll()}),t.onMouseDown.add(n),t.onKeyDown.add(n),t.onKeyDown.add(function(t,n){!n.shiftKey||n.ctrlKey||n.altKey||121!==n.keyCode||(e.cancel(n),i(t,n))})},getInfo:function(){return{longname:"Contextmenu",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/contextmenu",version:tinymce.majorVersion+"."+tinymce.minorVersion}},_getMenu:function(e){var n,i,o=this,a=o._menu,r=e.selection,s=r.isCollapsed(),l=r.getNode()||e.getBody();return a&&(a.removeAll(),a.destroy()),i=t.getPos(e.getContentAreaContainer()),a=e.controlManager.createDropMenu("contextmenu",{offset_x:i.x+e.getParam("contextmenu_offset_x",0),offset_y:i.y+e.getParam("contextmenu_offset_y",0),constrain:1,keyboard_focus:!0}),o._menu=a,a.add({title:"advanced.cut_desc",icon:"cut",cmd:"Cut"}).setDisabled(s),a.add({title:"advanced.copy_desc",icon:"copy",cmd:"Copy"}).setDisabled(s),a.add({title:"advanced.paste_desc",icon:"paste",cmd:"Paste"}),("A"==l.nodeName&&!e.dom.getAttrib(l,"name")||!s)&&(a.addSeparator(),a.add({title:"advanced.link_desc",icon:"link",cmd:e.plugins.advlink?"mceAdvLink":"mceLink",ui:!0}),a.add({title:"advanced.unlink_desc",icon:"unlink",cmd:"UnLink"})),a.addSeparator(),a.add({title:"advanced.image_desc",icon:"image",cmd:e.plugins.advimage?"mceAdvImage":"mceImage",ui:!0}),a.addSeparator(),n=a.addMenu({title:"contextmenu.align"}),n.add({title:"contextmenu.left",icon:"justifyleft",cmd:"JustifyLeft"}),n.add({title:"contextmenu.center",icon:"justifycenter",cmd:"JustifyCenter"}),n.add({title:"contextmenu.right",icon:"justifyright",cmd:"JustifyRight"}),n.add({title:"contextmenu.full",icon:"justifyfull",cmd:"JustifyFull"}),o.onContextMenu.dispatch(o,a,l,s),a}}),tinymce.PluginManager.add("contextmenu",tinymce.plugins.ContextMenu)})();