<?php

namespace Mcms\Notifications\Service\Mail;

use Mcms\Notifications\Models\Notification;
use Mcms\Core\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class EmailNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $item;
    public $author;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Notification $item)
    {
        $this->item = $item;
        $this->author = User::find($item->user_id);
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $from = new User([
            'email' => \Config::get('mail.from.address'),
            'name' => \Config::get('mail.from.name'),
        ]);

        return $this
            ->subject($this->item->title)
            ->from($from)
            ->view('emails.userNotifications.emailNotification');
    }
}
