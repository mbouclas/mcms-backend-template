<?php

Route::group(['prefix' => 'admin/api'], function () {
    Route::group(['middleware' =>['level:2']], function($router)
    {
        $router->get('notifications/config', 'Mcms\Notifications\Http\Controllers\NotificationsController@config');
        $router->resource('notifications', 'Mcms\Notifications\Http\Controllers\NotificationsController');
    });

});