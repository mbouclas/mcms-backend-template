/*
var elixir = require('laravel-elixir');
var config = require('./gulpTasks/gulp.config');

var toConcat = require(config.js.srcDir + 'entry.js'),
    scripts = [];
for (var i in toConcat){
    scripts.push(config.js.srcDir + toConcat[i]);
}


elixir(function(mix) {
    mix.scripts(toConcat, 'public/js/scripts.min.js');
    mix.styles(styles, 'public/js/scripts.min.css');
});
*/
require('./gulpTasks');