(function() {
  'use strict';

  angular.module('mcms.components', [
      'thatisuday.dropzone'
  ])
      .config(config);

    config.$inject = ['dropzoneOpsProvider', 'configuration'];

    function config(DZOps, Config) {
        DZOps.setOptions({
            url : Config.imageUploadUrl,
            maxFilesize : '10'
    });
    }
})();

require('./modal');
require('./scrollTo.directive');
require('./header');
require('./footer');
require('./sideBarNav');
require('./goTo');
require('./uploadBox.directive');
require('./thumbUploadBox.component');
require('./imageUploader.component');
require('./dialog.component');
require('./bottomSheet.component');


