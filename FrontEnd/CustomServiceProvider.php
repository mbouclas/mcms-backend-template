<?php

namespace FrontEnd;


use IdeaSeven\FrontEnd\FrontEndServiceProvider;
use Illuminate\Contracts\Events\Dispatcher as DispatcherContract;
use Illuminate\Contracts\Auth\Access\Gate as GateContract;
use Illuminate\Routing\Router;

class CustomServiceProvider extends FrontEndServiceProvider
{
    protected $policies = [];
    protected $listeners = [];
    protected $commands = [];

    /**
     * Boot the service provider.
     *
     * @return void
     */
    public function boot(DispatcherContract $events, GateContract $gate, Router $router)
    {
        if (! $this->app->routesAreCached()) {
            require __DIR__.'/Http/routes.php';
        }
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