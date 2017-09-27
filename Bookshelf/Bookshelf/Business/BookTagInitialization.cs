using System;
using System.Linq;
using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using EPiServer.Core;
using EPiServer.ServiceLocation;
using Bookshelf.Models.Pages;
using System.Web.Routing;
using EPiServer.Web.Routing;
using EPiServer.DataAbstraction;
using EPiServer;

namespace Bookshelf.Business
{
    [InitializableModule]
    [ModuleDependency(typeof(EPiServer.Web.InitializationModule))]
    public class BookTagInitialization : IInitializableModule
    {
        public void Initialize(InitializationEngine context)
        {
            IContentEvents events = ServiceLocator.Current.GetInstance<IContentEvents>();

            events.CreatingContent += CreatingContent;

            var partialRouter = new BookPartialRouter();

            RouteTable.Routes.RegisterPartialRouter<StandardPage, Category>(partialRouter);
        }

        private void CreatingContent(object sender, ContentEventArgs e)
        {
            if (this.IsImport() || e.Content == null || !(e.Content is PageData))
            {
                return;
            }

            var page = e.Content as PageData;

            if (string.Equals(page.PageTypeName, typeof(BookPage).GetPageType().Name, StringComparison.OrdinalIgnoreCase))
            {
                DateTime startPublish = page.StartPublish.Value;

                var contentRepository = ServiceLocator.Current.GetInstance<IContentRepository>();

                PageData parentPage = contentRepository.Get<PageData>(page.ParentLink);

                //if (parentPage is StandardPage)
                //{
                //    page.ParentLink = GetDatePageRef(parentPage, startPublish, contentRepository);
                //}
            }
        }

        void Instance_PublishingPage(object sender, PageEventArgs e)
        {

        }

        void Instance_CreatedPage(object sender, PageEventArgs e)
        {

        }

        //Returns if we are doing an import or mirroring
        public bool IsImport()
        {
            return false;
            // TODO implementation return Context.Current["CurrentITransferContext"] != null;
        }


        public void Preload(string[] parameters) { }

        public void Uninitialize(InitializationEngine context)
        {
            IContentEvents events = ServiceLocator.Current.GetInstance<IContentEvents>();

            events.CreatingContent -= CreatingContent;

        }
    }
}