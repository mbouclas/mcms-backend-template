<template>
    <div class="select-wrapper">
        {{ field.label[locale] }}
        <select v-model="_model"
                @change="onChange"
                class="select--wd select--wd--sm">
            <option v-for="option in field.options" :value="option.value">
                {{ option.label }}
                    </option>
        </select>
    </div>

</template>
<script>
    export default {
        name : 'mcmsSelect',
        props: ['model', 'field'],
        data () {
            return {
                _model : this.model,
                locale: Vue.config.lang,
            };
        },
        methods : {
            onChange() {
                this.$emit('update', this.field.varName, this._model);
            }
        },
        created () {
            this._model = this.model;
            this.onChange();
        }
    }
</script>