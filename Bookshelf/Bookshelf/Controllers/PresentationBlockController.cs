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

namespace Bookshelf.Controllers
{
    public class PresentationBlockController : BlockController<PresentationBlock>
    {
        public override ActionResult Index(PresentationBlock currentBlock)
        {
            return PartialView(currentBlock);
        }
    }
}
