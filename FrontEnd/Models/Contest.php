<?php

namespace FrontEnd\Models;

use Illuminate\Database\Eloquent\Model;
use Mcms\Core\Traits\Userable;
use Mcms\Pages\Models\Page;

class Contest extends Model
{
    use Userable;

    protected $table = 'contests';
    protected $fillable = [
        'email',
        'contest_id',
        'user_id',
        'subscriber_id',
    ];

    protected $dates = ['created_at', 'updated_at'];

    public function subscriber()
    {
        return $this->belongsTo(MailSubscriber::class, 'subscriber_id');
    }

    public function contest()
    {
        return $this->belongsTo(Page::class, 'contest_id');
    }
}
