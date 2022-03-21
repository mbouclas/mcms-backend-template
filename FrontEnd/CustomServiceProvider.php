<?php

namespace FrontEnd;


use FrontEnd\Console\Commands\ImageOptimizer;
use FrontEnd\Console\Commands\ResizeImages;
use FrontEnd\Console\Commands\UpdateAlgolia;
use FrontEnd\StartUp\RegisterAdminPackage;
use FrontEnd\StartUp\RegisterAuth;
use FrontEnd\StartUp\RegisterEvents;
use FrontEnd\StartUp\RegisterMiddleware;
use Illuminate\Contracts\Events\Dispatcher as DispatcherContract;
use Illuminate\Contracts\Auth\Access\Gate as GateContract;
use Illuminate\Routing\Router;
use Illuminate\Support\ServiceProvider;
use ModuleRegistry;

class CustomServiceProvider extends ServiceProvider
{
    protected $policies = [];
    protected $listeners = [];
    protected $commands = [
        ImageOptimizer::class,
        UpdateAlgolia::class,
        ResizeImages::class
    ];
    public $packageName = 'custom';


    /**
     * Boot the service provider.
     *
     * @return void
     */
    public function boot(DispatcherContract $events, GateContract $gate, Router $router, \Illuminate\Contracts\Http\Kernel $kernel)
    {
        $this->publishes([
            __DIR__ . '/../resources/assets/builder' => public_path('package-builder'),
        ], 'public');

        if (! $this->app->routesAreCached()) {
            require __DIR__.'/Http/routes.php';
        }
        (new RegisterAuth())->handle($gate);
        (new RegisterEvents())->handle($this,$events);
        (new RegisterAdminPackage())->handle($this);
        (new RegisterMiddleware())->handle($this,$router, $kernel);
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->commands($this->commands);
    }
}