<?php

namespace FrontEnd\Jobs;

use Config;
use FrontEnd\Helpers\MailChimpHelper;
use FrontEnd\Mail\SimpleMail;
use FrontEnd\Models\MailSubscriber;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Lang;
use Mail;
use Mcms\Core\Models\Role;
use Mcms\Core\Services\User\UserService;


class FinishSubscription implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $formData;

    public function __construct(array $formData)
    {
        $this->formData = $formData;
    }

    public function handle()
    {
        // send the details to mailChimp
        $updateResult = (new MailChimpHelper())->update($this->formData);
        $query = (isset($this->formData['inject']) && isset($this->formData['inject']['link_hash'])) ?
            ['link_hash' => $this->formData['inject']['link_hash']] :
            ['email' => $this->formData['email']];

        // update our subscriber list
        $subscriber = MailSubscriber::where($query)->first();

        // create a new one
        if ( ! $subscriber) {
            $subscriber = MailSubscriber::create([
                'email' => $this->formData['email'],
                'service' => 'mailchimp',
                'firstName' => $this->formData['firstName'],
                'lastName' => $this->formData['lastName'],
                'data' => $updateResult
            ]);
        } else {
            $subscriber->firstName = $this->formData['firstName'];
            $subscriber->lastName = $this->formData['lastName'];
            $subscriber->data = $updateResult;
            $subscriber->link_hash = null;
            $subscriber->save();
        }

        $userService = new UserService();
        $user = $userService->model->where('email', $this->formData['email'])->first();
        // create a user
        if ( ! $user) {
            $username = explode('@', $this->formData['email']);
            $role = Role::where('name', 'user')->first();
            $user = $userService->store([
                'email' => $this->formData['email'],
                'password' => str_random(12),
                'firstName' => $this->formData['firstName'],
                'lastName' => $this->formData['lastName'],
                'username' => $username[0],
                'roles' => [['id' => $role->id]]
            ]);

            $subscriber->update(['user_id' => $user->id]);

            // Send welcome mail
            Mail::to(Config::get('mail.from.address'), Config::get('mail.from.name'))
                ->queue(new SimpleMail($this->formData, Lang::get('emails.subscribers.thanks.subject', [
                    'name' => $this->formData['firstName']
                ]), 'emails.subscribers.welcome'));
        }
    }
}