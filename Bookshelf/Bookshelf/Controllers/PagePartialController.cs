using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Bookshelf.Models.Pages;
using EPiServer.Web.Mvc;
using EPiServer.Framework.DataAnnotations;

namespace Bookshelf.Controllers
{
    [TemplateDescriptor(Inherited = true)]
    public class PagePartialController : PartialContentController<SitePageData>
    {
        // GET: PagePartial
        public override ActionResult Index(SitePageData currentContent)
        {
            return PartialView("/Views/Shared/PagePartials/PagePartial.cshtml", currentContent);
        }
    }
}