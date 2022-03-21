$.Redactor.prototype.mediaLibrary = function () {
    return {
        getTemplate:function()
        {
            return String() + '<div style="padding-left: 10px; padding-right: 10px"><media-library-contents on-select="onMediaLibrarySelected(item)"></media-library-contents></div>';
        },
        init: function () {
            var button = this.button.add('mediaLibrary','Media Library');
            this.button.changeIcon('mediaLibrary', 'image');
            this.button.addCallback(button, this.mediaLibrary.show);
        },
        show : function () {
            var _this = this;
            angular.element(document).injector().invoke(['$compile', function ($compile) {
                // Create a scope.

                var $scope = angular.element(document.body).scope();
                $scope.onMediaLibrarySelected = function (item) {
                    _this.image.insert('<img src="' + item.original +'" alt="' + item.name +'">');
                };

                // Specify what it is we'll be compiling.
                var to_compile = _this.mediaLibrary.getTemplate();
                // Compile the tag, retrieving the compiled output.
                var $compiled = $compile(to_compile)($scope);
                // Ensure the scope and been signalled to digest our data.
                $scope.$digest();
                // Append the compiled output to the page.
                // $compiled.appendTo($('#redactor-modal-body'));

                _this.modal.addTemplate('mediaLibrary', $compiled);

                _this.modal.load('mediaLibrary','MediaLibraryModal', 600);
                _this.modal.createCancelButton();
                var button = _this.modal.createActionButton('Insert');
                button.on('click',_this.mediaLibrary.insert);
                _this.selection.save();
                _this.modal.show();
            }]);



        }
    };
};
