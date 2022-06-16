<template>
    <div></div>
</template>
<script>
export default {
    name:'toast-mixin',
    methods:{
        makeToast(title, content = "", variant = null) {
            this.$bvToast.toast(content, {
                title: title,
                variant: variant,
                solid: true,
                toaster: "b-toaster-top-full",
            });
        },
    },
}
</script>