<?php

namespace FrontEnd\Jobs;


use FrontEnd\Mail\SimpleMail;
use Lang;
use Mail;
use Mcms\Pages\Models\Page;

class ContestThankYouMail
{
    public $formData;
    public $item;

    public function handle($user, $subscriber, $formData)
    {
        if (!isset($formData['inject'])) {
            return;
        }

        $data = $formData['inject']['formData'];

        $this->item = Page::find($data['contestId']);
        $body = Lang::get('emails.contests.thanks.body', [
            'title' => $this->item->title,
            'url' => url($this->item->getSlug())
        ]);

        Mail::to($user->email, $user->firstName . ' ' . $user->lastName)
            ->queue(new SimpleMail(['body' => $body], Lang::get('emails.contests.thanks.subject', [
                'name' => $formData['firstName'],
                'title' => $this->item->title
            ]), 'emails.contests.thank-you-for-participating'));
    }

}