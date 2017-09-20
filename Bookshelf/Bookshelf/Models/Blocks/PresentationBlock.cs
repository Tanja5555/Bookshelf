using System;
using System.ComponentModel.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer;
using EPiServer.Web;

namespace Bookshelf.Models.Blocks
{
    [ContentType(DisplayName = "PresentationBlock", GUID = "48e66e81-337a-4a8a-9ff9-6ab508dd8894", Description = "")]
    public class PresentationBlock : BlockData
    {
        [Display(
             Name ="Backgrunds bild",
             GroupName = SystemTabNames.Content, Order = 10)]
        [CultureSpecific]
        [UIHint(UIHint.Image)]
        public virtual ContentReference BackgroundImage { get; set; }

        [Display(
            Name = "Din bild",
             GroupName = SystemTabNames.Content, Order = 20)]
        [CultureSpecific]
        [UIHint(UIHint.Image)]
        public virtual ContentReference PersonImage { get; set; }

        [CultureSpecific]
        [Display(
          Name = "Namn och efternamn",
          GroupName = SystemTabNames.Content,
          Order = 30)]
        public virtual string PortfolioName { get; set; }

        [CultureSpecific]
        [Display(
          Name = "Ort",
          GroupName = SystemTabNames.Content,
          Order = 40)]
        public virtual string Ort { get; set; }

        [CultureSpecific]
        [Display(
          Name = "Land",
          GroupName = SystemTabNames.Content,
          Order = 45)]
        public virtual string Land { get; set; }

        [CultureSpecific]
        [Display(
          Name = "Telefonnummer",
          GroupName = SystemTabNames.Content,
          Order = 50)]
        public virtual string Telefonnummer { get; set; }

        [CultureSpecific]
        [Display(
          Name = "Email",
          GroupName = SystemTabNames.Content,
          Order = 60)]
        public virtual Url Email { get; set; }

        [CultureSpecific]
        [Display(
          Name = "Länk",
          GroupName = SystemTabNames.Content,
          Order = 70)]
        public virtual Url Link { get; set; }

        [CultureSpecific]
        [Display(
         Name = "Rubrik",
         GroupName = SystemTabNames.Content,
         Order = 80)]
        public virtual string Rubrik { get; set; }

    }
}