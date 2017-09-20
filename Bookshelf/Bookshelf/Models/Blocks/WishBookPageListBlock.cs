using System;
using System.ComponentModel.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using System.ComponentModel;
using EPiServer.Filters;

namespace Bookshelf.Models.Blocks
{
    [ContentType(DisplayName = "WishBookPage Listing Block", 
        GUID = "539d10ab-8019-4ca3-af07-c2b3df712843", 
        Description = "", 
        AvailableInEditMode = false)]
    public class WishBookPageListBlock : BlockData
    {
        [Display(
           GroupName = SystemTabNames.Content,
           Order = 1)]
        [CultureSpecific]
        public virtual string Heading { get; set; }


        [Display(
            GroupName = SystemTabNames.Content,
            Order = 5)]
        public virtual PageReference Root { get; set; }
    }
}