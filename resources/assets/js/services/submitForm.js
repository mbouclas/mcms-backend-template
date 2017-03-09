import Vue from 'vue';

export class SubmitForm {

    constructor(form) {
        if (typeof form.CSRF !== 'undefined') {
            Vue.axios.defaults.headers.common = {
                'X-CSRF-TOKEN': form.CSRF
            };
        }

        this.form = form;
        this.postTo = (typeof form.postTo !== 'undefined') ? form.postTo : '/contactForm';
    }

    post(data) {
        let toPost = Vue.util.extend({}, data);
        if (typeof toPost.form === 'undefined' && typeof this.form.id !== 'undefined'){
            toPost.form = this.form.id;
        }

        if (typeof this.form.inject !== 'undefined' && this.form.inject) {
            toPost.inject = this.form.inject;
        }

        return Vue.axios.post(this.postTo, toPost)
            .then((response) => {
                return response.data;
            });
    }
}