<?php

namespace App;

use FrontEnd\Traits\Searchable;
use Mcms\Pages\Models\Page;
use Mcms\Pages\Models\PageCategory;

class AlgoliaPage extends Page
{
    use Searchable;

    public $casts = [
        'title' => 'array',
        'description' => 'array',
        'description_long' => 'array',
        'settings' => 'array',
        'thumb' => 'array',
        'active' => 'boolean'
    ];

    public $dates = [
      'created_at',
      'updated_at',
      'published_at'
    ];

    public function categories()
    {
        return $this->belongsToMany(PageCategory::class, 'page_page_category', 'page_id',
            'page_category_id')
            ->withPivot('main')
            ->withTimestamps();
    }

    public function toSearchableArray()
    {
        return [
//            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'slug' => $this->slug,
            'active' => $this->active,
            'user_id' => $this->user_id,
            'published_at' => $this->published_at->timestamp,
            'created_at' => $this->created_at->timestamp,
            'updated_at' => $this->updated_at->timestamp,
            'thumb' => $this->thumb,
            'categories' => $this->categories->map(function ($item){
                return $item->title;
            }),
            'tags' => $this->tagged->map(function ($item){
                return [
                    'label' => $item->tag_name,
                    'value' => $item->tag_slug
                ];
            })
        ];
    }
}
