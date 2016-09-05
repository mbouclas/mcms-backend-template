<?php

namespace FrontEnd\Layouts;



use IdeaSeven\Pages\Models\Filters\PageFilters;
use IdeaSeven\Pages\Models\Page;
use IdeaSeven\Pages\Services\Page\PageService;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class PageById
{
    protected $layout;

    public function __construct(Collection $layout)
    {
        $this->layout = $layout;
    }

    public function handle(Request $request, Page $page, PageService $pageService, PageFilters $filters)
    {
        if (isset($page->settings['client'])){
            $client = Page::find($page->settings['client']);
            return ['client' => $client];
        }
    }
}