using System;
using System.ComponentModel.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using System.ComponentModel;
using EPiServer.Filters;

namespace Bookshelf.Models.Blocks
{
    [ContentType(DisplayName = "PageListBlock",
        GUID = "1a437229-682c-40f7-a59c-63880a134188",
        Description = "Create a listing and place it whereever you want",
        AvailableInEditMode = false)]
    public class PageListBlock : BlockData
    {
        [Display(
           GroupName = SystemTabNames.Content,
           Order = 1)]
        [CultureSpecific]
        public virtual string Heading { get; set; }

        [Display(
           GroupName = SystemTabNames.Content,
           Order = 4)]
        [DefaultValue(3)]
        public virtual int Count { get; set; }

        [Display(
           GroupName = SystemTabNames.Content,
           Order = 4, Name = "Sort Order")]
        [DefaultValue(FilterSortOrder.PublishedDescending)]
        [UIHint("SortOrder")]
        [BackingType(typeof(PropertyNumber))]
        public virtual FilterSortOrder SortOrder { get; set; }


        [Display(
            GroupName = SystemTabNames.Content,
            Order = 5)]
        public virtual PageReference Root { get; set; }

        [Display(
           GroupName = SystemTabNames.Content,
           Order = 7)]
        public virtual CategoryList CategoryFilter { get; set; }

        [Display(
           GroupName = SystemTabNames.Content,
           Name = "Take all pages",
           Order = 8)]
        public virtual bool Recursive { get; set; }

        [Display(
          GroupName = SystemTabNames.Content,
          Order = 6, Name = "Page Type Filter")]
        public virtual PageType PageTypeFilter { get; set; }

        /// <summary>
        /// Sets the default property values on the content data.
        /// </summary>
        /// <param name="contentType">Type of the content.</param>
        public override void SetDefaultValues(ContentType contentType)
        {
            base.SetDefaultValues(contentType);

            //Count = 3;           
            SortOrder = FilterSortOrder.PublishedDescending;
            Recursive = true;
        }

    }
}