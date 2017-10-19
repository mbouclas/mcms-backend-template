<?php

namespace FrontEnd\Jobs;


use FrontEnd\Models\Contest;

class ContestAddUser
{
    public function handle($user, $subscriber, $formData)
    {
        if (!isset($formData['inject'])) {
            return;
        }

        $data = $formData['inject']['formData'];

        Contest::create([
            'email' => $formData['email'],
            'contest_id' => $data['contestId'],
            'user_id' => $user->id,
            'subscriber_id' => $subscriber->id,
        ]);
    }
}