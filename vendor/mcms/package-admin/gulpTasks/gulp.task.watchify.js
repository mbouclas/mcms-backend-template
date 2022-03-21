module.exports = (function (gulp,config,$) {
    'use strict';
    var path = require('path');
    var browserify = require('browserify');
    var ngannotate = require('browserify-ngannotate');
    var debowerify = require('debowerify');
    var uglifyify = require('uglifyify');
    var watchify = require('watchify');
    var source = require('vinyl-source-stream');

    return function (){

        $.log('watch for angular everything');

        var bundler = watchify(config.appDir + 'app.js');

        function gulpBundle() {
            return bundler.bundle({
                // insertGlobals: true,
                debug: true
            })
                .pipe(source(config.appDir))
                .pipe(gulp.dest(config.InstallationDir));
        }

        bundler
            .transform(ngannotate)
            .transform(uglifyify)
            .transform(debowerify)
            .on('update', gulpBundle);

        return gulpBundle();
    }


});
