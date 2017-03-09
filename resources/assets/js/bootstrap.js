/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

// require('bootstrap-sass');

window.Vue = require('vue');
require('vue-resource');
import Vuelidate from 'vuelidate'
import axios from 'axios';
import VueAxios from 'vue-axios'
const VueI18n = require('vue-i18n');
Vue.use(VueI18n);
Vue.use(Vuelidate);
Vue.use(VueAxios, axios);
window.axios = axios;

if (typeof window.translations !== 'undefined' && typeof window.locale !== 'undefined'){
    Vue.config.lang = window.locale;
    Vue.locale(window.locale, window.translations);
}