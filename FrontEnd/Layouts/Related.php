<?php

namespace FrontEnd\Layouts;

use Illuminate\Http\Request;
use Mcms\Pages\Models\Filters\PageFilters;
use Mcms\Pages\Models\Page;
use Mcms\Pages\Services\Page\PageService;


class Related
{
    public function handle(Request $request, Page $page, PageService $pageService, PageFilters $filters)
    {
        $related = [];
        $exclude = [$page->id];
        $request->merge(['category_id'=> $page->categories[0]->id]);
        if (isset($page->related) && count($page->related) > 0) {
            foreach ($page->related as $item) {
                $related[] = $item->item;
            }

            return $related;
        }

        $relatedGenerated = $pageService->model
            ->filter($filters)
            ->whereNotIn('id', $exclude)
            ->take(5)
            ->get();


        if ($relatedGenerated){
            foreach ($relatedGenerated as $item){
                $related[] = $item;
            }
        }



        return $related;
    }
}