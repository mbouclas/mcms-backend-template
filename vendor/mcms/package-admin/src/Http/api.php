<?php
Route::group(['middleware' =>['gate:menu.menu']], function($router)
{
    $router->resource('menu' ,'Mcms\Admin\Http\Controllers\MenuController');
    $router->get('menuItem/filter','Mcms\Admin\Http\Controllers\MenuItemController@filter');
    $router->put('menuItem/rebuild','Mcms\Admin\Http\Controllers\MenuItemController@rebuild');
    $router->resource('menuItem' ,'Mcms\Admin\Http\Controllers\MenuItemController');
});
