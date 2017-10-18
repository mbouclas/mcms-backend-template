<script>
    {!! \Mcms\Admin\ViewComposers\JsViewBinder::put(\FrontEnd\Helpers\FormToJs::convert($Form)) !!}
</script>
<div class="margin">
<div class="row" id="app">
    <div class="col-sm-7">
        @if(isset($title))
            <h4 class="text-center">{!! $title !!}</h4>
        @else
            <h4 class="text-center">{!! $Form['label'][$locale] !!}</h4>
        @endif
        <mini-form form-settings="Form"></mini-form>
    </div>
    <div class="col-sm-5 text-center">
        {!! $Form['description'][$locale] !!}
    </div>
</div>
</div>