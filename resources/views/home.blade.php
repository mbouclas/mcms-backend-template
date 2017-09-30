@extends('layouts.app')
@section('critical-css')
    @criticalCss('/')
@endsection
@section('content')
    @include('components.slider', ['Items' => $sliderItems])
    <div class="row" id="app">
        <div class="col-xs-12 col-lg-9 posts-list">
            @foreach($latestArticles as $article)
            @include('partials.article', ['article' => $article])
            @endforeach
        </div><!-- END LEFT -->

        <div class="col-xs-12 col-lg-3 sidebar">

            <aside class="widget bg z-depth-1 latest-posts">
                <h4 class="widget-title">{{ trans('site.featuredPosts') }}</h4>
                <ul>
                    @foreach($featuredBlogPosts as $item)
                        <li>
                            <a href="{{ $item->getSlug() }}" class="post-img">
                                <img class="retina" src="{{ $item->thumb['copies']['thumb']['url'] }}" alt="">
                            </a>
                            <div class="post-content">
                                <h5 class="post-title"><a href="{{ $item->getSlug() }}">{!! $item->title !!}</a></h5>
                                <div class="date">{{ $item->published_at->format('d/m/Y') }}</div>
                            </div>
                        </li>
                    @endforeach
                </ul>
            </aside><!-- .latest-posts -->

            <aside class="widget bg z-depth-1">
                <h4 class="widget-title">Subscribe</h4>

                @Form('subscribeToNewsletter')
            </aside><!-- .subscribe -->



            @foreach($banners as $item)
            <aside class="widget bg z-depth-1 banner">
                <a href="{{ $item->getSlug() }}" class="banner-link"></a>
                <img class="retina banner-img" src="{{ $item->thumb['copies']['big_thumb']['url'] }}" width="270" height="270" alt="{!! $item->title !!}">

                <div class="overlay">
                    <div class="cell-vertical-wrapper">
                        <div class="cell-middle">
                            <h4>{!! $item->title !!}</h4>

                        </div>
                    </div>
                </div>
            </aside>
            @endforeach

            @include('partials.sidebar-widgets.categories',
['Categories' => $Categories, 'Title' => trans('site.categories') ])
        </div><!-- .sidebar -->

    </div>
@endsection
