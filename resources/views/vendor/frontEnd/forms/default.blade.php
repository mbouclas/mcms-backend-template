<script>
    {!! \Mcms\Admin\ViewComposers\JsViewBinder::put(\FrontEnd\Helpers\FormToJs::convert($Form)) !!}
</script>
<div class="row">
    <div class="col-sm-7">
        <h2 class="text-center">{!! $Form['label'][$locale] !!}</h2>
        <mini-form form-settings="Form"></mini-form>
    </div>
    <div class="col-sm-5 text-center">
        {!! $Form['description'][$locale] !!}
    </div>
</div>
