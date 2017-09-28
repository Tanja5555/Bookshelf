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
    public class SearchPageController : PageControllerBase<SearchPage>
    {
        public ActionResult Index(SearchPage currentPage, string q)
        {
            var model = new SearchPageViewModel(currentPage);

            if (!string.IsNullOrEmpty(q))
            {
                model.SearchText = q;
                model.Search(q);
            }

            return View(model);
        }
    }
}