<li class="@if (count($item['children']) > 0)parent @endif {{ \FrontEnd\Helpers\ActiveStates::set_active($item->permalink ?: $item->link) }}">
    <a href="{{$item->link or $item->permalink}}" title="{!! $item->title !!}">{!! $item->title !!}</a>
    @if (count($item['children']) < 1)
</li>
    @endif

@if (count($item['children']) > 0)
    <div class="sub-menu-wrap">
        <ul class="sub-menu">
            @foreach($item['children'] as $child)
                @include('partials.subMenuItem', $child)
            @endforeach
        </ul>
    </div>
@endif
