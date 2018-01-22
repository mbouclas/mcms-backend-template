<div class="margin">
    <h4>Συμπληρώστε τη φόρμα για να μπείτε στην κλήρωση</h4>
    <div id="app">
        <mini-form form-settings="Form"></mini-form>
    </div>

    <script>
        {!! \Mcms\Admin\ViewComposers\JsViewBinder::put(\FrontEnd\Helpers\FormToJs::convert($Form, 'subscriptionForm', $injectToForm)) !!}
    </script>
</div>