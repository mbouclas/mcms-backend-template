<?php

namespace FrontEnd\StartUp;

use FrontEnd\Listeners\TinyPng;
use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\Events\Dispatcher as DispatcherContract;

class RegisterEvents
{
    public function handle(ServiceProvider $serviceProvider, DispatcherContract $events)
    {
/*        $events->listen('image.upload.done', function ($image) {
            //
            print_r($image);
        });*/
        $events->listen('image.upload.done', TinyPng::class);
    }
}