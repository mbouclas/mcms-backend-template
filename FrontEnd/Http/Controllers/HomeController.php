<?php

namespace FrontEnd\Http\Controllers;

use App\Http\Requests;
use IdeaSeven\FrontEnd\Services\EditableRegions;
use Illuminate\Routing\Controller as BaseController;
use IdeaSeven\Pages\Services\Page\PageService;
use Illuminate\Http\Request;

class HomeController extends BaseController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(EditableRegions $editableRegions, PageService $pageService)
    {
        $regions = $editableRegions->filter('frontPage')
            ->processRegions(['slider','latestBlogPosts', 'banners'])
            ->get(true);

        $articles = $pageService->model
            ->where('active', true)
            ->with(['categories'])
            ->take(5)
            ->orderBy('published_at', 'DESC')
            ->get();

        return view('home')
            ->with([
                'latestBlogPosts' => $regions['latestBlogPosts'],
                'latestArticles' => $articles,
                'sliderItems' => $regions['slider'],
                'banners' => $regions['banners'],
            ]);
    }
}
