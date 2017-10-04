using System;
using System.ComponentModel.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.Web;

namespace Bookshelf.Models.Blocks
{
    [ContentType(DisplayName = "TeaserBlock", GUID = "a5f7f2ca-f287-4320-b7d8-5b207522c930", Description = "")]
    public class TeaserBlock : BlockData
    {
       
        [Display(
          GroupName = SystemTabNames.Content,
          Order = 1)]
        public virtual string Heading { get; set; }

        [CultureSpecific]
        [Display(
            GroupName = SystemTabNames.Content,
            Order = 2)]
        [UIHint(UIHint.LongString)]
        public virtual string Text { get; set; }

        [CultureSpecific]
        [UIHint(UIHint.Image)]
        [Display(
            GroupName = SystemTabNames.Content,
            Order = 3)]
        public virtual ContentReference Image { get; set; }

        [Display(
            GroupName = SystemTabNames.Content,
            Order = 4)]
        public virtual PageReference Link { get; set; }
    }
}