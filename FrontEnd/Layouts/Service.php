<?php

namespace FrontEnd\Layouts;


use Mcms\Pages\Models\Filters\PageFilters;
use Mcms\Pages\Models\Page;
use Mcms\Pages\Models\PageCategory;
use Mcms\Pages\Services\Page\PageService;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class Service
{

    public function handle(Request $request, Page $page, PageService $pageService, PageFilters $filters)
    {

        $category = PageCategory::where('slug','prosferoyme')->first();
        if ( ! $category){
            return new Collection();
        }

        $related = Page::where('active', true);
        $related = $related->whereHas('categories', function ($q) use ($category){
            $q->where('page_category_id', $category->id);
        });

        return $related->get();

    }
}