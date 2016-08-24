(function () {
  'use strict';

  angular.module('mcms.core')
    .service('core.services', Service);

  Service.$inject = ['$mdToast', '$mdDialog', '$location', '$route', 'momentFactory'];

  function Service($mdToast, $mdDialog, $location, $route, moment){
      this.createFilterFor = createFilterFor;
      this.flattenTree = flattenTree;
      this.toast = toast;
      this.confirmDialog = confirmDialog;
      this.clearLocation = clearLocation;
      this.composeDate = composeDate;
      this.deComposeDate = deComposeDate;

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
      function toast(msg, position, delay) {
          position = position || 'bottom right';
          delay = delay || 2000;
          $mdToast.show(
              $mdToast.simple()
                  .textContent(msg)
                  .position(position)
                  .hideDelay(delay)
          );

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

      function composeDate(date) {
          if (typeof date == 'undefined'){
              var now = moment();
              return {
                  date : now.toDate(),
                  hours : now.hours(),
                  minutes: now.minutes()
              };
          }

          var d = moment(date);
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
  }




})();
