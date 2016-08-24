<?php

namespace FrontEnd\EditableRegions;

use IdeaSeven\Pages\Models\Filters\PageFilters;
use IdeaSeven\Pages\Models\Page;
use IdeaSeven\Pages\Models\PageCategory;
use IdeaSeven\Pages\Services\Page\PageService;
use Illuminate\Http\Request;

class LatestBlogPosts
{
    protected $filters;
    protected $page;
    protected $request;

    public function __construct(Page $page, PageFilters $filters, Request $request)
    {
        $this->filters = $filters;
        $this->page = $page;
        $this->request = $request;
    }
    public function handle($region)
    {

        $take = 0;
        if (isset($region['settings']['limit'])){
            $take = $region['settings']['limit'];
        } else {
            foreach ($region['options'] as $item) {
                if ($item['varName'] == 'limit'){
                    $take = $item['default'];
                }
            }
        }

        $pages = $this->page
            ->where('active',true)
            ->orderBy('published_at', 'DESC')
            ->take($take)
            ->get();

//        return Page::where
        return $pages;
    }
}