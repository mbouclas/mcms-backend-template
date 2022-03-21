<?php

namespace Mcms\Admin\StartUp;

use Mcms\Admin\MediaLibrary\MediaLibrary;
use Illuminate\Contracts\Events\Dispatcher as DispatcherContract;
use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;

/**
 * Register your events here
 * Class RegisterEvents
 * @package Mcms\Admin\StartUp
 */
class RegisterEvents
{
    /**
     * @param ServiceProvider $serviceProvider
     * @param DispatcherContract $events
     */
    public function handle(ServiceProvider $serviceProvider, DispatcherContract $events)
    {
        $events->listen('image.upload.started', function (Request $request) {
            // add to media library
            (new MediaLibrary())->upload($request);
        });

        $events->listen('file.upload.started', function (Request $request) {
            // add to media library
            (new MediaLibrary())->upload($request);
        });
    }
}