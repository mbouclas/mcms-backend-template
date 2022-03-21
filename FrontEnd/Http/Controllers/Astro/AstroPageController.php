<?php

namespace FrontEnd\Http\Controllers\Astro;

use Illuminate\Http\Request;
use Mcms\Pages\Services\Page\PageService;

class AstroPageController
{
    public function count(PageService $pageService)
    {
        return $pageService->model->count();
    }

    public function index(PageService $pageService, Request $request)
    {
        $limit = ($request->has('limit')) ? (int)$request->input('limit') : 10;

        return $pageService->model
            ->where('active', true)
            ->with(['related',
                'related.item',
                'images',
                'mainCategory',
                'categories',
                'dynamicTables',
                'galleries',
                'tagged',
                'files',
                'extraFields',
                'extraFields.field'])
            ->orderBy('published_at', 'DESC')
            ->paginate($limit);
    }
}