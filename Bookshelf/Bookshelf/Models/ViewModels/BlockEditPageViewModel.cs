using Bookshelf.Models.Pages;
using EPiServer.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bookshelf.Models.ViewModels
{
    public class BlockEditPageViewModel : IPageViewModel<SitePageData>
    {
        public BlockEditPageViewModel(PageData page, IContent content)
        {
            previewBlock = new PreviewBlock(page, content);
            CurrentPage = page as SitePageData;
        }
        public PreviewBlock previewBlock { get; set; }
        public SitePageData CurrentPage { get; set; }

        public IContent Section
        {
            get
            {
                throw new NotImplementedException();
            }

            set
            {
                throw new NotImplementedException();
            }
        }
    }
}