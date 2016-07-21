<?php

namespace FrontEnd\Services;
use Carbon\Carbon;
use IdeaSeven\Pages\Models\Page;
use Illuminate\Support\Facades\Cache;

class SiteMap
{
    /**
     * Return the content of the Site Map
     */
    public function getSiteMap()
    {
        if (Cache::has('site-map')) {
            return Cache::get('site-map');
        }

        $siteMap = $this->buildSiteMap();
        Cache::add('site-map', $siteMap, 120);
        return $siteMap;
    }

    /**
     * Build the Site Map
     */
    protected function buildSiteMap()
    {
        $postsInfo = $this->getPostsInfo();
        foreach ($postsInfo as $post){
            $dates[] = $post->updated_at;
        }
        sort($dates);
        $lastmod = last($dates);

        $url = str_finish(url('/'), '/');

        $xml = [];
        $xml[] = '<?xml version="1.0" encoding="UTF-8"?'.'>';
        $xml[] = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        $xml[] = '  <url>';
        $xml[] = "    <loc>$url</loc>";
        $xml[] = "    <lastmod>$lastmod</lastmod>";
        $xml[] = '    <changefreq>daily</changefreq>';
        $xml[] = '    <priority>0.8</priority>';
        $xml[] = '  </url>';

        foreach ($postsInfo as $article) {
            $articleUrl = route('article', ['slug' => $article->slug]);
            $xml[] = '  <url>';
            $xml[] = "    <loc>{$articleUrl}</loc>";
            $xml[] = "    <lastmod>{$article->updated_at}</lastmod>";
            $xml[] = "  </url>";
        }

        $xml[] = '</urlset>';

        return join("\n", $xml);
    }

    /**
     * Return all the posts as $url => $date
     */
    protected function getPostsInfo()
    {
        return Page::where('active', true)
            ->orderBy('created_at', 'desc')
            ->get();
    }
}