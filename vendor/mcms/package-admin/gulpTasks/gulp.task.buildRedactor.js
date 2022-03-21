module.exports = (function (gulp, config, $) {
    'use strict';

    return function () {

        $.log('Building redactor');
        var js = [
            config.redactorDir + 'redactor.min.js',
            config.redactorDir + 'plugins/**/*.js'
        ],
            css = [
                config.redactorDir + 'redactor.css',
                config.redactorDir + 'plugins/**/*.css'
            ];

        gulp.src(js)
            .pipe($.concat('redactor.build.js'))
            .pipe($.uglify())
            // .pipe($.rename('redactor.build.js'))
            .pipe(gulp.dest(config.redactorDir));

        gulp.src(css)
            .pipe($.concat('redactor.build.css'))
            .pipe($.csso())
            // .pipe($.rename('redactor.build.css'))
            .pipe(gulp.dest(config.publicDir + 'js/'));
    }


});
