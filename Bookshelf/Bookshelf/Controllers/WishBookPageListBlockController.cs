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
using Bookshelf.Business;
using EPiServer.Filters;
using Bookshelf.Models.ViewModels;
using EPiServer.ServiceLocation;
using Bookshelf.Models.Pages;

namespace Bookshelf.Controllers
{
    public class WishBookPageListBlockController : BlockController<WishBookPageListBlock>
    {
        public override ActionResult Index(WishBookPageListBlock currentBlock)
        {
            var contentRepository = ServiceLocator.Current.GetInstance<IContentLoader>();
            var model = new WishBookPageListModel(currentBlock);

            if (currentBlock.Root != null)
            {
                model.Pages = contentRepository.GetChildren<WishBookPage>(currentBlock.Root);
            }
            else
            {
                model.Pages = null;
            }
                
            ViewData.GetEditHints<WishBookPageListModel, WishBookPageListBlock>()
               .AddConnection(x => x.Heading, x => x.Heading);

            return PartialView(model);
        }
    }
}
