<template>
    <div>
        <div class="alert alert-success" v-if="success">{{ $t('labels.success') }}</div>
        <div class="alert alert-danger" v-if="error">{{ $t('validations.alreadyParticipated') }}</div>
        <div class="alert alert-info" v-if="submitting">{{ $t('labels.submitting') }}</div>

        <form id="miniForm" name="miniForm" method="post" novalidate="novalidate"
              v-if="!success && !submitting"
              v-on:submit.prevent="onSubmit">

            <div class="input-field" v-for="field in Form.fields">
                <input type="email"
                       @input="$v.formData[field.varName].$touch()"
                       v-if="field.type === 'email'"
                       class="input--full"
                       v-bind:name="field.varName"
                       v-bind:disabled="field.disabled"
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
                       :min="field.min"
                       :max="field.max"
                       :step="field.step"
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
                    :disabled="$v.$invalid || submitting"
                    class="btn btn--wd wave waves-effect">{{ $t('labels.submit') }}
            </button>


        </form>
    </div>
</template>

<script>
    let SetupForm = require('../mixins/setupForm.mixin');
    const {SubmitForm} = require('../services/submitForm');
    let Form = {};

    export default {
        name: 'MiniForm',
        mixins: [SetupForm],
        props: ['formSettings'],
        data () {
            return {
                success : false,
                error : false,
                submitting : false,
                locale: Vue.config.lang,
            };
        },
        mounted() {
            Form = new SubmitForm(this.Form);
        },
        methods: {
            ga() {
                try {
                    ga('send', 'event', this.Form.id, this.formData.email);
                }
                catch (e) {}
            },
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
                            this.ga();
                        } else {
                            this.success = false;
                            this.error = true;
                            this.submitting = false;

                            setTimeout(() => {this.error = false;}, 5000);
                        }
                    })
            }
        },
        validations: {
            formData: {}
        }
    }
</script>
<style>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        /* display: none; <- Crashes Chrome on hover */
        -webkit-appearance: none;
        margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }
</style>