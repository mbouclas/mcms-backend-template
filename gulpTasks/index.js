var gulp = require('gulp');
var args = require('yargs').argv;
var path = require('path');
var fs = require('fs-extra');
var _ = require('lodash');
var $ = require('gulp-load-plugins')({lazy: true});
$.log = log;
$.clean = clean;
var Config = require('./gulp.config');

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

/**
 * CSS
 */
gulp.task('concat-css',[],require('./css/gulp.task.concat')(gulp,Config,$));

/**
 * JS
 */
gulp.task('concat-js',[],require('./js/gulp.task.concat')(gulp,Config,$));
/**
 * SASS
 */

/**
 * The Rest
 */

function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    fs.emptyDir(path,done);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}