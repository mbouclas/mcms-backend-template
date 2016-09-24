@extends('layouts.app')

@section('content')
    @include('components.slider', ['Items' => $sliderItems])
    <div class="row">
        <div class="col-xs-12 col-lg-9 posts-list">
            @foreach($latestArticles as $article)
            @include('partials.article', ['article' => $article])
            @endforeach
        </div><!-- END LEFT -->

        <div class="col-xs-12 col-lg-3 sidebar">
            @include('partials.sidebar-widgets.categories',
            ['Categories' => $Categories, 'Title' => trans('site.categories') ])

            <aside class="widget bg z-depth-1">
                <h4 class="widget-title">Subscribe</h4>

                <form class="not-bottom-margin subscribe">
                    <div class="input-field">
                        <input id="email" type="email" name="subscribe">
                        <label for="email">Your email address</label>
                        <span class="form-message"></span>
                    </div>
                    <button class="btn btn-block waves-effect waves-light">Subscribe</button>
                </form>
            </aside><!-- .subscribe -->

            <aside class="widget bg z-depth-1 latest-posts">
                <h4 class="widget-title">Latest Posts</h4>
                <ul>
                    @foreach($latestBlogPosts as $item)
                    <li>
                        <a href="{{ route('article', ['slug' => $item->slug]) }}" class="post-img">
                            <img class="retina" src="{{ $item->thumb['copies']['thumb']['url'] }}" alt="">
                        </a>
                        <div class="post-content">
                            <h5 class="post-title"><a href="{{ route('article', ['slug' => $item->slug]) }}">{!! $item->title !!}</a></h5>
                            <div class="date">{{ $item->published_at->format('d/m/Y') }}</div>
                        </div>
                    </li>
                    @endforeach
                </ul>
            </aside><!-- .latest-posts -->

            @foreach($banners as $item)
            <aside class="widget bg z-depth-1 banner">
                <a href="{{ route('article', ['slug' => $item->slug]) }}" class="banner-link"></a>
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
        </div><!-- .sidebar -->

    </div>
@endsection
