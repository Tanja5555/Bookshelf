using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EPiServer;
using EPiServer.Core;
using EPiServer.Web;
using EPiServer.Web.Mvc;
using Bookshelf.Models.Blocks;
using Bookshelf.Models.ViewModels;
using EPiServer.ServiceLocation;
using EPiServer.DataAbstraction;
using EPiServer.Web.Routing;
using Bookshelf.Models.Pages;
using Bookshelf.Business;
using EPiServer.Filters;
using System.Globalization;

namespace Bookshelf.Controllers
{
    public class PageListBlockController : BlockController<PageListBlock>
    {
        public override ActionResult Index(PageListBlock currentBlock)
        {
            var category = Request.RequestContext.GetCustomRouteData<Category>("category");
            //var category = Request.QueryString["cat"];

            if (category == null)
            {
                return null;
            };

            var pages = FindPages(currentBlock, category);
            pages = Sort(pages, currentBlock.SortOrder);

            if (currentBlock.Count > 0)
            {
                pages = pages.Take(currentBlock.Count);
            }


            var model = new PageListModel(currentBlock)
            {
                Pages = pages,
                Heading = category != null ? currentBlock.Heading + " " + category.Name : string.Empty

            };
            ViewData.GetEditHints<PageListModel, PageListBlock>()
              .AddConnection(x => x.Heading, x => x.Heading);

            return PartialView(model);
        }

        public ActionResult Preview(PageData currentPage, PageListModel bookModel)
        {
            var pd = (BookPage)currentPage;


            var model = new BookItemModel(pd)
            {
                Tags = GetTags(pd),
            };

            return PartialView("Preview", model);
        }

        public IEnumerable<BookItemModel.TagItem> GetTags(BookPage currentPage)
        {
            List<BookItemModel.TagItem> tags = new List<BookItemModel.TagItem>();
            var categoryRepository = ServiceLocator.Current.GetInstance<CategoryRepository>();

            foreach (var item in currentPage.Category)
            {
                Category cat = categoryRepository.Get(item);

                tags.Add(new BookItemModel.TagItem() { Title = cat.Name, Url = TagFactory.Instance.GetTagUrl(currentPage, cat) });
            }

            return tags;
        }

        private IEnumerable<PageData> FindPages(PageListBlock currentBlock, Category category)
        {
            var pageCriteriaQueryService = ServiceLocator.Current.GetInstance<IPageCriteriaQueryService>();
            var contentProviderManager = ServiceLocator.Current.GetInstance<IContentProviderManager>();
            var contentLoader = ServiceLocator.Current.GetInstance<IContentLoader>();

            var pageRouteHelper = ServiceLocator.Current.GetInstance<IPageRouteHelper>();
            PageData currentPage = pageRouteHelper.Page ?? contentLoader.Get<PageData>(ContentReference.StartPage);

            var listRoot = currentBlock.Root ?? currentPage.ContentLink.ToPageReference();

            IEnumerable<PageData> pages;
            
            
            if (currentBlock.Recursive)
            {
                if (currentBlock.PageTypeFilter != null)
                {
                    pages = FindPagesByPageType(listRoot, true, currentBlock.PageTypeFilter.ID);
                }
                else
                {
                    pages = GetAll<PageData>(listRoot);
                }
            }
            else
            {
                if (currentBlock.PageTypeFilter != null)
                {
                    pages = contentLoader.GetChildren<PageData>(listRoot)
                        .Where(p => p.PageTypeID == currentBlock.PageTypeFilter.ID);
                }
                else
                {
                    pages = contentLoader.GetChildren<PageData>(listRoot);
                }
            }

            if (currentBlock.CategoryFilter != null && currentBlock.CategoryFilter.Any())
            {
                pages = pages.Where(x => x.Category.Intersect(currentBlock.CategoryFilter).Any());
            }
            else if (category != null)
            {
                var catlist = new CategoryList();
                catlist.Add(category.ID);

                pages = pages.Where(x => x.Category.Intersect(catlist).Any());
            }

           
            pages = pages.Where(p => p.PageTypeName == typeof(BookPage).GetPageType().Name).ToList();
            return pages;
        }

    


