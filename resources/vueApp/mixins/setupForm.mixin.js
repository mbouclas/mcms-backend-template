const Vue = require('vue');
const { required, email } =  require('vuelidate/lib/validators');

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
        let emailField = null;

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

            if (field.type === 'email' && field.varName === 'email') {
                emailField = field;
            }
        });

        if (Form.inject && typeof Form.inject.defaults !== 'undefined') {
            for (let key in Form.inject.defaults) {
                fields[key] = Form.inject.defaults[key];
                // disable email if there's a default value. Don't want the user to be changing this around
                if (key === 'email' && emailField) {
                    emailField.disabled = true;
                }
            }
        }

        this.formData = fields;

        if (typeof Form.inject !== 'undefined' && Form.inject && typeof Form.inject.formData !== 'undefined') {
            fields.formData = Form.inject.formData;
        }

        this.Form = Form;
        this.$options.validations = validations;

    },

};