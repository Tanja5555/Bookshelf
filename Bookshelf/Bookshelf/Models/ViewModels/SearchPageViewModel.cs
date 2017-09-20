using Bookshelf.Models.Pages;
using EPiServer.Core;
using EPiServer.DataAnnotations;
using EPiServer.Globalization;
using EPiServer.Search;
using EPiServer.Search.Queries.Lucene;
using EPiServer.Security;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Bookshelf.Models.ViewModels
{
    public class SearchPageViewModel : IPageViewModel<SearchPage>
    {
        public SearchPageViewModel(SearchPage currentPage)
        {
            CurrentPage = currentPage;
        }

        public IContent Section { get; set; }

        public SearchPage CurrentPage { get; set; }

      
        public string SearchText { get; set; }

        public List<IndexResponseItem> SearchResult { get; set; }

        public void Search(string q)
        {

            var culture = ContentLanguage.PreferredCulture.Name;
            SearchResult = new List<IndexResponseItem>();

            var query = new GroupQuery(LuceneOperator.AND);

            // Only search for pages
            query.QueryExpressions.Add(new ContentQuery<PageData>());

            // Search for keywords in any of the fields specified below (OR condition)
            var keywordsQuery = new GroupQuery(LuceneOperator.OR);

            // Search in default field
            keywordsQuery.QueryExpressions.Add(new FieldQuery(q));

            query.QueryExpressions.Add(keywordsQuery);

            // The access control list query will remove any pages the user doesn't have read access to
            var accessQuery = new AccessControlListQuery();
            accessQuery.AddAclForUser(PrincipalInfo.Current, HttpContext.Current);
            query.QueryExpressions.Add(accessQuery);

            var fieldQueryResult = SearchHandler.Instance.GetSearchResults(query, 1, 40)
                .IndexResponseItems
                .Where(x =>
                (x.Culture.Equals(culture) || string.IsNullOrEmpty(x.Culture)))
                .ToList();

            SearchResult.AddRange(fieldQueryResult);
        }
    }
}