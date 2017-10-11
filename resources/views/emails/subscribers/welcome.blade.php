@extends('layouts.emails')

@section('content')
    @component('partials.emails.table-row')
        {!! Lang::get('emails.subscribers.thanks.body') !!}
    @endcomponent

    @component('components.emails.footer')
    @endcomponent
@endsection

