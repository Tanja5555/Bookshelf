using System;
using System.ComponentModel.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.Web;

namespace Bookshelf.Models.Blocks
{
    [ContentType(DisplayName = "MapBlock", GUID = "0a8e589f-71a9-4049-ad48-b6b34c83bf22", Description = "")]
    public class MapBlock : BlockData
    {
        [CultureSpecific]
        [Display(
         Name = "Heading",
         Description = "Whrite what you want to say about the map",
         GroupName = SystemTabNames.Content,
         Order = 1)]
        public virtual string MapHeading { get; set; }

        [Required]
        [Display(
            Name = "Url for map",
            Description = "Fix a url from google maps and paste the iframe here",
            GroupName = SystemTabNames.Content,
            Order = 2)]
        [UIHint(UIHint.Textarea)]
        public virtual string IFrameMapUrl { get; set; }
    }
}