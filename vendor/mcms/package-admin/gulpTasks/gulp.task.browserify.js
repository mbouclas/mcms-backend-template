module.exports = (function (gulp, config, $) {
    'use strict';

    return function () {

        $.log('Browserify');

        gulp.src(config.appDir + 'app.js')
            .pipe($.browserify({}))
            .pipe($.ngAnnotate({}))
            .pipe($.uglify({}))
            .pipe($.rename('admin.app.js'))
            .pipe(gulp.dest(config.publicDir + 'js/'));

        gulp.src(config.appDir + 'index.js')
            .pipe($.browserify({}))
            .pipe($.ngAnnotate({}))
            .pipe($.uglify({}))
            .pipe($.rename('admin.components.js'))
            .pipe(gulp.dest(config.publicDir + 'js/'));
    }


});
