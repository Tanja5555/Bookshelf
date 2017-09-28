using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using EPiServer;
using EPiServer.Core;
using EPiServer.Framework.DataAnnotations;
using EPiServer.Web.Mvc;
using Bookshelf.Models.Pages;
using Bookshelf.Models.ViewModels;

namespace Bookshelf.Controllers
{
    public class ListingPageController : PageController<ListingPage>
    {
        public ActionResult Index(ListingPage currentPage)
        {
            var model = new PageViewModel<ListingPage>(currentPage);
            return View(model);
        }
    }
}