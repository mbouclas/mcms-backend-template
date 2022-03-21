<?php

namespace FrontEnd\Http\Controllers\Astro;

use Mcms\Pages\Services\PageCategory\PageCategoryService;

class AstroCategoriesController
{
    public function index(PageCategoryService $service)
    {
        return response()->json([
            'flat' => $service->model->get(),
            'tree' => $service->model
                ->defaultOrder()
                ->get()
                ->toTree()
        ]) ;
    }
}