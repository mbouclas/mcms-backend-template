<?php

namespace FrontEnd\Layouts;


use IdeaSeven\Pages\Models\Filters\PageFilters;
use IdeaSeven\Pages\Models\PageCategory;
use IdeaSeven\Pages\Services\Page\PageService;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class ListingsCategory
{
    protected $layout;

    public function __construct(Collection $layout)
    {
        $this->layout = $layout;
    }

    public function handle(Request $request, PageCategory $pageCategory, PageService $pageService, PageFilters $filters)
    {
        return [
            'subCategories' => $pageCategory->itemCount($pageCategory->id)
        ];
    }
}