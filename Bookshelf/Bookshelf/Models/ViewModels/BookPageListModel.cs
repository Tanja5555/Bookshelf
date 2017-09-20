using Bookshelf.Models.Blocks;
using Bookshelf.Models.Pages;
using EPiServer.Core;
using System.Collections.Generic;

namespace Bookshelf.Models.ViewModels
{
    public class BookPageListModel
    {
        public IEnumerable<BookPage> Pages { get; set; }
    }
}