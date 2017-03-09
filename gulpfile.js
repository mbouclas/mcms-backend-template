// require('./gulpTasks');
const elixir = require('laravel-elixir');

require('laravel-elixir-vue-2');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(mix => {
    mix.styles([
        'bootstrap.min.css',
        'materialize.css',
        'font-awesome.min.css',
        'owl.carousel.css',
        'animate.min.css',
        'magnific-popup.css',
        'style.css',
        'custom.css',
    ])
        .scripts([
            'vendor/loadcss',
            'vendor/jquery-2.2.4.min.js',
            'vendor/materialize.min.js',
            'vendor/owl.carousel.min.js',
            'vendor/jquery.touchwipe.min.js',
            'vendor/jquery.magnific-popup.min.js',
            'vendor/masonry.pkgd.min.js',
            'main.js',
        ])
        .webpack('app.js');
});
