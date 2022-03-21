(function () {
    angular.module('mcms.dynamicTables')
        .directive('dynamicTablesItemsSelector', Directive);

    Directive.$inject = ['configuration', 'lodashFactory', 'LangService', 'core.services'];


    function Directive(Config, lo, Lang, Helpers) {
        var template = '<div>' +
            '<md-input-container class="md-block" ' +
            'flex-gt-sm ng-repeat="table in tables" ng-if="table.children.length > 0" ' +
            '>' +
            '<label>{{ table.title[defaultLang] }}</label>' +
            '<md-select ng-model="tableModels[table.slug]"  multiple ' +
            'ng-change="sync()">' +
            '<md-option ng-repeat="item in table.children" value="{{ item.id }}">' +
            '<span ng-bind-html="item.label"></span> ' +
            '</md-option>' +
            '</md-select>' +
            '</md-input-container>' +
            '</div>';

        
        return {
            template: template,
            require : 'ngModel',
            scope: {
                options: '=?options',
                onChange: '&?onChange',
                mode: '=?mode',
                model : '=ngModel',
                tables : '=tables'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    hasFilters: true
                };

                scope.tableModels = {};

                scope.defaultLang = Lang.defaultLang();

                scope.mode = scope.mode || 'single';

                if (!lo.isArray(scope.tables)) {
                    scope.tables = [];
                }

                var FlatTables = Helpers.flattenTree(scope.tables);

                //create scoped models
                lo.forEach(scope.tables, function (table) {
                    scope.tableModels[table.slug] = [];
                    //prefill the temp models with the original values
                    if (typeof table.children !== 'undefined' && table.children.length > 0) {
                        for (var i in table.children) {
                            var found = lo.find(scope.model, {id : table.children[i].id});
                            if (found) {
                                scope.tableModels[table.slug].push(found.id);
                            }
                        }
                    }
                });

                if (!lo.isArray(scope.model)){
                    scope.model = [];
                }

                scope.sync = function () {
                    //go item by item and assign the selected ones to the model. Wipe the original model first
                    scope.model = [];
                    for (var slug in scope.tableModels) {
                        for (var index in scope.tableModels[slug]) {
                            var found = lo.find(FlatTables, {id : parseInt(scope.tableModels[slug][index])});
                            scope.model.push(found);
                        }
                    }
                };


                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);

            }
        };
    }
})();
