@extends('layouts.app')

@section('content')
    <div class="row">
        <div class="col-xs-12 col-lg-9 posts-list">
            @foreach($latestArticles as $article)
            @include('partials.article', ['article' => $article])
            @endforeach
        </div><!-- END LEFT -->

        <div class="col-xs-12 col-lg-3 sidebar">
            <aside class="widget bg z-depth-1 widget_categories">
                <h4 class="widget-title">Categories</h4>
                @include('partials.categories-sideBar')
            </aside><!-- .widget_categories -->

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
                    <li>
                        <a href="#" class="post-img">
                            <img class="retina" src="content/img/post-widget-1.jpg" width="72" height="72" alt="">
                        </a>
                        <div class="post-content">
                            <h5 class="post-title"><a href="#">Fashion in the Country</a></h5>
                            <div class="date">February 4, 2016</div>
                        </div>
                    </li>
                    <li>
                        <a href="#" class="post-img">
                            <img class="retina" src="content/img/post-widget-2.jpg" width="72" height="72" alt="">
                        </a>
                        <div class="post-content">
                            <h5 class="post-title"><a href="#">Fashion in the Country</a></h5>
                            <div class="date">February 4, 2016</div>
                        </div>
                    </li>
                    <li>
                        <a href="#" class="post-img">
                            <img class="retina" src="content/img/post-widget-3.jpg" width="72" height="72" alt="">
                        </a>
                        <div class="post-content">
                            <h5 class="post-title"><a href="#">Fashion in the Country</a></h5>
                            <div class="date">February 4, 2016</div>
                        </div>
                    </li>
                    <li>
                        <a href="#" class="post-img">
                            <img class="retina" src="content/img/post-widget-4.jpg" width="72" height="72" alt="">
                        </a>
                        <div class="post-content">
                            <h5 class="post-title"><a href="#">Fashion in the Country</a></h5>
                            <div class="date">February 4, 2016</div>
                        </div>
                    </li>
                </ul>
            </aside><!-- .latest-posts -->


            <aside class="widget bg z-depth-1 banner">
                <a href="#" class="banner-link"></a>
                <img class="retina banner-img" src="content/img/banner-widget.jpg" width="270" height="270" alt="banner">

                <div class="overlay">
                    <div class="cell-vertical-wrapper">
                        <div class="cell-middle">
                            <h4>Banner</h4>
                            <p><i>270 x 270</i></p>
                        </div>
                    </div>
                </div>
            </aside>
        </div><!-- .sidebar -->

    </div>
@endsection
