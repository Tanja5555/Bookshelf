using System;
using System.Linq;
using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using System.Web.Mvc;

namespace Bookshelf.Business.Initialization
{
    [InitializableModule]
    [ModuleDependency(typeof(EPiServer.Web.InitializationModule))]
    public class DisplayRegistryInitialization : IInitializableModule
    {
        public void Initialize(InitializationEngine context)
        {
            if (context.HostType == HostType.WebApplication)
            {
                // Register Display Options
                var options = ServiceLocator.Current.GetInstance<DisplayOptions>();
                options
                    .Add("full", "/displayoptions/full", Global.ContentAreaTags.FullWidth, ""/*, "epi-icon__layout--full"*/)
                    .Add("half", "/displayoptions/half", Global.ContentAreaTags.HalfWidth, "")
                    .Add("onethird", "/displayoptions/onethird", Global.ContentAreaTags.OneThirdWidth, "")
                    .Add("twothirds", "/displayoptions/twothirds", Global.ContentAreaTags.TwoThirdsWidth, "")
                    .Add("onequarter", "/displayoptions/onequarter", Global.ContentAreaTags.OneQuarterWidth, "")
                    .Add("threequarters", "/displayoptions/threequarters", Global.ContentAreaTags.ThreeQuartersWidth, "");
                    
                AreaRegistration.RegisterAllAreas();

            }
        }

        public void Preload(string[] parameters) { }

        public void Uninitialize(InitializationEngine context)
        {
            //Add uninitialization logic
        }
    }
}