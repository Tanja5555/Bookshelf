using EPiServer.Core;
using Bookshelf.Models.Pages;

namespace Bookshelf.Models.ViewModels
{
    public interface IPageViewModel<out T> where T : SitePageData
    {
        T CurrentPage { get; }
        IContent Section { get; set; }
    }
}
