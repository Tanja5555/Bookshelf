(function(e){e.create("tinymce.plugins.EPiTrailing",{init:function(e){var t=this;e.onSetContent.add(function(e){t._insertTrailingElement(e)}),e.onChange.add(function(e){t._insertTrailingElement(e)}),e.onPreProcess.add(function(e,n){t._trimEmptyElements(e,n)})},getInfo:function(){return{longname:"Trailing element",author:"EPiServer AB",authorurl:"http://www.episerver.com",infourl:"http://www.episerver.com",version:1}},_insertTrailingElement:function(e){var t=e.getBody(),n=t&&t.lastChild;t&&n&&e.dom.isBlock(n)&&"P"!==n.tagName&&t.appendChild(e.dom.create("p",null,'<br _mce_bogus="1" />'))},_trimEmptyElements:function(e,t){if(t.get&&1!==t.node.childNodes.length){for(var n=t.node.lastChild;n&&"P"===n.nodeName&&1==n.childNodes.length&&"BR"==n.firstChild.nodeName;)e.dom.remove(n),n=t.node.lastChild;for(var i=t.node.firstChild;i&&"P"===i.nodeName&&1==i.childNodes.length&&"BR"==i.firstChild.nodeName;)e.dom.remove(i),i=t.node.firstChild}}}),e.PluginManager.add("epitrailing",e.plugins.EPiTrailing)})(tinymce,epiJQuery);