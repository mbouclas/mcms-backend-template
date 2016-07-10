@extends('admin::Layouts.master')

@section('js')
   @foreach($includeFiles['scripts'] as $file)
   <script src="{{$file}}"></script>
   @endforeach
@endsection

@section('css')
    @foreach($includeFiles['css'] as $file)
        {{$file}}
    @endforeach
@endsection

@section('content')

@endsection