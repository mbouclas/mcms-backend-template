<?php

namespace Mcms\Admin\Widgets;

use Arrilot\Widgets\AbstractWidget;
use Mcms\Core\Models\User;
use Widget;

class RecentNews extends AbstractWidget
{
    /**
     * The configuration array.
     *
     * @var array
     */
    protected $config = [
        'show' => 5,
        'users' => false
    ];

    /**
     * Treat this method as a controller action.
     * Return view() or other content to display.
     */
    public function run()
    {
        $users = [];
        if ($this->config['users']){
            $users =User::all();
        }





        return view("admin::widgets.recent-news", [
            'config' => $this->config,
            'users' => $users,
            'test' => "@Widget('otherNews')"
        ]);
    }
}