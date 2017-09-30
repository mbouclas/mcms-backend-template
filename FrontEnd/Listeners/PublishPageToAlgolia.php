<?php

namespace FrontEnd\Listeners;


use App\AlgoliaPage;

class PublishPageToAlgolia
{
    public function handle($page)
    {
        if (getenv('APP_ENV') != 'production') {
            return;
        }

        $record = new AlgoliaPage($page->toArray());
        $record->id = $page->id;
        $record->tagged = $page->tagged;
        $record->created_at = $page->created_at;
        $record->updated_at = $page->updated_at;
        $record->published_at = $page->published_at;
        $record->searchable();
    }

}