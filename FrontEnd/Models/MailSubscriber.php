<?php

namespace FrontEnd\Models;

use Config;
use Illuminate\Database\Eloquent\Model;

class MailSubscriber extends Model
{
    protected $table = 'mail_subscribers';
    protected $fillable = [
        'email',
        'service',
        'firstName',
        'lastName',
        'data',
        'converted_to_user',
        'user_id',
        'link_hash'
    ];

    public $casts = [
        'data' => 'array',
        'converted_to_user' => 'boolean'
    ];

    protected $dates = ['created_at', 'updated_at', 'converted_at'];


    public function user()
    {
        return $this->belongsTo(Config::get('auth.providers.users.model'), 'user_id');
    }
}
