@extends('layouts.emails')

@section('content')
Please follow this link
    <a href="{{ route('finishRegistration', ['hash' => $data['hash']]) }}">{{ route('finishRegistration', ['hash' => $data['hash']]) }}</a>
@endsection