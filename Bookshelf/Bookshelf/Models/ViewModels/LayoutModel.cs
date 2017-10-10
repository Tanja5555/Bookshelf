using EPiServer.SpecializedProperties;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bookshelf.Models.ViewModels
{
    public class LayoutModel
    {
        //public SiteLogotypeBlock Logotype { get; set; }
        public IHtmlString LogotypeLinkUrl { get; set; }
        public bool HideHeader { get; set; }
        public bool HideFooter { get; set; }
        public LinkItemCollection BookPages { get; set; }
        public LinkItemCollection AboutMePages { get; set; }
        public LinkItemCollection AuthorPages { get; set; }
        public LinkItemCollection PublishersPages { get; set; }
        public bool LoggedIn { get; set; }
        //public MvcHtmlString LoginUrl { get; set; }
        //public MvcHtmlString LogOutUrl { get; set; }
        //public MvcHtmlString SearchActionUrl { get; set; }

        public bool IsInReadonlyMode { get; set; }
    }
}