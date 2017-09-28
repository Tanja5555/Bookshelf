using Bookshelf.Models.Blocks;
using Bookshelf.Models.Pages;
using EPiServer.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bookshelf.Models.ViewModels
{
    public class WishBookPageListModel
    {
        public WishBookPageListModel(WishBookPageListBlock block)
        {
            Heading = block.Heading;  
        }

        public string Heading { get; set; }
        public IEnumerable<WishBookPage> Pages { get; set; }  
    }
}