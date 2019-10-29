<template>
    <div class="nice-input-wrapper">
        <input
            class="nice-input"
            type="text"
            v-bind="$attrs"
            :value="searchText"
            @input="emitInput"
        />
            <!-- v-model="searchText" -->
        <span class="focus-border"><i></i></span>
    </div>
</template>

<script>
export default {
    props: ['searchText'],
    inheritAttrs: false,
    methods: {
        emitInput(event) {
            this.$emit('update:searchText', event.target.value);
        }
    }
}
</script>

<style lang="scss">
/* Nice input */
.nice-input-wrapper {
    position: relative;

    .nice-input{
        font: 15px/24px 'Muli', sans-serif;
        color: #333;
        width: 100%;
        box-sizing: border-box;
        letter-spacing: 1px;
    }
    .nice-input{border: 1px solid #ccc; padding: 7px 14px 9px; transition: 0.4s;}
    .nice-input ~ .focus-border:before,
    .nice-input ~ .focus-border:after{content: ""; position: absolute; top: 0; left: 0; width: 0; height: 2px; background-color: #4caf50; transition: 0.3s;}
    .nice-input ~ .focus-border:after{top: auto; bottom: 0; left: auto; right: 0;}
    .nice-input ~ .focus-border i:before,
    .nice-input ~ .focus-border i:after{content: ""; position: absolute; top: 0; left: 0; width: 2px; height: 0; background-color: #4caf50; transition: 0.4s;}
    .nice-input ~ .focus-border i:after{left: auto; right: 0; top: auto; bottom: 0;}
    .nice-input:focus ~ .focus-border:before,
    .nice-input:focus ~ .focus-border:after{width: 100%; transition: 0.3s;}
    .nice-input:focus ~ .focus-border i:before,
    .nice-input:focus ~ .focus-border i:after{height: 100%; transition: 0.4s;}
}
/* End Nice input */
</style>