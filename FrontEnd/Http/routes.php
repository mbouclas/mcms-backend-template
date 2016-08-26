<?php
Route::get('/', ['as' => 'home', 'uses'=> 'FrontEnd\Http\Controllers\HomeController@index']);
Route::group(['middleware' => ['web']], function () {
    Route::get('/contact', ['as' => 'contact', 'uses' => 'FrontEnd\Http\Controllers\ContactController@index']);
    Route::post('/contact', ['as' => 'contact', 'uses'=> 'FrontEnd\Http\Controllers\ContactController@post']);
});

Route::get('/page/{slug}', ['as' => 'article', 'uses'=> 'FrontEnd\Http\Controllers\ArticleController@index']);
Route::get('/pages/{slug}', ['as' => 'articles', 'uses'=> 'FrontEnd\Http\Controllers\ArticleController@articles']);

Route::get('/sitemap.xml', ['as' => 'sitemap', 'uses'=> 'FrontEnd\Http\Controllers\SiteMapController@index']);
Route::get('/tag/{slug}', ['as' => 'tag', 'uses'=> 'FrontEnd\Http\Controllers\TagController@index']);


// Authentication Routes...
Route::get('login', 'IdeaSeven\FrontEnd\Http\Controllers\Auth\AuthController@showLoginForm');
Route::post('login', 'IdeaSeven\FrontEnd\Http\Controllers\Auth\AuthController@login');
Route::get('logout', 'IdeaSeven\FrontEnd\Http\Controllers\Auth\AuthController@logout');

// Registration Routes...
Route::get('register', 'IdeaSeven\FrontEnd\Http\Controllers\Auth\AuthController@showRegistrationForm');
Route::post('register', 'IdeaSeven\FrontEnd\Http\Controllers\Auth\AuthController@register');

// Password Reset Routes...
Route::get('password/reset/{token?}', 'IdeaSeven\FrontEnd\Http\Controllers\Auth\PasswordController@showResetForm');
Route::post('password/email', 'IdeaSeven\FrontEnd\Http\Controllers\Auth\PasswordController@sendResetLinkEmail');
Route::post('password/reset', 'IdeaSeven\FrontEnd\Http\Controllers\Auth\PasswordController@reset');