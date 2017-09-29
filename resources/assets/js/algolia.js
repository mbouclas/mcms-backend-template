class AlgoliaSearch {
    constructor() {
        this.search = instantsearch({
            appId: '6S8DKDB7X0',
            apiKey: '22ddf196e0799a772211bebbbd41b4af',
            indexName: 'pages',
            urlSync: true
        });

        this.addClearAll();
        this.addPagination();
        this.addHitsBox();
        this.addSearchBox();
        this.addFacets();
        this.search.start();

        this.search.on('render', () => {
            setTimeout(() => applyMasonry(), 300);
        });

        $('body').bind('results.received', (e, results) => {
            // check for results and hide stuff that need hiding
            // Set Clear filters
            // Hide sidebars if no facets
            const hideSideBar = !(results.disjunctiveFacets.length > 0);
            console.log(results);
        })
    }

    addFacets() {
        const transformData = {
            item(obj) {
                const checkbox = (obj.isRefined) ? 'check_box' : 'check_box_outline_blank';
                const active = (obj.isRefined) ? 'style="color:#ec007e"' : '';
                obj.rendered = `
<li class="cat-item">
           <i class="material-icons" style="vertical-align: middle;">${checkbox}</i> <a href="" ${active}>${obj.label} (${obj.count})</a>
</li>`;
                return obj;
            }
        };


        this.search.addWidget(
            instantsearch.widgets.refinementList({
                container: '.tagsFacet',
                attributeName: 'tags.label',
                sortBy: ['isRefined', 'count:desc', 'name:asc'],
                limit: 10,
                operator: 'and',
                transformData,
                templates: {
                    header: '<h4 class="widget-title">Tags</h4>',
                    item: '{{{rendered}}}'
                }
            })
        );

        this.search.addWidget(
            instantsearch.widgets.refinementList({
                container: '.categoriesFacet',
                attributeName: 'categories',
                sortBy: ['isRefined', 'count:desc', 'name:asc'],
                limit: 10,
                operator: 'and',
                transformData,
                templates: {
                    header: '<h4 class="widget-title">Κατηγορίες</h4>',
                    item: '{{{rendered}}}'
                }
            })
        );
    }

    addHitsBox() {
        const algoliaHitsContainer = document.getElementById('algoliaHits');

        function singleItem(item) {
            const url = `/page/${item.slug}`;
            const description = (typeof item._highlightResult.description === 'undefined') ? item.description : item._highlightResult.description.value
            const template = `
  <div class="col-xs-12 col-md-6 col-lg-4 grid-item">
        <article class="post bg z-depth-1">
            <div class="post-img">
        <a href="${url}" title="${item._highlightResult.title.value}">
            <img class="retina"
                 src="${item.thumb.copies.big_thumb.url}"
                  alt="${item._highlightResult.title.value}">
        </a>
    </div>
            <div class="post-content">
                <div class="post-header center-align">
                   <h2 class="post-title">
                   <a href="${url}" title="{{{item._highlightResult.name.value}}}">${item._highlightResult.title.value}</a></h2>

                </div>
                        <div class="algolia post-entry">
            ${description}
        </div>
            </div>
        </article>
        </div>
        `;

            return template;
        }

        function processItems(items) {
            const itemsArr = [];

            for (const i in items) {
                itemsArr.push(singleItem(items[i]));
            }
            let template = `
<div class="col-xs-12 col-lg-12 posts-list">
<div class="row grid-layout">
<div class="col-xs-12 col-md-6 col-lg-4 grid-sizer"></div>
${itemsArr.join('')}
</div>
</div>`;

            return template;
        }

        this.search.addWidget(
            instantsearch.widgets.hits({
                container: algoliaHitsContainer,
                transformData: {
/*                    item (obj) {
                        return obj;
                    },*/
                    allItems (results) {
                        $('body').trigger('results.received',results);
                        results.renderedItems = processItems(results.hits);
                        return results;
                    }
                },
                templates: {
                    empty: 'No results',
                    // item: template,
                    allItems: '{{{renderedItems}}}'
                }
            })
        );
    }

    addSearchBox() {
        const algoliaSearchBox = document.getElementById('algoliaSearchBox');

        this.search.addWidget(
            instantsearch.widgets.searchBox({
                magnifier: false,
                wrapInput: false,
                reset: false,
                searchOnEnterKeyPressOnly: false,
                container: algoliaSearchBox,
                placeholder: algoliaSearchBox.getAttribute('placeholder')
            })
        );
    }

    addClearAll(){
        this.search.addWidget(
            instantsearch.widgets.clearAll({
                container: '#clear-all',
                collapsible: true,
                autoHideContainer: false,
                clearsQuery: true,
                cssClasses: {
                  link: 'btn btn-sm btn-primary'
                },
                templates: {
                    link: '<i class="material-icons" style="vertical-align: middle">clear</i>'
                }
            })
        );
    }

    addPagination()  {
        this.search.addWidget(
            instantsearch.widgets.pagination({
                container: '#pagination',
                labels: {
                    previous: '<i class="material-icons">chevron_left</i>',
                    next: '<i class="material-icons">chevron_right</i>'
                },
                cssClasses: {
                    root: 'pagination center-align',
                    item: 'waves-effect',
                    active: 'active'
                },
                maxPages: 20,
                // default is to scroll to 'body', here we disable this behavior
                scrollTo: false
            })
        );
    };
}

$(document).ready(function(){
    const algoliaHitsContainer = document.getElementById('algoliaHits');

    if (algoliaHitsContainer) {
        new AlgoliaSearch();
    }
});