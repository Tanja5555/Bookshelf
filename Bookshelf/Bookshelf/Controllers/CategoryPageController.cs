using System.Web.Mvc;
using EPiServer.Web.Mvc;
using Bookshelf.Models.Pages;
using Bookshelf.Models.ViewModels;

namespace Bookshelf.Controllers
{
    public class CategoryPageController : PageControllerBase<CategoryPage>
    {
        public ActionResult Index(CategoryPage currentPage)
        {
            PageViewModel<CategoryPage> model = new PageViewModel<CategoryPage>(currentPage);

            return View(model);
        }
    }
}