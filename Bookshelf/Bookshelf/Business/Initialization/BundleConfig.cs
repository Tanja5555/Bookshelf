using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using System.Web.Optimization;

namespace Bookshelf.Business.Initialization
{
    [InitializableModule]
    [ModuleDependency(typeof(EPiServer.Web.InitializationModule))]
    public class BundleConfig : IInitializableModule
    {
        public void Initialize(InitializationEngine context)
        {
            if (context.HostType == HostType.WebApplication)
            {
                RegisterBundles(BundleTable.Bundles);
            }
        }


        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/js").Include(
                        "~/Static/js/jquery-1.9.1.js",
                        "~/Static/js/bootstrap.js"));

            bundles.Add(new StyleBundle("~/bundles/css")
                .Include("~/Static/css/bootstrap.css", new CssRewriteUrlTransform())
                //.Include("~/Static/css/bootstrap-theme.css", new CssRewriteUrlTransform())
                .Include("~/Static/css/MediaQuery.css", new CssRewriteUrlTransform())
                .Include("~/Static/css/Site.css", new CssRewriteUrlTransform()));


            //.Include("~/Templates/Editor.css"));
            //.Include("~/Content/bootstrap-theme.min.css")
            //.Include("~/Content/bootstrap.min.css"));
            //.Include("~/Static/css/media.css")
            //.Include("~/Static/css/editmode.css"));

            BundleTable.EnableOptimizations = true;
        }


        public void Uninitialize(InitializationEngine context)
        {
            //Add uninitialization logic
        }
    }
}