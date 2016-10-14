<?php

namespace FrontEnd\Http\Controllers;


use Config;
use Conner\Tagging\Model\Tag;
use IdeaSeven\Pages\Models\Page;
use Illuminate\Routing\Controller;

class TagController extends Controller
{

    public function index(Page $page, $tag)
    {
        $resultsPerPage = Config::get('pages.items.per_page');
        $Tag = Tag::where('slug', $tag)->first();
        $items = $page->withAnyTag($tag)->paginate($resultsPerPage);

        return view('tags.index')
            ->with([
                'items' => $items,
                'tag' => $Tag
            ]);
    }
}