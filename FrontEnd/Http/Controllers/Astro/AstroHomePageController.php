<?php

namespace FrontEnd\Http\Controllers\Astro;

use Mcms\FrontEnd\Services\EditableRegions;
use Mcms\Pages\Services\Page\PageService;

class AstroHomePageController
{
    public function __construct(

    )
    {

    }

    public function index(EditableRegions $editableRegions, PageService $pageService)
    {
        $regions = $editableRegions->filter('frontPage')
            ->processRegions(['slider','featuredBlogPosts', 'banners'])
            ->get(true);



        $articles = $pageService->model
            ->where('active', true)
            ->with(['categories'])
            ->take(5)
            ->orderBy('published_at', 'DESC')
            ->get();

        return response()->json($editableRegions->filter('frontPage')->get(false));
    }
}