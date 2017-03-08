@extends('layouts.app')
@section('critical-css')
    @criticalCss('/')
@endsection
@section('content')
    @include('components.slider', ['Items' => $sliderItems])
    <div class="row">
        <div class="col-xs-12 col-lg-9 posts-list">
            @foreach($latestArticles as $article)
            @include('partials.article', ['article' => $article])
            @endforeach
        </div><!-- END LEFT -->



    </div>
@endsection
