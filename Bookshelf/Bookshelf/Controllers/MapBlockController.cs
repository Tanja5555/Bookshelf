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
    public class MapBlockController : BlockController<MapBlock>
    {
        public override ActionResult Index(MapBlock currentBlock)
        {
            return PartialView(currentBlock);
        }
    }
}
