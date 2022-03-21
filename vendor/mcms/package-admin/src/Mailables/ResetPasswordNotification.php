<?php

namespace Mcms\Admin\Mailables;


use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordNotification extends ResetPassword
{
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->line('You are receiving this email because we received a password reset request for your account.')
            ->action('Reset Password', str_replace('/#/' ,'#/', route('resetAdminPassword', ['token' => $this->token])))
            ->line('If you did not request a password reset, no further action is required.');
    }
}