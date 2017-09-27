using Bookshelf.Models.Pages;
using EPiServer;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.ServiceLocation;
using EPiServer.Web.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bookshelf.Business
{
    public class TagFactory
    {
        private static TagFactory _instance;

        public TagFactory()
        {
        }

        public static TagFactory Instance
        {
            get { return _instance ?? (_instance = new TagFactory()); }
        }

        public string GetTagUrl(PageData currentPage, Category cat)
        {

            var contentLocator = ServiceLocator.Current.GetInstance<IContentRepository>();

            var start = FindParentByPageType(currentPage, typeof(StandardPage), contentLocator);

            //var listingPage = contentLocator.GetChildren<ListingPage>(start.ContentLink);

            var urlResolver = ServiceLocator.Current.GetInstance<UrlResolver>();
            var pageUrl = urlResolver.GetUrl(start.ContentLink);

            var url = String.Format("{0}{1}", pageUrl, cat.Name);

            return url;
        }

        protected PageData FindParentByPageType(PageData pd, Type pagetype, IContentRepository contentLocator)
        {
            if (pd is StandardPage)
            {
                return pd;
            }
            return FindParentByPageType(contentLocator.Get<PageData>(pd.ParentLink), pagetype, contentLocator);

        }

    }
}