using System;
using System.ComponentModel.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.SpecializedProperties;

namespace Bookshelf.Models.Pages
{
    public class PreviewBlock : PageData
    {
        public IContent PreviewContent { get; set; }
        public ContentArea ContentArea { get; set; }

        public PreviewBlock(PageData currentPage, IContent previewContent)
            : base(currentPage)
        {
            this.PreviewContent = previewContent;
            this.ContentArea = new ContentArea();
            this.ContentArea.Items.Add(new ContentAreaItem
            {
                ContentLink = this.PreviewContent.ContentLink
            });
        }
    }
}