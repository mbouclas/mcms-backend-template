<div class="slider z-depth-1">
    @foreach($Items as $item)
    <div class="slider-item" style="height: 600px;">
        <img src="{{ $item->thumb['copies']['main']['url'] }}" alt="{!! $item->title !!}"
        height="600">
        <div class="caption-wrap">
            <div class="caption center-align white-text">
                <h2 class="title">{!! $item->title !!}</h2>
                <a href="{{ route('article', ['slug' => $item->slug]) }}" class="btn grey lighten-2 black-text waves-effect waves-dark">Διαβάστε το άρθρο</a>
            </div>
        </div>
    </div><!-- .slider-item -->
@endforeach
</div><!-- .slider -->