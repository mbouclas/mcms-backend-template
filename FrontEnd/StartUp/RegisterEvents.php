<?php

namespace FrontEnd\StartUp;

use FrontEnd\Listeners\OptimizeImage;
use FrontEnd\Listeners\PublishPageToAlgolia;
use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\Events\Dispatcher as DispatcherContract;

class RegisterEvents
{
    public function handle(ServiceProvider $serviceProvider, DispatcherContract $events)
    {
        $events->listen('image.uploaded', OptimizeImage::class);
        $events->listen('page.created', PublishPageToAlgolia::class);
        $events->listen('page.updated', PublishPageToAlgolia::class);
        $events->listen('page.destroyed', PublishPageToAlgolia::class);
    }
}