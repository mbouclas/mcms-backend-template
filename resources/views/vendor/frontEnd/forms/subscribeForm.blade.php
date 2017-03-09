@section('script')
<script>
{!! \Mcms\Admin\ViewComposers\JsViewBinder::put(\FrontEnd\Helpers\FormToJs::convert($Form, (isset($injectToForm) ? $injectToForm : null))) !!}
</script>
@endsection

<mini-form form-settings="Form"></mini-form>