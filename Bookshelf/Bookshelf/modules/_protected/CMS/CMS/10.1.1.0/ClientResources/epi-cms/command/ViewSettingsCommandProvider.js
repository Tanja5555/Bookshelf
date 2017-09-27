//>>built
define("epi-cms/command/ViewSettingsCommandProvider",["dojo/_base/declare","epi/dependency","epi-cms/command/TogglePreviewMode","epi-cms/command/ToggleViewSettings","epi-cms/visitorgroups/command/VisitorGroupViewSettingsCommand","epi-cms/project/ProjectPreviewButton","epi-cms/contentediting/command/LanguageSelection","epi-cms/contentediting/viewmodel/LanguageSettingsModel","./DeviceSelection","epi-cms/component/command/_GlobalToolbarCommandProvider","epi/i18n!epi/cms/nls/episerver.cms.contentediting.toolbar.buttons.togglepreviewmode"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b){return _1([_a],{postscript:function(){this.inherited(arguments);var _c={category:"view"};this.projectService=this.projectService||_2.resolve("epi.cms.ProjectService");var _d=new _8();this.add("commands",new _4({settings:_c,category:_c.category}));this.add("commands",new _7({category:_c.category,showLabel:true,settings:_c,optionsProperty:"availableLanguages",property:"selectedLanguage",model:_d}));this.add("commands",new _5({category:_c.category,settings:_c}));this.add("commands",new _9({settings:_c,category:_c.category}));if(!this.projectService.isProjectModeEnabled){this.add("commands",{settings:_c,category:_c.category,widget:new _6({showLabel:false})});}this.add("commands",new _3({settings:_c,category:_c.category,innerText:_b.message}));}});});