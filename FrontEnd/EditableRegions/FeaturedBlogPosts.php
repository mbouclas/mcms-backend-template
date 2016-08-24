<?php

namespace FrontEnd\EditableRegions;


use IdeaSeven\Pages\Models\Filters\PageFilters;
use IdeaSeven\Pages\Models\Page;
use IdeaSeven\Pages\Models\PageCategory;
use IdeaSeven\Pages\Services\Page\PageService;
use Illuminate\Http\Request;

class FeaturedBlogPosts
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
        $catids = PageCategory::where('parent_id', 2)->select(['id'])->get()->toArray();

        $this->request->replace(['category_id' => $catids[rand(0, count($catids)-1)]]);
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

        $pages = $this->page->filter($this->filters)->take($take)->get();

//        return Page::where
        return $pages;
    }
}