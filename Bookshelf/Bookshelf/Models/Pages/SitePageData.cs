using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.Web;
using System.ComponentModel.DataAnnotations;

namespace Bookshelf.Models.Pages
{
    public abstract class SitePageData : PageData
    {
        [CultureSpecific]
        [Display(
         GroupName = "SEO",
         Order = 100)]
        public virtual string MetaTitle { get; set; }

        [CultureSpecific]
        [Display(
          GroupName = "SEO",
          Order = 200)]
        public virtual string MetaKeywords { get; set; }

        [CultureSpecific]
        [Display(
          GroupName = "SEO",
          Order = 300)]
        [UIHint(UIHint.Textarea)]
        public virtual string MetaDescription { get; set; }

        [Display(
            GroupName = SystemTabNames.Content,
            Order = 100)]
        [UIHint(UIHint.Image)]
        public virtual ContentReference PageImage { get; set; }

        //[CultureSpecific]
        //[ScaffoldColumn(false)]
        //[Searchable]
        ////[AdditionalSearchContent]
        //public virtual string SearchText { get; set; }

        //[Display(
        //    GroupName = SystemTabNames.Content,
        //    Order = 310)]
        //[CultureSpecific]    
        //public virtual ContentArea RelatedContentArea { get; set; }

    }
}