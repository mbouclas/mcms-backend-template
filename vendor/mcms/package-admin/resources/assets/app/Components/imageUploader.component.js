(function () {
    angular.module('mcms.components')
        .directive('imageUploader', Directive);

    Directive.$inject = ['configuration'];
    DirectiveController.$inject = ['$scope', 'core.services', '$mdDialog', 'configuration'];

    function Directive(Config) {
        return {
            controller: DirectiveController,
            controllerAs: 'VM',
            require: ['imageUploader'],
            scope: {
                options: '=?options',
                item: '=?item',
                onSave: '&?onUpload'
            },
            restrict: 'EA',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    clickArea: null
                },
                    target = element;

                //In case we use it as an element
                if (attrs.clickArea == 'parent'){
                    target = element.parent();
                }

                target.on('click',function ($ev) {
                    controllers[0].showDialog($ev);
                    
/*                    popup = window.open('/admin/elfinder/a', '',
                        "top=50,left=100,width=400,height=500,location=no,toolbar=no,menubar=no");*/
                });

                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);
                scope.dzOptions = {
                    url: '/alt_upload_url',
                    paramName: 'photo',
                    maxFilesize: '10',
                    acceptedFiles: 'image/jpeg, images/jpg, image/png',
                    addRemoveLinks: true,
                };

                scope.dzCallbacks = {
                    'addedfile': function (file) {
                        console.log(file);
                        $scope.newFile = file;
                    },
                    'success': function (file, xhr) {
                        console.log(file, xhr);
                    },
                };
                scope.dzMethods = {};

                scope.removeNewFile = function () {
                    scope.dzMethods.removeFile(scope.newFile); //We got $scope.newFile from 'addedfile' event callback
                }
            }
        };
    }

    function DirectiveController($scope, Helpers, $mdDialog, Config) {
        var vm = this;

        vm.showDialog = function (ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: Config.templatesDir + "Components/imageUploader.component.html",
                locals: {
                    dzOptions : $scope.dzOptions,
                    dzCallbacks : $scope.dzCallbacks,
                    dzMethods : $scope.dzMethods
                },
                bindToController: true,
                controllerAs: 'VM',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true
            })
                .then(function (answer) {

                }, function () {
                });
        };

        function DialogController($scope, $mdDialog) {
            $scope.close = function () {
                $mdDialog.hide();
            };
        }
    }
})();
