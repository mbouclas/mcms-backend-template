@extends('layouts.app')
@section('content')
    <h5>
        Συμπλήρωσε παρακάτω τα στοιχεία σου, για να μπορείς να κάνεις χρήση των
        προσφορών μας και να λαμβάνεις μέρος στους διαγωνισμούς του galastyle.
    </h5>
    <div id="app">
    <mini-form form-settings="Form"></mini-form>
    </div>

    <script>
        {!! \Mcms\Admin\ViewComposers\JsViewBinder::put(\FrontEnd\Helpers\FormToJs::convert($Form, 'finishRegistrationPost', $injectToForm)) !!}
    </script>
@endsection