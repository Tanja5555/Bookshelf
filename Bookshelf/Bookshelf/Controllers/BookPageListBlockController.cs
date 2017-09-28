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
using EPiServer.ServiceLocation;
using Bookshelf.Models.ViewModels;
using Bookshelf.Models.Pages;
using Bookshelf.Business;
using EPiServer.Filters;

namespace Bookshelf.Controllers
{
    public class BookPageListBlockController : BlockController<BookPageListBlock>
    {
       
        public override ActionResult Index(BookPageListBlock currentBlock)
        {

            var contentRepository = ServiceLocator.Current.GetInstance<IContentRepository>();
            var model = new BookPageListModel();

            if (currentBlock.Root != null)
            {
                model.Pages = contentRepository.GetChildren<BookPage>(currentBlock.Root);
            }
            else
                model.Pages = null;

            return PartialView(model);
        }

    }
}
