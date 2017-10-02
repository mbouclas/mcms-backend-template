<?php $hideDetails = (!isset($hideDetails)) ? true : $hideDetails ?>
<article class="post bg z-depth-1">
    @if(isset($article->thumb['copies']))
    <div class="post-img">
        <a href="{{ route('article', ['slug' => $article->slug]) }}" title="{!!  $article->title !!}">
            <img class="retina"
                 @if(isset($mode) && $mode == 'small')
                 src="{{ $article->thumb['copies']['big_thumb']['url'] }}"
                 @else
                 src="{{ $article->thumb['copies']['main']['url'] }}" width="820" height="500"
                 @endif
                  alt="{!!  $article->title !!}">
        </a>
    </div>
@endif
    <div class="post-content">
        <div class="post-header center-align">
            <div class="tags">
                @foreach($article->categories as $category)
                    <a href="{{ route('articles', ['slug' => $category->slug]) }}">{!! $category->title !!}</a>
                @endforeach
            </div>
            <h2 class="post-title"><a href="{{ route('article', ['slug' => $article->slug]) }}" title="{!!  $article->title !!}">{!!  $article->title !!}</a></h2>
            <div class="date">{{ $article->published_at->format('d/m/Y') }}</div>
        </div>
    @if (!$hideDetails)
        <div class="post-entry">
            {!! $article->description !!}
        </div>
    @endif
        <div class="post-footer">
            <div class="post-footer-item">
                <a href="{{ route('article', ['slug' => $article->slug]) }}" class="link" title="{!!  $article->title !!}">
                    <span class="text">Διαβάστε το άρθρο</span> <i class="fa fa-arrow-circle-right"></i></a>
            </div>

            <div class="post-footer-item post-sharing">
                <a href="#" class="social-sharing-btn link"></a>
                <div class="social-wrapper">

                </div>
            </div>
            <div class="post-footer-item">
                <a href="{{ route('article', ['slug' => $article->slug]) }}#comments" class="link" title="σχόλια για {!!  $article->title !!}">
                    <i class="fa fa-comments-o"></i> <span class="text">Σχολιάστε</span></a>
            </div>
        </div>
    </div><!-- .post-content -->
</article><!-- .post -->
