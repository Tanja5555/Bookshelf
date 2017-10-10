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
    [ContentType(GroupName = "Bookshelf Pages", DisplayName = "StandardPage", GUID = "9649c00b-b412-4b39-b8b8-7b291ff18963", Description = "Page with side-navigation")]
    public class StandardPage : SitePageData
    {
        [Display(
            GroupName = SystemTabNames.Content,
            Order = 10)]
        public virtual ContentArea ContentAreaOne { get; set; }

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