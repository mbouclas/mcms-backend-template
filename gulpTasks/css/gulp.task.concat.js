module.exports = (function (gulp, config, $) {
    'use strict';

    return function () {

        $.log('Concat css');
        var toConcat = require(config.css.srcDir + 'entry.js'),
        files = [];
        for (var i in toConcat){
            files.push(config.css.srcDir + toConcat[i]);
        }

        gulp.src(files)
            .pipe($.concat('styles.min.css'))
            .pipe($.csso())
            .pipe(gulp.dest(config.css.destDir));

    }
});
