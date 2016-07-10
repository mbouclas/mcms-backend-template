(function () {
  'use strict';

  angular.module('mcms.core')
    .service('core.services', Service);

  Service.$inject = ['$mdToast', '$mdDialog'];

  function Service($mdToast, $mdDialog){
      this.createFilterFor = createFilterFor;
      this.flattenTree = flattenTree;
      this.toast = toast;
      this.confirmDialog = confirmDialog;

      function createFilterFor(prop,query) {
          var lowercaseQuery = angular.lowercase(query);

          return function filterFn(item) {
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
  }




})();
