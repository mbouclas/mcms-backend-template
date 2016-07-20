<ul>
@foreach($messageData as $key=>$value)
    <li>{{ $key }} => {!! $value !!}</li>
@endforeach
</ul>