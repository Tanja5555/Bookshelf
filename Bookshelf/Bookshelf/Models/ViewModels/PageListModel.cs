using Bookshelf.Models.Blocks;
using EPiServer.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bookshelf.Models.ViewModels
{
    public class PageListModel
    {
        public PageListModel(PageListBlock block)
        {
            Heading = block.Heading;
        }

        public string Heading { get; set; }
        public IEnumerable<PageData> Pages { get; set; }
    }
}