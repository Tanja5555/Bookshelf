using Bookshelf.Models.Pages;
using EPiServer.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bookshelf.Models.ViewModels
{
    public class BookItemModel : PageViewModel<BookPage>
    {
        public BookItemModel(BookPage currentPage)
            : base(currentPage)
        { }

        public IEnumerable<TagItem> Tags { get; set; }

        public CategoryList Category { get; set; }

        public class TagItem
        {
            public string Title { get; set; }
            public string Url { get; set; }
        }
    }
}