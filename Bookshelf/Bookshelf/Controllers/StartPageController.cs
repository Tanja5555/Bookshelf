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
            PageViewModel<StartPage> model = new PageViewModel<StartPage>(currentPage);

            return View(model);
        }
    }
}

