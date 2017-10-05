<template>
    <div>
        Hello to form {{ fname }} {{ email }}
    </div>
</template>
<script>
    let SetupForm = require('../mixins/setupForm.mixin');
    const {SubmitForm} = require('../services/submitForm');
    let Form = {};

    export default {
        name: 'registrationForm',
        mixins: [SetupForm],
        props: ['fname', 'lname', 'email', 'formSettings'],
        data () {
            return {
                success : false,
                submitting : false,
                locale: Vue.config.lang,
            };
        },
        mounted() {
            Form = new SubmitForm(this.Form);
        },
        methods: {
            updateModel(key,value) {
                this.formData[key] = value;
            },
            onSubmit() {
                if (this.$v.$invalid) {
                    return;
                }
                this.submitting = true;

                Form.send(this.formData)
                    .then((response) => {
                        if (response.success) {
                            this.success = true;
                            this.submitting = false;
                            this.formData = {};
                        }
                    })
            }
        },
        validations: {
            formData: {}
        }
    }
</script>