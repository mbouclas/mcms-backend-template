module.exports = (function (gulp,config,$) {
    'use strict';
console.log(config.optimizedDirJs)
    return function (){
        $.log('Copying minified files to production');
        return gulp
            .watch([
                config.optimizedDirJs,
                config.templatesDir
            ], ['copyToProduction','copyTemplatesToProduction']);
    }


});
