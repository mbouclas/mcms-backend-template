<ul class="menu">
    @foreach($Categories as $category)
    <li class="cat-item">
        <a href="{{ route('articles', ['slug' => $category->slug]) }}" title="{!! $category->title !!}">
            {!! $category->title !!}
            @if (isset($category->count))
                ({{ $category->count }})
            @endif
        </a>
    </li>
@endforeach
</ul>