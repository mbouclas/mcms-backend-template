let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */
const jsBasePath = 'resources/assets/js/';
const cssBasePath = 'resources/assets/css/';
mix
    .babel(`${jsBasePath}algolia.js`, `${jsBasePath}algolia.compiled.js`)
    .combine([
        `${jsBasePath}vendor/loadCSS.js`,
        `${jsBasePath}vendor/jquery-2.2.4.min.js`,
        `${jsBasePath}vendor/materialize.min.js`,
        `${jsBasePath}vendor/owl.carousel.min.js`,
        `${jsBasePath}vendor/jquery.touchwipe.min.js`,
        `${jsBasePath}vendor/jquery.magnific-popup.min.js`,
        `${jsBasePath}vendor/masonry.pkgd.min.js`,
        `${jsBasePath}vendor/instantsearch.min.js`,
        `${jsBasePath}main.js`,
        `${jsBasePath}algolia.compiled.js`
    ], 'public/dist/combined.js')
    .styles(
        [
            `${cssBasePath}bootstrap.min.css`,
            `${cssBasePath}materialize.css`,
            `${cssBasePath}font-awesome.min.css`,
            `${cssBasePath}owl.carousel.css`,
            `${cssBasePath}animate.min.css`,
            `${cssBasePath}magnific-popup.css`,
            `${cssBasePath}style.css`,
            `${cssBasePath}custom.css`
        ]
        , 'public/css/all.css')
    .disableNotifications();

// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.ts(src, output); <-- Requires tsconfig.json to exist in the same folder as webpack.mix.js
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.standaloneSass('src', output); <-- Faster, but isolated from Webpack.
// mix.fastSass('src', output); <-- Alias for mix.standaloneSass().
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.dev');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   uglify: {}, // Uglify-specific options. https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
