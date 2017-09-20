using System;
using System.ComponentModel.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using System.ComponentModel;
using EPiServer.Filters;

namespace Bookshelf.Models.Blocks
{
    [ContentType(DisplayName = "BookPage Listing Block", 
        GUID = "fd82e0a4-142e-4967-934c-52fdcd725586",
        Description = "Uses as property in category pagetype", 
        AvailableInEditMode = false)]
    public class BookPageListBlock : BlockData
    {
        [Display(
            Name = "Heading",
            GroupName = SystemTabNames.Content,
            Order = 1)]
        public virtual string Heading { get; set; }

        [Display(
            Name = "Parent page",
            GroupName = SystemTabNames.Content,
            Order = 5)]
        public virtual PageReference Root { get; set; }
    }
}