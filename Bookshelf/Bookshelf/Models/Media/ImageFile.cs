using System;
using System.ComponentModel.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer;
using EPiServer.SpecializedProperties;

namespace Bookshelf.Models.Media
{
    [ContentType(DisplayName = "ImageFile", GUID = "f0f68c44-8abc-4acc-893f-f17d6adc1100", Description = "")]
    /*[MediaDescriptor(ExtensionString = "pdf,doc,docx")]*/
    public class ImageFile : ImageData
    {
        public virtual XhtmlString Heading { get; set; }
        public virtual XhtmlString Description { get; set; }
    }
}