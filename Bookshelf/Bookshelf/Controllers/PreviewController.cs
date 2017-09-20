using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using EPiServer;
using EPiServer.Core;
using EPiServer.Framework.DataAnnotations;
using EPiServer.Web.Mvc;
using EPiServer.Framework.Web;
using EPiServer.Web;
using EPiServer.ServiceLocation;
using Bookshelf.Models.ViewModels;

namespace Bookshelf.Controllers
{
    [TemplateDescriptor(Inherited = true,
       TemplateTypeCategory = TemplateTypeCategories.MvcController,
       Tags = new[] { RenderingTags.Preview, RenderingTags.Edit },
       AvailableWithoutTag = false)]
    public class PreviewController : ActionControllerBase, IRenderTemplate<BlockData>
    {
        //
        // GET: /Preview/

        public ActionResult Index(IContent currentContent)
        {
            var contentRepository = ServiceLocator.Current.GetInstance<IContentRepository>();
            var startPage = contentRepository.Get<PageData>(ContentReference.StartPage);
            var model = new BlockEditPageViewModel(startPage, currentContent);

            return View(model);
        }

    }
}