using System;
using System.ComponentModel.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;

namespace Bookshelf.Models.Media
{
    [ContentType(DisplayName = "MyImageFile", GUID = "c4c830de-9300-4919-bae7-9ee9a87417ff", Description = "")]
    /*[MediaDescriptor(ExtensionString = "pdf,doc,docx")]*/
    public class MyImageFile : ImageData
    {
        
    }
}