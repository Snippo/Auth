const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

 var baseDir = 'resources/assets/';
 var bowerDir = 'resources/assets/bower/';

 mix.copyDirectory('resources/assets/js', 'public/js')
 .copy(bowerDir + 'bootstrap/fonts', 'public/fonts')
 .copy('resources/assets/views', 'public/views')
 .scripts([
   'resources/assets/bower/jquery/dist/jquery.min.js',
   'resources/assets/bower/angular/angular.js',
   'resources/assets/bower/bootstrap/dist/js/bootstrap.min.js',
   'resources/assets/bower/ngstorage/ngStorage.min.js',
   'resources/assets/bower/angular-bootstrap/ui-bootstrap-tpls.min.js',
   'resources/assets/bower/satellizer/dist/satellizer.min.js',
   'resources/assets/bower/ui-router/release/angular-ui-router.min.js'
 ], 'public/js/all.js')
 .styles([
   'resources/assets/bower/bootstrap/dist/css/bootstrap.min.css'
 ], 'public/css/all.css');
