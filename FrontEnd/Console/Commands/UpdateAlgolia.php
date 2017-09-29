<?php

namespace FrontEnd\Console\Commands;


use App\AlgoliaPage;
use Illuminate\Console\Command;
use Mcms\Pages\Models\Page;

class UpdateAlgolia extends Command
{
    protected $actions = [

    ];

    protected $signature = 'scout:update-all';

    protected $description = 'Update all models the manual way';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        foreach (Page::with(['tagged', 'categories'])->where('active', true)->cursor() as $page) {
            $record = new AlgoliaPage($page->toArray());
            $record->id = $page->id;
            $record->tagged = $page->tagged;
            $record->created_at = $page->created_at;
            $record->updated_at = $page->updated_at;
            $record->published_at = $page->published_at;
            $record->searchable();
            $this->comment("{$page->id} done");
        }

        $this->info('all done');
    }
}