(function () {
  'use strict';

  angular.module('mcms.core')
    .service('core.services', Service);

  Service.$inject = ['$mdToast', '$mdDialog', '$location', '$route', 'momentFactory', '$filter'];

  function Service($mdToast, $mdDialog, $location, $route, moment, $filter){
      this.createFilterFor = createFilterFor;
      this.flattenTree = flattenTree;
      this.toast = toast;
      this.confirmDialog = confirmDialog;
      this.clearLocation = clearLocation;
      this.parseLocation = parseLocation;
      this.composeDate = composeDate;
      this.deComposeDate = deComposeDate;
      this.redirectTo = redirectTo;

      function createFilterFor(prop,query) {
          var lowercaseQuery = angular.lowercase(query);

          return function filterFn(item) {

              if (typeof query != 'string'){
                  return item[prop];
              }

              var regex = new RegExp(lowercaseQuery, 'gi' );
              return item[prop].match(regex);
          };
      }

      function confirmDialog($ev, options) {
          var confirm = $mdDialog.confirm()
              .title(options.title || 'Are you sure?')
              .textContent(options.text || 'This operation cannot be undone.')
              .ariaLabel(options.title || 'Are you sure?')
              .targetEvent($ev)
              .ok(options.ok || 'Go ahead!')
              .cancel(options.cancel || 'Nope, i changed my mind');

          return $mdDialog.show(confirm);
      }

      function flattenTree(nodes, level, parent, flat) {
          if (!flat) {
              flat = [];
          }

          if (!level) {
              level = 0;
          }

          if (typeof parent == 'undefined') {
              parent = null;
          }

          for (var i in nodes) {
              nodes[i].ancestors = [];

              if (parent) {
                  nodes[i].parent = parent.id;

                  for (var j in parent.ancestors) {
                      nodes[i].ancestors.push(parent.ancestors[j]);
                  }
                  nodes[i].ancestors.push(parent.id);
                  nodes[i].orderBy = i;
              }

              flat.push(nodes[i]);

              if (nodes[i].children) {
                  flattenTree(nodes[i].children, level + 1, nodes[i], flat);
              }
          }

          return flat;
      }
      function toast(msg, position, delay, theme) {
          position = position || 'bottom right';
          delay = delay || 2000;
          theme = theme || null;
          var toast = $mdToast.simple()
              .toastClass(theme)
              .textContent(msg)
              .position(position)
              .hideDelay(delay);

          $mdToast.show(toast);
      }

      function clearLocation($scope) {
          $scope.$on('$locationChangeStart', function (event, next, current) {
              if ($route.current && $route.current.regexp) {
                  if ($route.current.regexp.test($location.path())){// if current route is our route (paging) do nothing
                      return;
                  }
              }
              $location.search({});
          });
      }

      function parseLocation(allFilters, params) {
          var filters = {};
          for (var key in params){
              if (typeof allFilters[key] != 'undefined'){
                  filters[key] = params[key];
              }
          }

          return filters;
      }

      function composeDate(date) {
          if (typeof date == 'undefined'){
              var now = moment();
              return {
                  date : now.toDate(),
                  hours : now.hours(),
                  minutes: now.minutes()
              };
          }

          var hourDiff = moment().utcOffset();
          var d = moment(date).add(hourDiff, 'm');//account for timezone as php doesn't
          return {
              date : d.toDate(),
              hours : d.hours(),
              minutes: d.minutes()
          };
      }

      function deComposeDate(obj) {
          if (typeof obj == 'undefined'){
              obj = composeDate();
          }
          return moment(obj.date)
              .hours(obj.hours)
              .minutes(obj.minutes);
      }

      function redirectTo(route, params) {
          return $location.path($filter('reverseUrl')(route ,params).replace('#',''));
      }
  }




})();
