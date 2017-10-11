<?php

namespace FrontEnd\Mail;


use Config;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Lang;

class SimpleMail  extends Mailable
{
    use Queueable, SerializesModels;
    public $subject;
    public $view;
    public $body;

    public function __construct(array $body, $subject, $view = 'emails.notifications.contactForm')
    {
        $this->body = $body;
        $this->subject = $subject;
        $this->view = $view;
    }

    public function build()
    {
        return $this
            ->subject($this->subject)
            ->view($this->view);
    }
}