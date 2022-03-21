global._ = require('lodash');
global.jQuery = global['$'] = require('jquery');
global.Dropzone = require('../bower_components/dropzone/downloads/dropzone');
Dropzone.autoDiscover = false;
require('angular');
require('angular-route');
require('angular-sanitize');
require('angular-messages');
require('angular-resource');
require('angular-animate');
require('angular-aria');
require('angular-material');
require('md-chips-select');
require('angular-translate');
require('ng-file-upload');
require('ng-sortable');
require('angular-hotkeys');
require('angular-sortable-view/src/angular-sortable-view.min');
require('angular-ui-tree/dist/angular-ui-tree.js');
require('../bower_components/angular-reverse-url/src/reverse_url');
require('../js/redactor/redactor.build');
require('../bower_components/angular-redactor/angular-redactor');



