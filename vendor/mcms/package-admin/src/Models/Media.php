<?php

namespace Mcms\Admin\Models;
use Conner\Tagging\Taggable;
use Mcms\Core\QueryFilters\Filterable;
use Spatie\MediaLibrary\Media as BaseMedia;

class Media extends BaseMedia
{
    use Filterable, Taggable;
    protected $fillable = ['orderBy', 'active'];
}