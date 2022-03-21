<?php

namespace Mcms\Notifications\StartUp;

use Widget;

class RegisterWidgets
{
    public function handle()
    {
        Widget::create([
            'name' => 'recentNews',
            'instance' => \Mcms\Notifications\Widgets\RecentNews::class
        ]);

        Widget::create([
            'name' => 'otherNews',
            'instance' => \Mcms\Notifications\Widgets\RecentNews::class
        ]);
    }
}