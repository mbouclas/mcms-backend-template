<?php

namespace Mcms\Admin;

use Mcms\Admin\StartUp\RegisterAdminPackage;
use Mcms\Admin\StartUp\RegisterAuth;
use Mcms\Admin\StartUp\RegisterEvents;
use Mcms\Admin\StartUp\RegisterFacades;
use Mcms\Admin\StartUp\RegisterMiddleware;
use Mcms\Admin\StartUp\RegisterServiceProviders;
use Mcms\Admin\StartUp\RegisterWidgets;
use Illuminate\Support\ServiceProvider;
use \App;
use \Installer, \Widget;
use Illuminate\Contracts\Events\Dispatcher as DispatcherContract;
use Illuminate\Contracts\Auth\Access\Gate as GateContract;
use Illuminate\Routing\Router;

class AdminServiceProvider extends ServiceProvider
{
    /**
     * @var array
     */
    protected $commands = [
        \Mcms\Admin\Console\Commands\Install::class,
        \Mcms\Admin\Console\Commands\RefreshAssets::class,
    ];
    
    /**
     * Perform post-registration booting of services.
     *
     * @return void
     */
    public function boot(DispatcherContract $events, GateContract $gate, Router $router)
    {

        $this->publishes([
            __DIR__ . '/../config/config.php' => config_path('admin.php'),
            __DIR__ . '/../config/redactor.php' => config_path('redactor.php'),
            __DIR__ . '/../config/media_library.php' => config_path('media_library.php'),
        ], 'config');

        $this->publishes([
            __DIR__ . '/../database/migrations/' => database_path('migrations')
        ], 'migrations');

        $this->publishes([
            __DIR__ . '/../database/seeds/' => database_path('seeds')
        ], 'seeds');

        $this->publishes([
            __DIR__ . '/../resources/views' => resource_path('views/admin'),
        ], 'views');

        $this->publishes([
            __DIR__ . '/../resources/lang' => resource_path('lang'),
        ], 'lang');

        $this->publishes([
            __DIR__ . '/../resources/public' => public_path('package-admin'),
        ], 'public');

        $this->publishes([
            __DIR__ . '/../resources/assets' => public_path('package-admin'),
        ], 'assets');


        if (!$this->app->routesAreCached()) {
            $router->group([
                'middleware' => 'web',
            ], function ($router) {
                require __DIR__.'/Http/routes.php';
            });

            $router->group([
                'prefix' => 'api',
                'middleware' => ['api', 'jwt.auth'],
            ], function ($router) {
                require __DIR__.'/Http/api.php';
            });

            $this->loadViewsFrom(__DIR__ . '/../resources/views', 'admin');
        }

        /**
         * Register Auth and policies exceptions
         */
        (new RegisterAuth())->handle($gate);
        
        /**
         * Register any widgets
         */
        (new RegisterWidgets())->handle();

        /**
         * Register Events
         */
//        parent::boot($events);
        (new RegisterEvents())->handle($this, $events);

        /*
         * Register dependencies
        */
        (new RegisterServiceProviders())->handle();

        /*
         * Register middleware
        */
        (new RegisterMiddleware())->handle($this, $router);

        /**
         * Register admin package
         */
        (new RegisterAdminPackage())->handle($this);
    }

    /**
     * Register any package services.
     *
     * @return void
     */
    public function register()
    {
        /*
        * Register Commands
        */
        $this->commands($this->commands);

        /**
         * Register Facades
         */
        (new RegisterFacades())->handle($this);

        /**
         * Register installer
         */
        Installer::register(\Mcms\Admin\Installer\Install::class);
    }
}
