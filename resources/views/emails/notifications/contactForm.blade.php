@extends('layouts.emails')

@section('content')
    @component('partials.emails.table-row')
        <p>Dear admin</p>
        <p>The following new message has been received from the contact form</p>
        <div>
            <ul>
                @foreach($body as $key => $value)

                    @if($key == 'inject' && is_array($value))
                        @foreach($value as $sub)
                            <li>{!! trans($sub['label']) !!} : {!! $sub['value'] !!}</li>
                        @endforeach
                    @else
                        <li>{{ $key }} : {!! $value !!}</li>
                    @endif

                @endforeach
            </ul>

        </div>
    @endcomponent

@endsection