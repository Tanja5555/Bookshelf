using System.Web.Mvc;
using EPiServer.Web.Mvc;
using Bookshelf.Models.Pages;
using System.Web.Security;
using Bookshelf.Models.ViewModels;
using Bookshelf.Business;

namespace Bookshelf.Controllers
{
    public abstract class PageControllerBase<T> : PageController<T> where T : SitePageData
    {
       public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction ("Index");
        }
       
    }
}