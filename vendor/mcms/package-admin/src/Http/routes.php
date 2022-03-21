<?php
Route::group(['prefix' => 'admin'], function () {
    Route::get('/', [
        'uses' => 'Mcms\Admin\Http\Controllers\AdminController@index',
        'as' => 'adminHome'
    ]);

    Route::group(['middleware' =>['guest']], function($router){
        $router->get('#/password/reset/{token}' ,[
            'uses' => 'Mcms\Admin\Http\Controllers\UserController@resetPassword',
            'as' => 'resetAdminPassword'
        ]);
    });



/*    Route::get('/elfinder/{input_id}', [
        'uses' => 'Barryvdh\Elfinder\ElfinderController@showPopup',
        'as' => 'showElFinder',
        'middleware' => 'role:admin',
    ]);*/

    Route::post('/login', [
        'uses' => 'Mcms\Admin\Http\Controllers\Auth\AuthController@login',
        'as' => 'admin-login'
    ]);

    Route::post('/logout', [
        'uses' => 'Mcms\Admin\Http\Controllers\Auth\AuthController@logout',
        'as' => 'admin-logout'
    ]);
});

Route::group(['prefix' => 'admin/api'], function () {
    Route::group(['middleware' =>['level:2']], function($router)
    {
        $router->post('user/validateField' ,'Mcms\Admin\Http\Controllers\UserController@validateField');
        $router->put('user/widgetPositions' ,'Mcms\Admin\Http\Controllers\UserController@widgetPositions');
        $router->post('image/sort','Mcms\Admin\Http\Controllers\ImageController@sort');
        $router->resource('image' ,'Mcms\Admin\Http\Controllers\ImageController');
        $router->post('files/sort','Mcms\Admin\Http\Controllers\FileController@sort');
        $router->resource('files' ,'Mcms\Admin\Http\Controllers\FileController');
        $router->post('mediaLibrary/upload' ,'Mcms\Admin\Http\Controllers\MediaLibraryController@upload');
        $router->get('mediaLibrary/tags' ,'Mcms\Admin\Http\Controllers\MediaLibraryController@tags');
        $router->post('mediaLibrary/assign' ,'Mcms\Admin\Http\Controllers\MediaLibraryController@assign');
        $router->resource('mediaLibrary' ,'Mcms\Admin\Http\Controllers\MediaLibraryController');
    });

    Route::group(['middleware' =>['level:50']], function($router)
    {
        $router->resource('user' ,'Mcms\Admin\Http\Controllers\UserController');
        $router->resource('menu' ,'Mcms\Admin\Http\Controllers\MenuController');
        $router->get('menuItem/filter','Mcms\Admin\Http\Controllers\MenuItemController@filter');
        $router->put('menuItem/rebuild','Mcms\Admin\Http\Controllers\MenuItemController@rebuild');
        $router->resource('menuItem' ,'Mcms\Admin\Http\Controllers\MenuItemController');
    });

    Route::group(['middleware' =>['level:98']], function($router)
    {

        $router->resource('role' ,'Mcms\Admin\Http\Controllers\RoleController');
        $router->resource('permission' ,'Mcms\Admin\Http\Controllers\PermissionController');
    });

    Route::group(['middleware' =>['guest']], function($router){
        $router->post('user/sendPasswordResetLink' ,'Mcms\Admin\Http\Controllers\UserController@sendPasswordResetLink');
        $router->post('user/resetPassword' ,'Mcms\Admin\Http\Controllers\UserController@resetPassword');
    });



    Route::get('translations-boot', [
        'uses' => 'Mcms\Core\Http\Controllers\TranslationsController@init',
        'as' => 'adminTranslationsBoot',
        'middleware' => 'role:admin',
    ]);



    Route::group(['prefix' => 'redactor'], function () {
        Route::get('clips.json', [
            'uses' => 'Mcms\Admin\Http\Controllers\RedactorController@clips',
            'as' => 'adminTranslationsBoot',
            'middleware' => 'role:admin',
        ]);
    });

});

