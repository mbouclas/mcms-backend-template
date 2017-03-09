import Vue from 'vue';
import { required, email } from 'vuelidate/lib/validators';

function remapOptions(options, locale) {
    let remap = [];
    options.forEach(function (option) {
        //0 => default
        //1 => label
        //2 => value
       remap.push({
           default : option[0],
           label : option[1][locale],
           value : option[2]
       });
    });

    return remap;
}

function selectDefaultValue(options, key, value) {
    let found = null;
    options.forEach(function (option) {
        if (option[key] === value){
            found = option;
        }
    });

    return found;
}

module.exports = {
    data () {
        return {
            Form :{},
            formData : {}
        }
    },
    created () {
        let Form =  (typeof window[this.$options.propsData.formSettings] !== 'undefined') ? window[this.$options.propsData.formSettings] : {};
        let fields = {};
        let validations = this.$options.validations;

        Form.fields.map((field ) => {
            fields[field.varName] = '';

            if (field.type === 'select') {
                //remap options
                field.options = remapOptions(field.options, Vue.config.lang);
                let defaultValue = selectDefaultValue(field.options, 'default', true);
                fields[field.varName] = (defaultValue) ? defaultValue.value : '';
            }
            if (typeof field.required !== 'undefined' && field.required) {
                validations.formData[field.varName] = {required};
                if (field.type === 'email') {
                    validations.formData[field.varName]['email'] = email;
                }
            }
        });


        this.formData = fields;
        this.Form = Form;
        this.$options.validations = validations;

    },

};