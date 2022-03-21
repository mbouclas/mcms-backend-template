(function () {
    angular.module('mcms.components')
        .directive('imageComponent', Directive);

    Directive.$inject = ['configuration', '$rootScope', 'LangService', 'lodashFactory'];
    DirectiveController.$inject = ['$scope', 'lodashFactory', '$timeout', 'LangService'];

    function Directive(Config, $rootScope, Lang, lo) {

        return {
            templateUrl: Config.templatesDir + "Components/image.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require: ['imageComponent', 'ngModel'],
            scope: {
                ngModel: '=ngModel',
                options: '=?options',
                settings : '=?settings',
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
                    showDetails: true
                };

                if (typeof scope.settings == 'undefined'){
                    scope.settings = {};
                }

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
                if (!lo.isObject(scope.Item)){
                    scope.Item = {};
                }

                if (typeof scope.Item.description == 'undefined'){
                    scope.Item.description = (scope.settings.translatable) ? Lang.langFields() : '';
                }

                if (typeof scope.Item.title == 'undefined'){
                    scope.Item.title = (scope.settings.translatable) ? Lang.langFields() : '';
                }

                if (typeof scope.Item.alt == 'undefined'){
                    scope.Item.alt = (scope.settings.translatable) ? Lang.langFields() : '';
                }

                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);

                scope.uploadOptions = {
                    url: Config.imageUploadUrl,
                    maxFiles : 1,
                    params: {
                        container: 'Item',
                        configurator: (typeof scope.settings != 'undefined' && typeof scope.settings.imageConfigurator != 'undefined') ? scope.settings.imageConfigurator : '\\Mcms\\Core\\Services\\Image\\BaseImageConfigurator',
                        resize: false,
                        type: 'thumb',
                        copySettings : (typeof scope.settings != 'undefined') ? angular.toJson(scope.settings) : null
                    }
                };


                scope.uploadOptions.acceptSelect = Config.fileTypes.image.acceptSelect;

                scope.callbacks = {
                    success : function (file, xhr) {
                        scope.Item.src = (xhr.copies) ? xhr.copies.originals.imageUrl : xhr.data.url;
                        scope.itemChange();
                        $rootScope.$broadcast('uploader.files.remove', file);
                    }
                };

                scope.onImagesUploadDone = function (file, response) {
                    scope.Item.src = (response.copies) ? response.copies.originals.imageUrl : response.data.url;
                }

                scope.itemChange = function () {
                    if (typeof scope.onChange == 'function'){
                        scope.onChange({field: attrs.name || 'image', value: scope.Item, passThrough : scope.passThrough});
                    }
                };
            }
        };
    }

    function DirectiveController($scope, lo, $timeout, Lang) {
        var vm = this;

        vm.defaultLang = Lang.defaultLang();
        vm.Locales = Lang.locales();

        vm.toggle = function (model) {
            $scope.options[model] = !$scope.options[model];

        }
    }
})();
