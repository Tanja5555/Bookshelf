//>>built
define("epi-cms/core/PermanentLinkHelper",["dojo/_base/declare","dojo/Deferred","dojo/_base/lang","dojo/when","epi/dependency"],function(_1,_2,_3,_4,_5){return {getContent:function(_6,_7){if(!_6){return null;}var _8=_5.resolve("epi.storeregistry"),_9=_8.get("epi.cms.content.light"),_a=_3.mixin({query:"getcontentbypermanentlink",permanentLink:_6},_7||{});return _4(_9.query(_a)).then(_3.hitch(this,function(_b){return _b&&_b instanceof Array?_b[0]:_b;}));}};});