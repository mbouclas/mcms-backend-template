<?php

namespace FrontEnd\Http\Controllers;

use App\Http\Requests;
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
    public function index(PageService $pageService)
    {
        $articles = $pageService->model
            ->with(['categories'])
            ->take(5)
            ->orderBy('created_at', 'DESC')
            ->get();

        return view('home')
            ->with([
                'latestArticles' => $articles
            ]);
    }
}
