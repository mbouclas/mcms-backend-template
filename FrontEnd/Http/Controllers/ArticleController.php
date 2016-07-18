<?php

namespace FrontEnd\Http\Controllers;

use App\Http\Requests;
use Config;
use IdeaSeven\Pages\Models\Filters\PageFilters;
use IdeaSeven\Pages\Models\Page;
use IdeaSeven\Pages\Models\PageCategory;
use IdeaSeven\Pages\Services\PageCategory\PageCategoryService;
use Illuminate\Routing\Controller as BaseController;
use IdeaSeven\Pages\Services\Page\PageService;
use Illuminate\Http\Request;

class ArticleController extends BaseController
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
    public function index(PageService $pageService, Page $page, $slug, PageFilters $filters, Request $request)
    {
        $article = $pageService->model->with(['categories','images', 'related.item'])->where('slug', $slug)->first();

        if ( ! $article){
            //redirect 404
        }
        $related = [];
        $exclude = [$article->id];

        if (isset($article->related) && count($article->related) > 0) {
            foreach ($article->related as $item) {
                $related[] = $item->item;
                $exclude[] = $item->item_id;
            }
        }

        $request->merge(['category_id'=> $article->categories[0]->id]);
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

        return view('articles.article')
            ->with([
                'article' => $article,
                'related' => $related
            ]);
    }

    public function articles(PageFilters $filters, Page $page, PageCategory $pageCategory, $slug, Request $request)
    {
        $category = $pageCategory->where('slug', $slug)->first();
        $request->merge(['category_id'=> $category->id]);

        $articles = $page->with(['categories'])
            ->filter($filters)
            ->paginate(Config::get('pages.items.per_page'));



        return view('articles.index')
            ->with([
                'category' => $category,
                'items' => $articles
            ]);
    }
}
