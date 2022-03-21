(function() {
    'use strict';

    angular
        .module('mcms.components')
        .directive('paginator', Directive)
        .run(templateCache);

    templateCache.$inject = ['$templateCache'];

    function Directive() {


        function compile(tElement) {
            tElement.addClass('md-table-pagination');
        }

        function Controller($attrs, $mdUtil, $scope) {
            var self = this;
            var defaultLabel = {
                page: 'Page:',
                rowsPerPage: 'Rows per page:',
                of: 'of'
            };

            self.label = angular.copy(defaultLabel);

            function isPositive(number) {
                return parseInt(number, 10) > 0;
            }

            self.eval = function (expression) {
                return $scope.$eval(expression);
            };

            self.first = function () {
                self.page = 1;
                self.onPaginationChange();
            };

            self.hasNext = function () {
                return self.page * self.limit < self.total;
            };

            self.hasPrevious = function () {
                return self.page > 1;
            };

            self.last = function () {
                self.page = self.pages();
                self.onPaginationChange();
            };

            self.max = function () {
                return self.hasNext() ? self.page * self.limit : self.total;
            };

            self.min = function () {
                return isPositive(self.total) ? self.page * self.limit - self.limit + 1 : 0;
            };

            self.next = function () {
                self.page++;
                self.onPaginationChange();
            };

            self.onPaginationChange = function () {
                if(angular.isFunction(self.onPaginate)) {
                    $mdUtil.nextTick(function () {
                        self.onPaginate(self.page, self.limit);
                    });
                }
            };

            self.pages = function () {
                return isPositive(self.total) ? Math.ceil(self.total / (isPositive(self.limit) ? self.limit : 1)) : 1;
            };

            self.previous = function () {
                self.page--;
                self.onPaginationChange();
            };

            self.showBoundaryLinks = function () {
                return $attrs.mdBoundaryLinks === '' || self.boundaryLinks;
            };

            self.showPageSelect = function () {
                return $attrs.mdPageSelect === '' || self.pageSelect;
            };

            $scope.$watch('$pagination.limit', function (newValue, oldValue) {
                if(isNaN(newValue) || isNaN(oldValue) || newValue === oldValue) {
                    return;
                }

                // find closest page from previous min
                self.page = Math.floor(((self.page * oldValue - oldValue) + newValue) / (isPositive(newValue) ? newValue : 1));
                self.onPaginationChange();
            });

            $attrs.$observe('mdLabel', function (label) {
                angular.extend(self.label, defaultLabel, $scope.$eval(label));
            });

            $scope.$watch('$pagination.total', function (newValue, oldValue) {
                if(isNaN(newValue) || newValue === oldValue) {
                    return;
                }

                if(self.page > self.pages()) {
                    self.last();
                }
            });
        }

        Controller.$inject = ['$attrs', '$mdUtil', '$scope'];

        return {
            bindToController: {
                boundaryLinks: '=?mdBoundaryLinks',
                disabled: '=ngDisabled',
                limit: '=mdLimit',
                page: '=mdPage',
                pageSelect: '=?mdPageSelect',
                onPaginate: '=?mdOnPaginate',
                limitOptions: '=?mdLimitOptions',
                total: '@mdTotal'
            },
            compile: compile,
            controller: Controller,
            controllerAs: '$pagination',
            restrict: 'E',
            scope: {},
            templateUrl: 'md-table-pagination.html'
        };
    }

    function templateCache($templateCache) {
        $templateCache.put('md-table-pagination.html',
            '<div class="page-select" ng-if="$pagination.showPageSelect()">\n' +
            '  <div class="label">{{$pagination.label.page}}</div>\n' +
            '\n' +
            '  <md-select virtual-page-select total="{{$pagination.pages()}}" class="md-table-select" ng-model="$pagination.page" md-container-class="md-pagination-select" ng-change="$pagination.onPaginationChange()" ng-disabled="$pagination.disabled" aria-label="Page">\n' +
            '    <md-content>\n' +
            '      <md-option ng-repeat="page in $pageSelect.pages" ng-value="page">{{page}}</md-option>\n' +
            '    </md-content>\n' +
            '  </md-select>\n' +
            '</div>\n' +
            '\n' +
            '<div class="limit-select" ng-if="$pagination.limitOptions">\n' +
            '  <div class="label">{{$pagination.label.rowsPerPage}}</div>\n' +
            '\n' +
            '  <md-select class="md-table-select" ng-model="$pagination.limit" md-container-class="md-pagination-select" ng-disabled="$pagination.disabled" aria-label="Rows" placeholder="{{ $pagination.limitOptions[0] }}">\n' +
            '    <md-option ng-repeat="option in $pagination.limitOptions" ng-value="option.value ? $pagination.eval(option.value) : option">{{::option.label ? option.label : option}}</md-option>\n' +
            '  </md-select>\n' +
            '</div>\n' +
            '\n' +
            '<div class="buttons">\n' +
            '  <div class="label">{{$pagination.min()}} - {{$pagination.max()}} {{$pagination.label.of}} {{$pagination.total}}</div>\n' +
            '\n' +
            '  <md-button class="md-icon-button" type="button" ng-if="$pagination.showBoundaryLinks()" ng-click="$pagination.first()" ng-disabled="$pagination.disabled || !$pagination.hasPrevious()" aria-label="First">\n' +
            '    <md-icon md-svg-icon="navigate-first.svg"></md-icon>\n' +
            '  </md-button>\n' +
            '\n' +
            '  <md-button class="md-icon-button" type="button" ng-click="$pagination.previous()" ng-disabled="$pagination.disabled || !$pagination.hasPrevious()" aria-label="Previous">\n' +
            '    <md-icon md-svg-icon="navigate-before.svg"></md-icon>\n' +
            '  </md-button>\n' +
            '\n' +
            '  <md-button class="md-icon-button" type="button" ng-click="$pagination.next()" ng-disabled="$pagination.disabled || !$pagination.hasNext()" aria-label="Next">\n' +
            '    <md-icon md-svg-icon="navigate-next.svg"></md-icon>\n' +
            '  </md-button>\n' +
            '\n' +
            '  <md-button class="md-icon-button" type="button" ng-if="$pagination.showBoundaryLinks()" ng-click="$pagination.last()" ng-disabled="$pagination.disabled || !$pagination.hasNext()" aria-label="Last">\n' +
            '    <md-icon md-svg-icon="navigate-last.svg"></md-icon>\n' +
            '  </md-button>\n' +
            '</div>');
        $templateCache.put('arrow-up.svg',
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>');
        $templateCache.put('navigate-before.svg',
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>');
        $templateCache.put('navigate-first.svg',
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 6 v12 h2 v-12 h-2z M17.41 7.41L16 6l-6 6 6 6 1.41-1.41L12.83 12z"/></svg>');
        $templateCache.put('navigate-last.svg',
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 6 v12 h2 v-12 h-2z M8 6L6.59 7.41 11.17 12l-4.58 4.59L8 18l6-6z"/></svg>');
        $templateCache.put('navigate-next.svg',
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>');
    }
})();
