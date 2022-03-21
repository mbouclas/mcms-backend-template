(function () {
    angular.module('mcms.fileGallery')
        .directive('fileGallery', Directive);

    Directive.$inject = ['configuration', 'lodashFactory'];
    DirectiveController.$inject = ['$scope', 'core.services', 'configuration', 'AuthService',
        'FileGalleryService', 'LangService', 'MediaLibraryService', 'Dialog'];

    function Directive(Config, lo) {

        return {
            templateUrl: Config.templatesDir + "FileGallery/fileGallery.component.html",
            controller: DirectiveController,
            controllerAs: 'VM',
            require : ['fileGallery', 'ngModel'],
            scope: {
                options: '=?options',
                uploadConfig: '=uploadConfig',
                ngModel: '=ngModel'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controllers) {
                var defaults = {
                    hasFilters: true
                };

                scope.$watch('ngModel', function (val) {
                   if (!val || !lo.isArray(val)){
                       return;
                   }

                    controllers[0].init(val);
                });

                scope.options = (!scope.options) ? defaults : angular.extend(defaults, scope.options);

            }
        };
    }

    function DirectiveController($scope, Helpers, Config, ACL, FGS, Lang, MLS, Dialog) {
        var vm = this,
            currentModel, //tracks current model (images, floorplans etc)
            currentType,
            DZ = {};
        vm.Item = {};
        vm.Lang = Lang;
        vm.model = {};
        vm.defaultLang = Lang.defaultLang();
        vm.dzInstance = function (instance) {
            DZ = instance;
        };
        vm.Callbacks = {
            addedfile : function(file){
                $scope.lastFile = file;
            },
            success : function (file, xhr) {
                if (typeof vm.Item == 'undefined'){
                    vm.Item = [];
                }
                // DZ.dzMethods.removeFile(file);
                vm.Item.push(xhr);
            }
        };


        vm.init = function (item) {
            vm.Item = item;
        };

        vm.add = function (event, type, model) {

        };

        vm.onSelectFromMediaLibrary = function (item) {
            MLS.assign(currentType.params,item)
                .then(function (res) {
                    onUploadDone(res, res, vm.Item);
                    Helpers.toast('Added!!!');
                });
        };

        vm.edit = function ($event, item) {
            $event.stopPropagation();
            Dialog.show({
                title : 'Edit',
                contents : '<edit-file ng-model="VM.Item" on-save="VM.onSave(item)"></edit-file>',
                locals : {
                    Item : item,
                    onSave : vm.onSave
                }
            });
        };

        vm.save = function (item) {
            FGS.save(item)
                .then(function () {
                    Helpers.toast('Saved!');
                });
        };

        vm.delete = function ($event, item, type) {
            $event.stopPropagation();

            Helpers.confirmDialog($event, {
                title : 'Are you sure?',
                text : 'This operation cannot be undone.',
                ok : 'Go ahead!',
                cancel : 'Nope, i changed my mind'
            })
                .then(function () {
                    FGS.destroy(item.id)
                        .then(function () {
                            Helpers.toast('Saved!');
                            vm.Item.splice(vm.Item.indexOf(item), 1);
                        });
                }, function () {

                });

        };

        vm.onSort = function ($item, $partFrom, $partTo, $indexFrom, $indexTo) {
            FGS.sort(vm.Item)
                .then(function () {
                    Helpers.toast('Saved!');
                });

        };

        function onUploadDone(file, response, model) {
            if (typeof model == 'undefined'){
                model = [];
            }

            model.push(response);
        }
    }
})();
