@extends('layouts.app')
@section('critical-css')
    @criticalCss('pages/events')
@endsection
@section('content')
    <header class="page-header">
        <h1><span class="grey-text">Galastyle</span> Αναζήτηση</h1>
    </header>
    <div class="post page bg z-depth-1">
        <div class="post-content">
        <div class="post-entry">
            <div class="row">
                <div class="col-md-10 col-sm-9 col-xs-9 col-lg-11">
                    <input class="search-input algoliaSearchBox" type="search" name="q"
                           id="algoliaSearchBox"
                           placeholder="Αναζήτηση στο Galastyle ...">
                </div>
                <div class="col-md-2 col-sm-3 col-xs-3 col-lg-1" title="clear filters">
                    <div id="clear-all" class="text-lg-right text-md-right margin-top">Clear all filters</div>
                </div>
            </div>
            </div>
        </div>
    </div>


    <div class="row">
    <div class="col-lg-3 col-md-3 sidebar hidden-xs-down">
        <aside class="widget bg z-depth-1 widget_categories">
            <ul class="menu">
            <div id="tagsFacet" class="tagsFacet"></div>
            </ul>
        </aside>

        <aside class="widget bg z-depth-1 widget_categories">
            <ul class="menu">
                <div id="categoriesFacet" class="categoriesFacet"></div>
            </ul>
        </aside>
    </div>


        <div class="col-md-9 col-lg-9 col-xs-12">
            <div id="algoliaHits"></div>

        </div>

    </div>
    <div id="pagination"></div>
    <div class="text-md-right" style="margin-top: 20px;">
        <img src="{{ asset('img/search-by-algolia.png') }}" style="height: 20px;">
    </div>
@endsection