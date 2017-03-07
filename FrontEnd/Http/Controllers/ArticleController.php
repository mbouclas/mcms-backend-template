<?php

namespace FrontEnd\Http\Controllers;

use Config;
use Intervention\Image\Image;
use Mcms\Core\Services\Image\Resize;
use Mcms\Pages\Models\Filters\PageFilters;
use Mcms\Pages\Models\Page;
use Mcms\Pages\Models\PageCategory;
use Illuminate\Routing\Controller as BaseController;
use Mcms\Pages\Services\Page\PageService;
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
        $article = $pageService->model->with([
            'categories',
            'images',
            'related.item',
            'user'
        ])->where('slug', $slug)->first();

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
/*        \DB::listen(function ($query) {
            print_r($query->sql);
            print_r($query->bindings);
            // $query->time
        });*/
        $filters->request->merge(['category_id'=> $article->categories[0]->id]);

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

        if (isset( $article->thumb) && isset( $article->thumb['copies'])){
            $resizer = new Resize();
            $image = $resizer->image->make(public_path($article->thumb['copies']['originals']['url']));
            $article->img = [
                'width' => $image->width(),
                'height' => $image->height(),
                'type' => $image->mime()
            ];
        }

        return view('articles.article')
            ->with([
                'article' => $article,
                'related' => $related
            ]);
    }

    public function articles(PageFilters $filters, Page $page, PageCategory $pageCategory, $slug, Request $request)
    {
        $category = $pageCategory
            ->where('slug', $slug)
            ->first()
            ->itemCount();

        if ( ! $category){
            return abort(404);
        }

        $categories = [$category->id];

        if (! is_array($category->descendants)){
            $categories = array_merge($categories, $category->descendants->pluck('id')->toArray());
        }

        $request->merge(['category_id'=> implode(',', $categories)]);

        $articles = $page->with(['categories'])
            ->where('active', true)
            ->orderBy('published_at', 'DESC')
            ->filter($filters)
            ->paginate(Config::get('pages.items.per_page'));

        return view('articles.index')
            ->with([
                'category' => $category,
                'items' => $articles
            ]);
    }
}
