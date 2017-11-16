var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AlgoliaSearch = function () {
    function AlgoliaSearch() {
        _classCallCheck(this, AlgoliaSearch);

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

        this.search.on('render', function () {
            setTimeout(function () {
                return applyMasonry();
            }, 300);
        });

        $('body').bind('results.received', function (e, results) {
            // check for results and hide stuff that need hiding
            // Set Clear filters
            // Hide sidebars if no facets
            var hideSideBar = !(results.disjunctiveFacets.length > 0);
            console.log(results);
        });
    }

    _createClass(AlgoliaSearch, [{
        key: 'addFacets',
        value: function addFacets() {
            var transformData = {
                item: function item(obj) {
                    var checkbox = obj.isRefined ? 'check_box' : 'check_box_outline_blank';
                    var active = obj.isRefined ? 'style="color:#ec007e"' : '';
                    obj.rendered = '\n<li class="cat-item">\n           <i class="material-icons" style="vertical-align: middle;">' + checkbox + '</i> <a href="" ' + active + '>' + obj.label + ' (' + obj.count + ')</a>\n</li>';
                    return obj;
                }
            };

            this.search.addWidget(instantsearch.widgets.refinementList({
                container: '.tagsFacet',
                attributeName: 'tags.label',
                sortBy: ['isRefined', 'count:desc', 'name:asc'],
                limit: 10,
                operator: 'and',
                transformData: transformData,
                templates: {
                    header: '<h4 class="widget-title">Tags</h4>',
                    item: '{{{rendered}}}'
                }
            }));

            this.search.addWidget(instantsearch.widgets.refinementList({
                container: '.categoriesFacet',
                attributeName: 'categories',
                sortBy: ['isRefined', 'count:desc', 'name:asc'],
                limit: 10,
                operator: 'and',
                transformData: transformData,
                templates: {
                    header: '<h4 class="widget-title">Κατηγορίες</h4>',
                    item: '{{{rendered}}}'
                }
            }));
        }
    }, {
        key: 'addHitsBox',
        value: function addHitsBox() {
            var algoliaHitsContainer = document.getElementById('algoliaHits');

            function singleItem(item) {
                var url = '/page/' + item.slug;
                var description = typeof item._highlightResult.description === 'undefined' ? item.description : item._highlightResult.description.value;
                var template = '\n  <div class="col-xs-12 col-md-6 col-lg-4 grid-item">\n        <article class="post bg z-depth-1">\n            <div class="post-img">\n        <a href="' + url + '" title="' + item._highlightResult.title.value + '">\n            <img class="retina"\n                 src="' + item.thumb.copies.big_thumb.url + '"\n                  alt="' + item._highlightResult.title.value + '">\n        </a>\n    </div>\n            <div class="post-content">\n                <div class="post-header center-align">\n                   <h2 class="post-title">\n                   <a href="' + url + '" title="{{{item._highlightResult.name.value}}}">' + item._highlightResult.title.value + '</a></h2>\n\n                </div>\n                        <div class="algolia post-entry">\n            ' + description + '\n        </div>\n            </div>\n        </article>\n        </div>\n        ';

                return template;
            }

            function processItems(items) {
                var itemsArr = [];

                for (var i in items) {
                    itemsArr.push(singleItem(items[i]));
                }
                var template = '\n<div class="col-xs-12 col-lg-12 posts-list">\n<div class="row grid-layout">\n<div class="col-xs-12 col-md-6 col-lg-4 grid-sizer"></div>\n' + itemsArr.join('') + '\n</div>\n</div>';

                return template;
            }

            this.search.addWidget(instantsearch.widgets.hits({
                container: algoliaHitsContainer,
                transformData: {
                    /*                    item (obj) {
                                            return obj;
                                        },*/
                    allItems: function allItems(results) {
                        $('body').trigger('results.received', results);
                        results.renderedItems = processItems(results.hits);
                        return results;
                    }
                },
                templates: {
                    empty: 'No results',
                    // item: template,
                    allItems: '{{{renderedItems}}}'
                }
            }));
        }
    }, {
        key: 'addSearchBox',
        value: function addSearchBox() {
            var algoliaSearchBox = document.getElementById('algoliaSearchBox');

            this.search.addWidget(instantsearch.widgets.searchBox({
                magnifier: false,
                wrapInput: false,
                reset: false,
                searchOnEnterKeyPressOnly: false,
                container: algoliaSearchBox,
                placeholder: algoliaSearchBox.getAttribute('placeholder')
            }));
        }
    }, {
        key: 'addClearAll',
        value: function addClearAll() {
            this.search.addWidget(instantsearch.widgets.clearAll({
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
            }));
        }
    }, {
        key: 'addPagination',
        value: function addPagination() {
            this.search.addWidget(instantsearch.widgets.pagination({
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
            }));
        }
    }]);

    return AlgoliaSearch;
}();

$(document).ready(function () {
    var algoliaHitsContainer = document.getElementById('algoliaHits');

    if (algoliaHitsContainer) {
        new AlgoliaSearch();
    }
});