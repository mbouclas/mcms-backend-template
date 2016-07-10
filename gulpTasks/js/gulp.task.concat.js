module.exports = (function (gulp, config, $) {
    'use strict';

    return function () {

        $.log('Concat scripts');
        var toConcat = require(config.js.srcDir + 'entry.js'),
        scripts = [];
        for (var i in toConcat){
            scripts.push(config.js.srcDir + toConcat[i]);
        }

        gulp.src(scripts)
            .pipe($.concat('scripts.min.js'))
            .pipe($.uglify())
            .pipe(gulp.dest(config.js.destDir));

    }
});
