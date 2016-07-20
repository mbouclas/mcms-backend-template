<ul class="menu">
    @foreach($Categories as $category)
    <li class="cat-item">
        <a href="{{ route('articles', ['slug' => $category->slug]) }}" title="{!! $category->title !!}">{!! $category->title !!}</a>
    </li>
@endforeach
</ul>