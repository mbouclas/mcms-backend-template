<?php

namespace Mcms\Notifications;


use Mcms\Notifications\StartUp\RegisterAdminPackage;
use Mcms\Notifications\StartUp\RegisterEvents;
use Mcms\Notifications\StartUp\RegisterFacades;
use Mcms\Notifications\StartUp\RegisterMiddleware;
use Mcms\Notifications\StartUp\RegisterServiceProviders;
use Mcms\Notifications\StartUp\RegisterSettingsManager;
use Mcms\Notifications\StartUp\RegisterWidgets;
use Illuminate\Support\ServiceProvider;
use \App;
use \Installer, \Widget;
use Illuminate\Contracts\Events\Dispatcher as DispatcherContract;
use Illuminate\Contracts\Auth\Access\Gate as GateContract;
use Illuminate\Routing\Router;

class NotificationsServiceProvider extends ServiceProvider
{
    /**
     * @var array
     */
    protected $commands = [
        \Mcms\Notifications\Console\Commands\Install::class,
        \Mcms\Notifications\Console\Commands\RefreshAssets::class,
    ];

    public $packageName = 'mcmsNotifications';

    /**
     * Perform post-registration booting of services.
     *
     * @return void
     */
    public function boot(DispatcherContract $events, GateContract $gate, Router $router)
    {
        $this->publishes([
            __DIR__ . '/../config/config.php' => config_path('mcmsNotifications.php'),
        ], 'config');

        $this->publishes([
            __DIR__ . '/../database/migrations/' => database_path('migrations')
        ], 'migrations');

        $this->publishes([
            __DIR__ . '/../database/seeds/' => database_path('seeds')
        ], 'seeds');

        $this->publishes([
            __DIR__ . '/../resources/views' => resource_path('views/vendor/mcms/notifications'),
        ], 'views');

        $this->publishes([
            __DIR__ . '/../resources/lang' => resource_path('lang'),
        ], 'lang');

        $this->publishes([
            __DIR__ . '/../resources/public' => public_path('vendor/mcms/notifications'),
        ], 'public');

        $this->publishes([
            __DIR__ . '/../resources/assets' => public_path('vendor/mcms/notifications'),
        ], 'assets');

        $this->publishes([
            __DIR__ . '/../config/admin.package.json' => storage_path('app/mcms/notifications/admin.package.json'),
        ], 'admin-package');


        if (!$this->app->routesAreCached()) {
            $router->group([
                'middleware' => 'web',
            ], function ($router) {
                require __DIR__.'/Http/routes.php';
            });

            $this->loadViewsFrom(__DIR__ . '/../resources/views', 'mcmsNotifications');
        }

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

        (new RegisterSettingsManager())->handle($this);
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
        Installer::register(\Mcms\Notifications\Installer\Install::class);

    }
}
