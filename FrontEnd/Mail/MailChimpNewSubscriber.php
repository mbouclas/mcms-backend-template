<?php

namespace FrontEnd\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Lang;
use Mcms\FrontEnd\UserRegistration\SendMailViaConfig;

class MailChimpNewSubscriber extends Mailable
{
    use Queueable, SerializesModels;

    protected $mailChimpData;
    public $name;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(array $mailChimpData)
    {
        $this->mailChimpData = $mailChimpData;
//        $this->name = $mailChimpData['merges']['FNAME']. ' ' . $mailChimpData['merges']['LNAME'];
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $mailer = new SendMailViaConfig();
        return $this
            ->subject(Lang::get('emails.subscribers.welcome.subject', ['name' => $this->name]))
            ->from($mailer->formAdminUser())
            ->with('data', $this->mailChimpData)
            ->view('emails.notifications.mailChimpNewSubscriber');
    }
}
