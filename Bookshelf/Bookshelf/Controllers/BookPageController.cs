using System.Web.Mvc;
using Bookshelf.Models.Pages;
using Bookshelf.Models.ViewModels;
using EPiServer.Web.Mvc;
using EPiServer.Core;
using System.Collections.Generic;
using EPiServer.DataAbstraction;
using Bookshelf.Business;
using EPiServer.ServiceLocation;

namespace Bookshelf.Controllers
{
    public class BookPageController : PageControllerBase<BookPage>
    {
        public ActionResult Index(BookPage currentPage)
        {
            PageViewModel<BookPage> model = new PageViewModel<BookPage>(currentPage);
            var editHints = ViewData.GetEditHints<PageViewModel<BookPage>, BookPage>();
            editHints.AddConnection(m => m.CurrentPage.Category, p => p.Category);
            return View(model);
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

        public ActionResult Full(BookPage currentPage)
        {

            var model = new BookItemModel(currentPage)
            {
                Category = currentPage.Category,
                Tags = GetTags(currentPage)
               
            };

            var editHints = ViewData.GetEditHints<BookItemModel, BookPage>();
            editHints.AddConnection(m => m.Category, p => p.Category);
            editHints.AddFullRefreshFor(p => p.Category);
            editHints.AddFullRefreshFor(p => p.StartPublish);

            return PartialView("Full", model);
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

    }
}