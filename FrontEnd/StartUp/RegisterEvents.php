<?php

namespace FrontEnd\StartUp;

use FrontEnd\Listeners\OptimizeImage;
use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\Events\Dispatcher as DispatcherContract;

class RegisterEvents
{
    public function handle(ServiceProvider $serviceProvider, DispatcherContract $events)
    {
        $events->listen('image.upload.done', OptimizeImage::class);
    }
}