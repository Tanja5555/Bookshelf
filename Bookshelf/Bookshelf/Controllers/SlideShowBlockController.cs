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
using Bookshelf.Models.ViewModels;
using EPiServer.ServiceLocation;
using Bookshelf.Models.Media;

namespace Bookshelf.Controllers
{
    public class SlideShowBlockController : BlockController<SlideShowBlock>
    {
        public override ActionResult Index(SlideShowBlock currentBlock)
        {
            var model = new SlideShowViewModel();
            model.CurrentBlock = currentBlock;

            if(!ContentReference.IsNullOrEmpty(currentBlock.ImageFolder))
            {
                var contentLoader = ServiceLocator.Current.GetInstance<IContentLoader>();
                var images = contentLoader.GetChildren<ImageFile>(currentBlock.ImageFolder).ToList();
                model.Images = images;
            }

            return PartialView(model);
        }
    }
}
