(function () {
    angular.module('mcms.components')
        .directive('imageComponent', Directive);

    Directive.$inject = ['configuration', '$rootScope'];
    DirectiveController.$inject = ['$scope', 'lodashFactory', '$timeout'];

    function Directive(Config, $rootScope) {

        return {
            templateUrl: Config.templatesDir + "Components/image.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require: ['imageComponent', 'ngModel'],
            scope: {
                ngModel: '=ngModel',
                options: '=?options',
                uploadSettings: '=?uploadSettings',
                onSelect: '&onSelect',
                onChange: '&?onChange'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    showPreview: true,
                    showUpload: true,
                    showDetails: true
                };

                scope.layoutType = attrs.layoutType || 'row';

                scope.targetOptions = [
                    {
                        label: 'Same tab',
                        value: '_self'
                    },
                    {
                        label: 'New tab',
                        value: '_blank'
                    }
                ];

                scope.Item = scope.ngModel;

                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);

                scope.uploadOptions = {
                    url: Config.imageUploadUrl,
                    maxFiles : 1,
                    params: {
                        container: 'Item',
                        configurator: '\\IdeaSeven\\Core\\Services\\Image\\BaseImageConfigurator',
                        resize: false,
                        type: 'thumb'
                    }
                };

                scope.uploadOptions.acceptSelect = Config.fileTypes.image.acceptSelect;
                scope.callbacks = {
                    success : function (file, xhr) {
                        scope.Item.src = (xhr.copies) ? xhr.copies.originals.imageUrl : xhr.data.url;
                        $rootScope.$broadcast('uploader.files.remove', file);
                    }
                };
                scope.onImagesUploadDone = function (file, response) {
                    scope.Item.src = (response.copies) ? response.copies.originals.imageUrl : response.data.url;
                }

                scope.itemChange = function () {
                    if (typeof scope.onChange == 'function'){
                        scope.onChange({field: attrs.name || 'image', value: scope.Item});

                    }
                };
            }
        };
    }

    function DirectiveController($scope, lo, $timeout) {
        var vm = this;

        vm.toggle = function (model) {
            $scope.options[model] = !$scope.options[model];

        }
    }
})();
