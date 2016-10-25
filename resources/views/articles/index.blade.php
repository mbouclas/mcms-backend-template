@extends('layouts.app')
@section('meta-title')
    @if(isset($category->settings['seo'][App::getLocale()]['title']))
        {!! $category->settings['seo'][App::getLocale()]['title'] !!}
    @else
        {!! $category->title !!}
    @endif
@endsection
@section('meta-description')
    @if(isset($category->settings['seo'][App::getLocale()]['description']))
        {!! $category->settings['seo'][App::getLocale()]['description'] !!}
    @endif
@endsection
@section('meta-keywords')
    @if(isset($category->settings['seo'][App::getLocale()]['keywords']))
        {!! $category->settings['seo'][App::getLocale()]['keywords'] !!}
    @endif
@endsection
@section('main-class') @if(!is_array($category->subcategories)) left-sidebar @else home-page @endif @endsection
@section('content')
    <header class="page-header">
        <h1><span class="grey-text">Galastyle</span> {!! $category->title !!}</h1>
    </header>

    <div class="row">
        <div class="col-xs-12 @if(!is_array($category->subcategories))col-lg-9 @else col-lg-12 @endif posts-list">
            <div class="row grid-layout">
                <!-- Grid size -->
                <div class="col-xs-12 col-md-6 col-lg-4 grid-sizer"></div>

                @foreach($items as $item)
                    <div class="col-xs-12 col-md-6 col-lg-4 grid-item">
                        @include('partials.article', ['article' => $item])
                    </div>
                @endforeach
            </div>

        </div>
        @if(!is_array($category->subcategories))
        <div class="col-xs-12 col-lg-3 sidebar">
            @include('partials.sidebar-widgets.categories',
            ['Categories' => $category->subcategories, 'Title' => trans('site.subcategories') ])
        </div>
        @endif

    </div>
    @include('components.paginator')
@endsection