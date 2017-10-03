import Vue from 'vue';

export class SubmitForm {

    constructor(form) {
        setTimeout(() => {
            this.post = window.$.post;
            this.get = window.$.get;
            this.http = window.$.ajax;

            if (typeof form.CSRF !== 'undefined') {
                window.$.ajaxSetup({
                    headers:{
                        'X-CSRF-TOKEN': form.CSRF
                    }
                });
            }
            this.form = form;
            this.postTo = (typeof form.postTo !== 'undefined') ? form.postTo : '/contactForm';
        }, 1000);


    }

    send(data) {
        let toPost = Vue.util.extend({}, data);

        if (typeof toPost.form === 'undefined' && typeof this.form.id !== 'undefined'){
            toPost.form = this.form.id;
        }

        if (typeof this.form.inject !== 'undefined' && this.form.inject) {
            toPost.inject = this.form.inject;
        }

        return this.post(this.postTo, toPost);
    }
}