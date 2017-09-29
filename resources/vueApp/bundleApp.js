const browserify = require('browserify');
const vueify = require('vueify');
const babelify = require('babelify');
const fs = require("fs");
const path = require("path");
const gulp = require('gulp');
const source =  require('vinyl-source-stream');
const uglify          =  require('gulp-uglify');
const streamify       =  require('gulp-streamify');
const basePath = path.resolve('../../public','dist');


function build() {
    browserify('./app.js')
        .transform("babelify", {presets: ["es2015"]})
        .transform(vueify)
        .bundle()
        .pipe(source('app.min.js'))
        // .pipe(streamify(uglify()))
        .pipe(gulp.dest(basePath));

    console.log('build complete')
}


build();
const watcher = gulp.watch([
    `app.js`,
    `bootstrap.js`,
    `services/**/*.js`,
    `components/**/*.vue`,
]);

watcher.on('change', function(event) {
    build();

});



