<div class="margin">
    <h4>Συμπληρώστε τη φόρμα για μπείτε στην κλήρωση</h4>
    <div id="app">
        <mini-form form-settings="Form"></mini-form>
    </div>

    <script>
        {!! \Mcms\Admin\ViewComposers\JsViewBinder::put(\FrontEnd\Helpers\FormToJs::convert($Form, 'subscribeToContent', $injectToForm)) !!}
    </script>
</div>