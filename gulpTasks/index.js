const gulp = require('gulp');
const args = require('yargs').argv;
const path = require('path');
const fs = require('fs-extra');
const _ = require('lodash');
const $ = require('gulp-load-plugins')({lazy: true});
$.log = log;
$.clean = clean;
const Config = require('./gulp.config');

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
        for (const item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}