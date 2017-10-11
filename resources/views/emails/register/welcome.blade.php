@extends('layouts.emails')

@section('content')
    @component('partials.emails.table-row')
{{ $body['firstName'] }} Welcome to {{ Config::get('core.siteName') }}
    @endcomponent
@endsection