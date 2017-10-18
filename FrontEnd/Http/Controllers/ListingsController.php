<?php

namespace FrontEnd\Http\Controllers;


use Config;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Mcms\FrontEnd\Services\LayoutManager;
use Mcms\Listings\Models\Filters\ListingFilters;
use Mcms\Listings\Models\Listing;
use Mcms\Listings\Models\ListingCategory;

class ListingsController extends Controller
{
    public function index(ListingFilters $filters, Listing $listing, ListingCategory $listingCategory, $slug, Request $request)
    {
        $category = $listingCategory
            ->where('slug', $slug)
            ->first()
            ->itemCount();

        if (!$category) {
            return abort(404);
        }

        $categories = [$category->id];

        if (!is_array($category->descendants)) {
            $categories = array_merge($categories, $category->descendants->pluck('id')->toArray());
        }

        $request->merge([
            'category_id' => implode(',', $categories),
            'orderBy' => 'published_at'
        ]);

        $articles = $listing->with(['categories'])
            ->where('active', true)
//            ->orderBy('published_at', 'DESC')
            ->filter($filters)
            ->paginate(Config::get('listings.items.per_listing'));

        $view = (count($articles) > 0) ? 'articles.index' : 'articles.noArticlesFound';
        $itemList = [];
        $count = 1;

        if (isset($category->settings['Layout']) && isset($category->settings['Layout']['id'])){
            $layout = LayoutManager::registry($category->settings['Layout']['id'], true);
            if ($layout){
                $view = $layout['view'];
                if (isset($layout['handler'])){
                    $category->custom = $layout['handler']->handle($request, $category, $this->listingService, $filters);
                }
            }
        }

        foreach ($articles as $article) {
            $itemList[] = [
                '@type' => 'ListItem',
                'position' => $count,
                'url' => $article->getSlug()
            ];
        }
        return view($view)
            ->with([
                'category' => $category,
                'items' => $articles,
                'itemList' => json_encode($itemList)
            ]);
    }
}