<?php

namespace FrontEnd\Http\Controllers;

use App;
use Config;
use FrontEnd\Helpers\ActiveStates;
use FrontEnd\Layouts\Related;
use Intervention\Image\Image;
use Mcms\FrontEnd\Services\EditableRegions;
use Mcms\FrontEnd\Services\LayoutManager;
use Mcms\Pages\Models\Filters\PageFilters;
use Mcms\Pages\Models\Page;
use Mcms\Pages\Models\PageCategory;
use Mcms\Pages\Services\Page\PageService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class PageController extends Controller
{
    protected $pageService;
     /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(PageService $pageService)
    {
        $this->pageService = $pageService;
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Page $page, PageFilters $filters, Request $request, $slug, EditableRegions $editableRegions)
    {
        $item = $this->pageService->model->with(['categories','images', 'related.item', 'tagged'])
            ->where('slug', $slug)
            ->first();

        if ( ! $item){
            //redirect 404
            return App::abort(404);
        }
        $view = 'pages.page';
        $related = [];

        //use this to check if the current page is in the menu (by category)
        ActiveStates::setPage(parse_url(route('pages',['slug' => $item->categories->first()->slug]))['path']);
        //figure out the layout
        if (isset($item->settings['Layout']) && isset($item->settings['Layout']['id'])){
            $layout = LayoutManager::registry($item->settings['Layout']['id'], true);
            if ($layout){
                $view = $layout['view'];
                if (isset($layout['handler'])){
                    $item->custom = $layout['handler']->handle($request, $item, $this->pageService, $filters);
                }
            }
        }

        if ((isset($layout) && isset($layout['settings']['showRelated']) && $layout['settings']['showRelated']) || ( ! isset($layout))){
            $related = (new Related())->handle($request, $item, $this->pageService, $filters);
        }

        $regions = [];
        if (isset($layout['settings']['editableRegions'])){
            $regions = $editableRegions->filter($layout['settings']['editableRegions'])
                ->get(true);
        }



        return view($view)
            ->with([
                'Item' => $item,
                'related' => $related,
                'regions' => $regions
            ]);
    }

    public function preview(Page $page, PageFilters $filters, Request $request, $id)
    {
        $article = $this->pageService->model->with(['categories','images', 'related.item'])->find($id);

        if ( ! $article){
            //redirect 404
        }
        $view = 'page.page';
        $related = [];

        //use this to check if the current page is in the menu (by category)

        //figure out the layout
        if (isset($article->settings['Layout']) && isset($article->settings['Layout']['id'])){
            $layout = LayoutManager::registry($article->settings['Layout']['id'], true);
            if ($layout){
                $view = $layout['view'];
                if (isset($layout['handler'])){
                    $article->custom = $layout['handler']->handle($request, $article, $this->pageService, $filters);
                }
            }
        }

        if ((isset($layout) && isset($layout['settings']['showRelated']) && $layout['settings']['showRelated']) || ( ! isset($layout))){
            $related = (new Related())->handle($request, $article, $this->pageService, $filters);
        }



        return view($view)
            ->with([
                'Item' => $article,
                'related' => $related
            ]);
    }

    public function pages(PageFilters $filters, Page $page, PageCategory $pageCategory, $slug, Request $request, EditableRegions $editableRegions)
    {
        $category = $pageCategory->with('descendants')->where('slug', $slug)->first();

        if ( ! $category){
            //redirect 404
            return App::abort(404);
        }

        $view = 'page.pages';
        $extras = [];
        if (isset($category->settings['Layout']) && isset($category->settings['Layout']['id'])){
            $layout = LayoutManager::registry($category->settings['Layout']['id'], true);
            if ($layout){
                $view = $layout['view'];
                if (isset($layout['handler'])){
                    $category->custom = $layout['handler']->handle($request, $category, $this->pageService, $filters);
                }
            }
        }

        $request->merge(['category_id'=> $category->id]);
        $resultsPerPage = (isset($category->settings['resultsPerPage'])) ? $category->settings['resultsPerPage'] : Config::get('pages.items.per_page');
        $pages = $page->with(['categories'])
            ->where('active', true)
            ->orderBy('published_at', 'DESC')
            ->filter($filters)
            ->paginate($resultsPerPage);

        $regions = [];

        if (isset($layout['settings']['editableRegions'])){
            $regions = $editableRegions->filter($layout['settings']['editableRegions'])
                ->get(true);
        }


        return view($view)
            ->with([
                'extras' => $extras,
                'category' => $category,
                'items' => $pages,
                'regions' => $regions
            ]);
    }
}
