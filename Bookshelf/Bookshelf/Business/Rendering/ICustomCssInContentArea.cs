using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bookshelf.Business.Rendering
{
    /// <summary>
    /// Defines a property for CSS class(es) which will be added to the class
    /// attribute of containing elements when rendered in a content area with a size tag.
    /// </summary>
    interface ICustomCssInContentArea
    {
        string ContentAreaCssClass { get; }
    }
}
