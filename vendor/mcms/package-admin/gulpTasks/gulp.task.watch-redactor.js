module.exports = (function (gulp,config,$) {
    'use strict';

    return function (){

        $.log('Watching Redactor');
        return gulp
            .watch(config.redactorDir + 'plugins/**/*.js', ['buildRedactor']);
    }


});
