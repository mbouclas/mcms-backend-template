<article class="post bg z-depth-1">
    <div class="post-img">
        <a href="{{ route('article', ['slug' => $article->slug]) }}" title="{!!  $article->title !!}">
            <img class="retina" src="{{ $article->thumb['copies']['main']['url'] }}" width="820" height="500" alt="{!!  $article->title !!}">
        </a>
    </div>

    <div class="post-content">
        <div class="post-header center-align">
            <div class="tags">
                @foreach($article->categories as $category)
                    <a href="{{ route('articles', ['slug' => $category->slug]) }}">{{ $category->title }}</a>
                @endforeach
            </div>
            <h2 class="post-title"><a href="{{ route('article', ['slug' => $article->slug]) }}" title="{!!  $article->title !!}">{!!  $article->title !!}</a></h2>
            <div class="date">{{ $article->created_at->format('d/m/Y') }}</div>
        </div>

        <div class="post-entry">
            {!! $article->description !!}
        </div>

        <div class="post-footer">
            <div class="post-footer-item">
                <a href="{{ route('article', ['slug' => $article->slug]) }}" class="link" title="{!!  $article->title !!}">
                    <span class="text">Διαβάστε το άρθρο</span> <i class="fa fa-arrow-circle-right"></i></a>
            </div>

            <div class="post-footer-item post-sharing">
                <a href="#" class="social-sharing-btn link">Sharing</a>
                <div class="social-wrapper">
                    <ul class="social">
                        <li><a href="#" class="twitter-bg"><i class="fa fa-twitter"></i></a></li>
                        <li><a href="#" class="facebook-bg"><i class="fa fa-facebook"></i></a></li>
                        <li><a href="#" class="google-plus-bg"><i class="fa fa-google-plus"></i></a></li>
                        <li><a href="#" class="pinterest-bg"><i class="fa fa-pinterest-p"></i></a></li>
                    </ul>
                </div>
            </div>
            <div class="post-footer-item">
                <a href="{{ route('article', ['slug' => $article->slug]) }}#comments" class="link" title="σχόλια για {!!  $article->title !!}">
                    <i class="fa fa-comments-o"></i> <span class="text">Σχολιάστε</span></a>
            </div>
        </div>
    </div><!-- .post-content -->
</article><!-- .post -->