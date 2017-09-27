var Validator={isEmail:function(e){return this.test(e,"^[-!#$%&'*+\\./0-9=?A-Z^_`a-z{|}~]+@[-!#$%&'*+\\/0-9=?A-Z^_`a-z{|}~]+.[-!#$%&'*+\\./0-9=?A-Z^_`a-z{|}~]+$")},isAbsUrl:function(e){return this.test(e,"^(news|telnet|nttp|file|http|ftp|https)://[-A-Za-z0-9\\.]+\\/?.*$")},isSize:function(e){return this.test(e,"^[0-9]+(%|in|cm|mm|em|ex|pt|pc|px)?$")},isId:function(e){return this.test(e,"^[A-Za-z_]([A-Za-z0-9_])*$")},isEmpty:function(e){var t,n;if("SELECT"==e.nodeName&&1>e.selectedIndex)return!0;if("checkbox"==e.type&&!e.checked)return!0;if("radio"==e.type){for(n=0,t=e.form.elements;t.length>n;n++)if("radio"==t[n].type&&t[n].name==e.name&&t[n].checked)return!1;return!0}return RegExp("^\\s*$").test(1==e.nodeType?e.value:e)},isNumber:function(e,t){return!(isNaN(1==e.nodeType?e.value:e)||t&&this.test(e,"^-?[0-9]*\\.[0-9]*$"))},test:function(e,t){return e=1==e.nodeType?e.value:e,""==e||RegExp(t).test(e)}},AutoValidator={settings:{id_cls:"id",int_cls:"int",url_cls:"url",number_cls:"number",email_cls:"email",size_cls:"size",required_cls:"required",invalid_cls:"invalid",min_cls:"min",max_cls:"max"},init:function(e){var t;for(t in e)this.settings[t]=e[t]},validate:function(e){var t,n,o=this.settings,i=0;for(n=this.tags(e,"label"),t=0;n.length>t;t++)this.removeClass(n[t],o.invalid_cls);return i+=this.validateElms(e,"input"),i+=this.validateElms(e,"select"),i+=this.validateElms(e,"textarea"),3==i},invalidate:function(e){this.mark(e.form,e)},reset:function(e){var t,n,o,i=["label","input","select","textarea"],a=this.settings;if(null!=e)for(t=0;i.length>t;t++)for(o=this.tags(e.form?e.form:e,i[t]),n=0;o.length>n;n++)this.removeClass(o[n],a.invalid_cls)},validateElms:function(e,t){var n,o,i,a,r=this.settings,s=!0,l=Validator;for(n=this.tags(e,t),o=0;n.length>o;o++)i=n[o],this.removeClass(i,r.invalid_cls),this.hasClass(i,r.required_cls)&&l.isEmpty(i)&&(s=this.mark(e,i)),this.hasClass(i,r.number_cls)&&!l.isNumber(i)&&(s=this.mark(e,i)),this.hasClass(i,r.int_cls)&&!l.isNumber(i,!0)&&(s=this.mark(e,i)),this.hasClass(i,r.url_cls)&&!l.isAbsUrl(i)&&(s=this.mark(e,i)),this.hasClass(i,r.email_cls)&&!l.isEmail(i)&&(s=this.mark(e,i)),this.hasClass(i,r.size_cls)&&!l.isSize(i)&&(s=this.mark(e,i)),this.hasClass(i,r.id_cls)&&!l.isId(i)&&(s=this.mark(e,i)),this.hasClass(i,r.min_cls,!0)&&(a=this.getNum(i,r.min_cls),(isNaN(a)||parseInt(i.value)<parseInt(a))&&(s=this.mark(e,i))),this.hasClass(i,r.max_cls,!0)&&(a=this.getNum(i,r.max_cls),(isNaN(a)||parseInt(i.value)>parseInt(a))&&(s=this.mark(e,i)));return s},hasClass:function(e,t,n){return RegExp("\\b"+t+(n?"[0-9]+":"")+"\\b","g").test(e.className)},getNum:function(e,t){return t=e.className.match(RegExp("\\b"+t+"([0-9]+)\\b","g"))[0],t=t.replace(/[^0-9]/g,"")},addClass:function(e,t,n){var o=this.removeClass(e,t);e.className=n?t+(""!=o?" "+o:""):(""!=o?o+" ":"")+t},removeClass:function(e,t){return t=e.className.replace(RegExp("(^|\\s+)"+t+"(\\s+|$)")," "),e.className=" "!=t?t:""},tags:function(e,t){return e.getElementsByTagName(t)},mark:function(e,t){var n=this.settings;return this.addClass(t,n.invalid_cls),this.markLabels(e,t,n.invalid_cls),!1},markLabels:function(e,t,n){var o,i;for(o=this.tags(e,"label"),i=0;o.length>i;i++)(o[i].getAttribute("for")==t.id||o[i].htmlFor==t.id)&&this.addClass(o[i],n);return null}};