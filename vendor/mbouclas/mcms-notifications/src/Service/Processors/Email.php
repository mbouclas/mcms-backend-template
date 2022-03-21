<?php

namespace Mcms\Notifications\Service\Processors;

use Mcms\Notifications\Service\Mail\EmailNotification;
use Mcms\Notifications\Service\NotificationService;
use Mail;

class Email
{
    protected $notificationService;

    public function __construct()
    {
        $this->notificationService = new NotificationService();
    }

    public function handle(array $notificationType, $id)
    {
        $notification = $this->notificationService->model->withCount('users')->find($id);
        // i will queue up this notification to be sent later on via email
        $userModel = config('auth.providers.users.model');
        $Users =  ($notification->users_count == 0) ? (new $userModel) : $notification->users();

        $Users->chunk(100, function ($users) use ($notification) {
            foreach ($users as $user) {
                $message = (new EmailNotification($notification))
                    ->onQueue('emails');

                Mail::to($user)
                    ->queue($message);
            }
        });

    }
}