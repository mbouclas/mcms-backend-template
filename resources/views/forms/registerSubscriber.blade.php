@extends('layouts.app')
@section('content')
    <h2>fill out the following form to complete your registration</h2>
    <div id="app">
    <mini-form form-settings="Form"></mini-form>
    </div>

    <script>
        {!! \Mcms\Admin\ViewComposers\JsViewBinder::put(\FrontEnd\Helpers\FormToJs::convert($Form, 'finishRegistrationPost', $injectToForm)) !!}
    </script>
@endsection