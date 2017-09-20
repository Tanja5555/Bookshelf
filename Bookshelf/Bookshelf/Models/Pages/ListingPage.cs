using System;
using System.ComponentModel.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.SpecializedProperties;
using Bookshelf.Models.Blocks;
using Bookshelf.Business;

namespace Bookshelf.Models.Pages
{
    [ContentType(DisplayName = "ListingPage", GUID = "2ab40278-7f31-4bdb-8d40-e0833466bad6", Description = "")]
    public class ListingPage : SitePageData
    {
        [Display(
         Name = "Listing block",
         Description = "A listing of pages",
         GroupName = SystemTabNames.Content,
         Order = 10)]
        public virtual PageListBlock List { get; set; }

        /// <summary>
        /// Sets the default property values on the content data.
        /// </summary>
        /// <param name="contentType">Type of the content.</param>
        public override void SetDefaultValues(ContentType contentType)
        {
            base.SetDefaultValues(contentType);

            List.PageTypeFilter = typeof(BookPage).GetPageType();
            List.Recursive = true;
        }
    }
}