using System;
using System.ComponentModel.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.SpecializedProperties;

namespace Bookshelf.Models.Pages
{
    [ContentType(GroupName = "Bookshelf Pages", DisplayName = "Wishbook Page",  GUID = "bd8c554d-1305-4ed1-9954-15ff094f95d4", Description = "This is a page for the book you wish to read")]
    [ImageUrl("~/Resources/img/wishbook-page.png")]
    public class WishBookPage : SitePageData
    {

    }
}