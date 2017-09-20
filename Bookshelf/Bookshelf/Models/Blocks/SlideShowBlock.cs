using System;
using System.ComponentModel.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;

namespace Bookshelf.Models.Blocks
{
    [ContentType(DisplayName = "SlideShowBlock", GUID = "fb6b2ff9-4a22-4dad-b3ba-f0ee8fe7b431", Description = "")]
    public class SlideShowBlock : BlockData
    {
        [CultureSpecific]
        [Display(
            Name = "SlideShowBlock",
            Description = "Block for slideshow, just add some images and use it")]
        [AllowedTypes(typeof(ContentFolder))]
        public virtual ContentReference ImageFolder { get; set; }
        public virtual bool HideCaption { get; set; }
    }
}