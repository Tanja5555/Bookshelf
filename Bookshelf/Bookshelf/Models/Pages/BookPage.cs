using System;
using System.ComponentModel.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.SpecializedProperties;
using EPiServer.Web;
using EPiServer;

namespace Bookshelf.Models.Pages
{
    [ContentType(GroupName = "Bookshelf Pages", DisplayName = "Book Page", GUID = "2773bed9-04b2-4373-bfa1-2a59fba34b40", Description = "This is a page for a book")]
    [ImageUrl("~/Resources/img/book-page.png")]
    
    public class BookPage : SitePageData
    {

        [Display(
        Name = "Subtitle",
        Description = "",
        GroupName = SystemTabNames.Content,
        Order = 10)]
        public virtual string SubTitle { get; set; }

        [Display(
         Name = "Author",
         Description = "",
         GroupName = SystemTabNames.Content,
         Order = 30)]
        public virtual string Author { get; set; }

        [Display(
         Name = "Publisher",
         Description = "",
         GroupName = SystemTabNames.Content,
         Order = 40)]
        public virtual string Publisher { get; set; }

       
        [Display(
          Name = "Links to find the book",
          Description = "",
          GroupName = SystemTabNames.Content,
          Order = 50)]
        public virtual LinkItemCollection BookLinks { get; set; }


        [Display(
           Name = "Short Description",
           Description = "",
           GroupName = SystemTabNames.Content,
           Order = 70)]
        public virtual XhtmlString ShortDescription { get; set; }

        [Display(
            Name = "Description",
            Description = "",
            GroupName = SystemTabNames.Content,
            Order = 80)]
        public virtual XhtmlString Description { get; set; }
    }
}