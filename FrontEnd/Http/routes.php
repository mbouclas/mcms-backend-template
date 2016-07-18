<?php
Route::get('/', ['as' => 'home', 'uses'=> 'FrontEnd\Http\Controllers\HomeController@index']);
Route::get('/article/{slug}', ['as' => 'article', 'uses'=> 'FrontEnd\Http\Controllers\ArticleController@index']);
Route::get('/articles/{slug}', ['as' => 'articles', 'uses'=> 'FrontEnd\Http\Controllers\ArticleController@articles']);