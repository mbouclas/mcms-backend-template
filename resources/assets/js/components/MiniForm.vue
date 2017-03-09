<template>
    <div>
        <div class="alert alert-success" v-if="success">{{ $t('labels.success') }}</div>

        <form id="miniForm" name="miniForm" method="post" novalidate="novalidate"
              v-if="!success"
              v-on:submit.prevent="onSubmit">
            <div class="input-field" v-for="field in Form.fields">
                <input type="email"
                       @input="$v.formData[field.varName].$touch()"
                       v-if="field.type === 'email'"
                       class="input--full"
                       v-bind:name="field.varName"
                       v-model="formData[field.varName]">
                <input type="text"
                       @input="$v.formData[field.varName].$touch()"
                       v-if="field.type === 'text'"
                       class="input--full"
                       v-bind:name="field.varName"
                       v-model="formData[field.varName]">
                <input type="number"
                       @input="$v.formData[field.varName].$touch()"
                       v-if="field.type === 'number'"
                       class="input--full"
                       v-bind:name="field.varName"
                       v-model="formData[field.varName]">
                <mcms-select
                        :model="formData[field.varName]"
                        :field="field"
                        @update="updateModel"
                        v-if="field.type === 'select'"></mcms-select>

                <textarea
                        @input="$v.formData[field.varName].$touch()"
                        v-if="field.type === 'textarea'"
                        class="input--full"
                        v-bind:name="field.varName"
                        v-model="formData[field.varName]"></textarea>
                <span class="input-group__bar"></span>

                <span :for="field.varName" class="error"
                      v-if="$v.formData[field.varName] && $v.formData[field.varName].$dirty && !$v.formData[field.varName].required">
                    {{ $t('validations.required') }}</span>
                <span :for="field.varName" class="error" v-if="field.type === 'email'
        && $v.formData[field.varName].$dirty && !$v.formData[field.varName].email" v-html="$t('validations.email')"></span>

                <label
                        v-if="field.type !== 'select'">{{ field.label[locale] }}</label>
            </div>
            <button type="submit" id="submit"
                    :disabled="$v.$invalid"
                    class="btn btn--wd wave waves-effect">{{ $t('labels.submit') }}
            </button>


        </form>
    </div>
</template>

<script>
    let SetupForm = require('../mixins/setupForm.mixin');
    import {SubmitForm} from '../services/submitForm';
    let Form = {};

    export default {
        name: 'MiniForm',
        mixins: [SetupForm],
        props: ['formSettings'],
        data () {
            return {
                success : false,
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

                Form.post(this.formData)
                    .then((response) => {
                        if (response.success) {
                            this.success = true;
                            this.formData = {};
                        }
                    });
            }
        },
        validations: {
            formData: {}
        }
    }
</script>