using System;
using System.ComponentModel.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.SpecializedProperties;

namespace Bookshelf.Models.Pages
{
    [ContentType(GroupName = "Bookshelf Pages", DisplayName = "Author Page", GUID = "594c54c9-a9c4-496b-8618-8a39ee794880", Description = "This is a page for an author")]
    [ImageUrl("~/Resources/img/author-page.png")]
    public class AuthorPage : SitePageData
    {

        [CultureSpecific]
        [Display(
            Name = "Main body",
            Description = "The main body will be shown in the main content area of the page, using the XHTML-editor you can insert for example text, images and tables.",
            GroupName = SystemTabNames.Content,
            Order = 1)]
        public virtual XhtmlString MainBody { get; set; }

    }
}