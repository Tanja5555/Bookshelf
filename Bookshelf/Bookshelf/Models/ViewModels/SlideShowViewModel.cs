using Bookshelf.Models.Blocks;
using Bookshelf.Models.Media;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Bookshelf.Models.ViewModels
{
    public class SlideShowViewModel
    {
        public SlideShowBlock CurrentBlock { get; set; }
        public List<ImageFile> Images { get; set; }
    }
}