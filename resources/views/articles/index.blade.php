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
@section('content')
    <header class="page-header">
        <h1><span class="grey-text">Galastyle</span> {!! $category->title !!}</h1>
    </header>

    <div class="row">
        <div class="col-sm-12 posts-list">
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

        @include('partials.paginator', ['items' => $items])

    </div>

@endsection