@extends('layouts.emails')

@section('content')
    @component('partials.emails.table-row')
        {!! $body['body'] !!}
    @endcomponent

    @component('components.emails.footer')
    @endcomponent
@endsection

