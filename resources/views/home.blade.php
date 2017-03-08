@extends('layouts.app')
@section('critical-css')
    @criticalCss('/')
@endsection
@section('content')
    <header>
    @include('components.slider', ['Items' => $sliderItems])
    </header>
    <div class="row">
{{--        <div class="col-xs-12 col-lg-9 posts-list">
            @foreach($latestArticles as $article)
            @include('partials.article', ['article' => $article])
            @endforeach
        </div><!-- END LEFT -->--}}



    </div>
@endsection
