window.Vue = require('vue');
import Vuelidate from 'vuelidate'
const VueI18n = require('vue-i18n');
Vue.use(Vuelidate);


Vue.config.lang = window.locale;
const messages = {};
messages[window.locale] = window.translations;
const i18n = new VueI18n({
    locale: window.locale, // set locale
    messages, // set locale messages
});

Vue.component('mini-form', require('./components/MiniForm.vue'));
Vue.component('mcms-select', require('./components/McmsSelect.vue'));

new Vue({ i18n }).$mount('#app');