using System;
using System.ComponentModel.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.SpecializedProperties;
using Bookshelf.Models.Blocks;
using EPiServer.ServiceLocation;
using EPiServer.Framework.Localization;
using EPiServer.Filters;
using Bookshelf.Business;

namespace Bookshelf.Models.Pages
{
    
    [ContentType(GroupName = "Bookshelf Pages", DisplayName = "Category Page", GUID = "3c6e79fa-583d-4b88-ab39-6da33bc472b9", Description = "This is a page for a category")]
    [ImageUrl("~/Resources/img/cathegory-page.png")]
    [AvailableContentTypes(
        Availability.Specific,
        Include = new[] { typeof(BookPage) })] // Pages we can create under the category page...
    public class CategoryPage : SitePageData
    {
        [Display(
          Name = "List of books for specific category",
          Description = "Uses only here",
          GroupName = SystemTabNames.Content,
          Order = 10)]
        public virtual BookPageListBlock BookList { get; set; }


        [Display
            (Name = "Related Content Area",
             GroupName = SystemTabNames.Content,
            Order = 20)]
        public virtual ContentArea RelatedContentArea { get; set; }

        [Display
            (Name = "Main Content Area",
             GroupName = SystemTabNames.Content,
            Order = 20)]
        public virtual ContentArea MainContentArea { get; set; }
    }
}