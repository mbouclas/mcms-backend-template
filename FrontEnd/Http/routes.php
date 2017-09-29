<?php

Route::group(['middleware' => ['web']], function ($router) {
    $router->get('/', ['as' => 'home', 'uses'=> 'FrontEnd\Http\Controllers\HomeController@index']);
    $router->get('/contact', ['as' => 'contact', 'uses' => 'FrontEnd\Http\Controllers\ContactController@index']);
    $router->post('/contact', ['as' => 'contact', 'uses'=> 'FrontEnd\Http\Controllers\ContactController@post']);

    $router->get('/page/{slug}', ['as' => 'article', 'uses'=> 'FrontEnd\Http\Controllers\ArticleController@index']);
    $router->get('/pages/{slug}', ['as' => 'articles', 'uses'=> 'FrontEnd\Http\Controllers\ArticleController@articles']);
    $router->view('/search', 'articles.search');

    $router->get('/sitemap.xml', ['as' => 'sitemap', 'uses'=> 'FrontEnd\Http\Controllers\SiteMapController@index']);
    $router->get('/tag/{slug}', ['as' => 'tag', 'uses'=> 'FrontEnd\Http\Controllers\TagController@index']);
});




// Authentication Routes...
Route::get('login', 'Mcms\FrontEnd\Http\Controllers\Auth\AuthController@showLoginForm');
Route::post('login', 'Mcms\FrontEnd\Http\Controllers\Auth\AuthController@login');
Route::get('logout', 'Mcms\FrontEnd\Http\Controllers\Auth\AuthController@logout');

// Registration Routes...
Route::get('register', 'Mcms\FrontEnd\Http\Controllers\Auth\AuthController@showRegistrationForm');
Route::post('register', 'Mcms\FrontEnd\Http\Controllers\Auth\AuthController@register');

// Password Reset Routes...
Route::get('password/reset/{token?}', 'Mcms\FrontEnd\Http\Controllers\Auth\PasswordController@showResetForm');
Route::post('password/email', 'Mcms\FrontEnd\Http\Controllers\Auth\PasswordController@sendResetLinkEmail');
Route::post('password/reset', 'Mcms\FrontEnd\Http\Controllers\Auth\PasswordController@reset');