@extends('layouts.emails')

@section('content')
    @component('partials.emails.table-row')
{!! Lang::get('emails.subscribers.welcome.body') !!}
@component('components.emails.button')
    @slot('link')
        {{ route('finishRegistration', ['hash' => $data['hash']]) }}
    @endslot

    @slot('text')
        Ολοκλήρωση εγγραφής
    @endslot
@endcomponent
@endcomponent

    @component('components.emails.footer')
    @endcomponent
@endsection