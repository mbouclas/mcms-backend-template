<?php

namespace Mcms\Notifications\Service\Processors;


use Mcms\Notifications\Models\Notification;

class Slack
{
    public function handle(array $notificationType, Notification $notification)
    {
        // i will queue up this notification to be sent later on via sms
        print_r($notification->toArray());
    }
}