        private IEnumerable<PageData> Sort(IEnumerable<PageData> pages, FilterSortOrder sortOrder)
        {
            var asCollection = new PageDataCollection(pages);
            var sortFilter = new FilterSort(sortOrder);
            sortFilter.Sort(asCollection);
            return asCollection;
        }

        public virtual IEnumerable<T> GetAll<T>(ContentReference rootLink)
           where T : PageData
        {
            var pageCriteriaQueryService = ServiceLocator.Current.GetInstance<IPageCriteriaQueryService>();
            var contentProviderManager = ServiceLocator.Current.GetInstance<IContentProviderManager>();
            var contentLoader = ServiceLocator.Current.GetInstance<IContentLoader>();
            if (rootLink != null)
            {
                var children = contentLoader.GetChildren<PageData>(rootLink);
                foreach (var child in children)
                {
                    var childOfRequestedTyped = child as T;
                    if (childOfRequestedTyped != null)
                    {
                        yield return childOfRequestedTyped;
                    }
                    foreach (var descendant in GetAll<T>(child.ContentLink))
                    {
                        yield return descendant;
                    }
                }
            }
                
            
        }

        /// <summary>
        /// Returns pages of a specific page type
        /// </summary>
        /// <param name="pageLink"></param>
        /// <param name="recursive"></param>
        /// <param name="pageTypeId">ID of the page type to filter by</param>
        /// <returns></returns>
        public IEnumerable<PageData> FindPagesByPageType(PageReference pageLink, bool recursive, int pageTypeId)
        {
            var pageCriteriaQueryService = ServiceLocator.Current.GetInstance<IPageCriteriaQueryService>();
            var contentProviderManager = ServiceLocator.Current.GetInstance<IContentProviderManager>();
            var contentLoader = ServiceLocator.Current.GetInstance<IContentLoader>();

            if (ContentReference.IsNullOrEmpty(pageLink))
            {
                throw new ArgumentNullException("pageLink", "No page link specified, unable to find pages");
            }

            var pages = recursive
                        ? FindPagesByPageTypeRecursively(pageLink, pageTypeId)
                        : contentLoader.GetChildren<PageData>(pageLink);

            return pages;
        }

        // Type specified through page type ID
        private IEnumerable<PageData> FindPagesByPageTypeRecursively(PageReference pageLink, int pageTypeId)
        {
            var pageCriteriaQueryService = ServiceLocator.Current.GetInstance<IPageCriteriaQueryService>();
            var contentProviderManager = ServiceLocator.Current.GetInstance<IContentProviderManager>();
            var contentLoader = ServiceLocator.Current.GetInstance<IContentLoader>();

            var criteria = new PropertyCriteriaCollection
                               {
                                    new PropertyCriteria
                                    {
                                        Name = "PageTypeID",
                                        Type = PropertyDataType.PageType,
                                        Condition = CompareCondition.Equal,
                                        Value = pageTypeId.ToString(CultureInfo.InvariantCulture)
                                    }
                               };

            // Include content providers serving content beneath the page link specified for the search
            if (contentProviderManager.ProviderMap.CustomProvidersExist)
            {
                var contentProvider = contentProviderManager.ProviderMap.GetProvider(pageLink);

                if (contentProvider.HasCapability(ContentProviderCapabilities.Search))
                {
                    criteria.Add(new PropertyCriteria
                    {
                        Name = "EPI:MultipleSearch",
                        Value = contentProvider.ProviderKey
                    });
                }
            }

            return pageCriteriaQueryService.FindPagesWithCriteria(pageLink, criteria);
        }
    }
}


//if (currentBlock.Root != null)
//{
//    model.Pages = contentLoader.GetChildren<PageData>(currentBlock.Root);
//}
//if (currentBlock.CategoryFilter != null && currentBlock.CategoryFilter.Any())
//{
//    model.Pages = model.Pages.Where(x => x.Category.Intersect(currentBlock.CategoryFilter).Any());
//}
//else
//    model.Pages = null;

//ViewData.GetEditHints<PageListModel, PageListBlock>()
//   .AddConnection(x => x.Heading, x => x.Heading);
