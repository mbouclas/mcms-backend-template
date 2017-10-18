<?php

namespace FrontEnd\Jobs;


use FrontEnd\Mail\SimpleMail;
use Lang;
use Mail;

class SubscriberWelcomeMail
{
    public function handle($user, $subscriber, $formData)
    {
        Mail::to($user->email, $user->firstName . ' ' . $user->lastName)
            ->queue(new SimpleMail($formData, Lang::get('emails.subscribers.thanks.subject', [
                'name' => $formData['firstName']
            ]), 'emails.subscribers.welcome'));
    }
}