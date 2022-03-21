(function () {
    angular.module('mcms.components')
        .directive('fileComponent', Directive);

    Directive.$inject = ['configuration', '$rootScope'];
    DirectiveController.$inject = ['$scope', 'lodashFactory', '$timeout'];

    function Directive(Config, $rootScope) {

        return {
            templateUrl: Config.templatesDir + "Components/file.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require: ['fileComponent', 'ngModel'],
            scope: {
                ngModel: '=ngModel',
                options: '=?options',
                uploadSettings: '=?uploadSettings',
                onSelect: '&onSelect',
                onChange: '&?onChange',
                passThrough : '=?passThrough',
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    showPreview: true,
                    showUpload: true,
                    showDetails: true,
                    passThrough : false
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
                    url: Config.fileUploadUrl,
                    maxFiles : 1,
                    acceptedFiles : Config.fileTypes.document.acceptSelect,
                    params: {
                        container: 'Item',
                        configurator: '\\Mcms\\Core\\Services\\File\\BaseFileConfigurator',
                        resize: false,
                        type: 'file',
                        passThrough : scope.options.passThrough
                    }
                };


                scope.callbacks = {
                    success : function (file, xhr) {
                        scope.Item.src = (xhr.copies) ? xhr.copies.originals.imageUrl : xhr.data.url;
                        scope.itemChange();
                        $rootScope.$broadcast('uploader.files.remove', file);
                    }
                };

                scope.itemChange = function () {
                    if (typeof scope.onChange == 'function'){
                        scope.onChange({field: attrs.name || 'image', value: scope.Item, passThrough : scope.passThrough});

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
