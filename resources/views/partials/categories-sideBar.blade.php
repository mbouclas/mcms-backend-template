<ul class="menu">
    @foreach($Categories as $category)
        @if (isset($category->count) && $category->count > 0)
    <li class="cat-item">
        <a href="{{ route('articles', ['slug' => $category->slug]) }}" title="{!! $category->title !!}">
            {!! $category->title !!}
                ({{ $category->count }})
        </a>
    </li>
        @endif
@endforeach
</ul>