using System;
using System.ComponentModel.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.SpecializedProperties;
using EPiServer;
using EPiServer.Web;

namespace Bookshelf.Models.Pages
{
    [ContentType(GroupName = "Bookshelf Pages", DisplayName = "Start Page", GUID = "6c78adf3-0a45-4152-927b-60a1ea9b8204", Description = "Bookshelf's Start Page")]
    [ImageUrl("~/Resources/img/start-page.png")]
    public class StartPage : SitePageData
    {
        [Display(
           Name = "Main Content Area",
           Description = "Just drag and drop some content into this area.",
           Order = 10)]
        [CultureSpecific]
        public virtual ContentArea MainContentArea { get; set; }

        [CultureSpecific]
        [Display(
            Name = "Main body",
            Description = "The main body will be shown in the main content area of the page, using the XHTML-editor you can insert for example text, images and tables.",
            GroupName = SystemTabNames.Content,
            Order = 20)]
        public virtual XhtmlString MainBody { get; set; }
    }
}