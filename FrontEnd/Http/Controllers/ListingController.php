<?php

namespace FrontEnd\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Mcms\Core\Services\Image\Resize;
use Mcms\FrontEnd\Services\LayoutManager;
use Mcms\Listings\Models\Filters\ListingFilters;
use Mcms\Listings\Models\Listing;
use Mcms\Listings\Services\Listing\ListingService;

class ListingController extends Controller
{
    public function index(ListingService $listingService, Listing $listing, $slug, ListingFilters $filters, Request $request)
    {
        $article = $listingService->model->with([
            'categories',
            'images',
            'related.item',
            'user'
        ])->where('slug', $slug)->first();

        if (!$article) {
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
        $filters->request->merge(['category_id' => $article->categories[0]->id]);

        $relatedGenerated = $listingService->model
            ->filter($filters)
            ->where('active', true)
            ->whereNotIn('id', $exclude)
            ->take(5)
            ->get();

        if ($relatedGenerated) {
            foreach ($relatedGenerated as $item) {
                $related[] = $item;
            }
        }


        $view = 'articles.article';
        $info = [];
        $logo = null;
        if (isset($article->settings['Layout']) && isset($article->settings['Layout']['id'])){
            $layout = LayoutManager::registry($article->settings['Layout']['id'], true);

            if ($layout && isset($layout['view'])){
                $view = $layout['view'];
                if (isset($layout['handler'])){
                    $article->custom = $layout['handler']->handle($request, $article, $listingService, $filters);
                }
            }

            foreach ($layout['config'] as $key  => $item) {
                if (isset($article->settings['Layout'][$item['varName']])) {
                    $info[$item['varName']] = $item;
                    $info[$item['varName']]['value'] = $article->settings['Layout'][$item['varName']];
                }

                if ($item['varName'] == 'logo' && isset($article->settings['Layout'][$item['varName']]['src'])) {
                    $logo = $article->settings['Layout'][$item['varName']];
                }
            }
        }

        return view($view)
            ->with([
                'article' => $article,
                'related' => $related,
                'url' => url($article->getSlug()),
                'info' => $info,
                'logo' => $logo
            ]);
    }
}