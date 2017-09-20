using System;
using System.ComponentModel.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.SpecializedProperties;
using Bookshelf.Models.Blocks;
using EPiServer.Framework.Localization;
using EPiServer.Filters;
using Bookshelf.Business;
using EPiServer.ServiceLocation;

namespace Bookshelf.Models.Pages
{
    [ContentType(GroupName = "Bookshelf Pages", DisplayName = "WishBook Listpage", GUID = "2ee719ca-7f4b-4d50-a74c-b9447bc9dfea", Description = "")]
    public class WishBookListPage : SitePageData
    {
        [Display(
            GroupName = SystemTabNames.Content,
            Order = 305)]
        public virtual WishBookPageListBlock WishBookList { get; set; }
    }
}