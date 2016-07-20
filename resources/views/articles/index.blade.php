@extends('layouts.app')
@section('meta-title')
    {!! $category->title !!}
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