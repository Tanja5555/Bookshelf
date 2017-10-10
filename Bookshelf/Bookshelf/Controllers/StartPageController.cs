using System.Web.Mvc;
using EPiServer.Web.Mvc;
using EPiServer.Web;
using Bookshelf.Models.Pages;
using Bookshelf.Models.ViewModels;

namespace Bookshelf.Controllers
{
    public class StartPageController : PageControllerBase<StartPage>
    {
        public ActionResult Index(StartPage currentPage)
        {
            var model = PageViewModel.Create(currentPage);

            if (SiteDefinition.Current.StartPage.CompareToIgnoreWorkID(currentPage.ContentLink)) // Check if it is the StartPage or just a page of the StartPage type.
            {
                //Connect the view models logotype property to the start page's to make it editable
                var editHints = ViewData.GetEditHints<PageViewModel<StartPage>, StartPage>();
                //editHints.AddConnection(m => m.Layout.Logotype, p => p.SiteLogotype);
                editHints.AddConnection(m => m.Layout.BookPages, p => p.BookPageLinks);
                editHints.AddConnection(m => m.Layout.AboutMePages, p => p.AboutMePageLinks);
                editHints.AddConnection(m => m.Layout.PublishersPages, p => p.PublishersPageLinks);
                editHints.AddConnection(m => m.Layout.AuthorPages, p => p.AuthorsPageLinks);
            }

            return View(model);
        }
    }
}

