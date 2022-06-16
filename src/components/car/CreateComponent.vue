<template>
    <div>
        <h1>Adding a new car</h1>
        <FormComponent :carItem="null" @saveCallback="saveItem" @resetCallback="goToList"></FormComponent>
    </div>
</template>

<script>
import FormComponent from "@/components/car/FormComponent";
export default {
    name: "CreateComponent",
    components: {
        "FormComponent": FormComponent
    },
    date() {
        return {
            isLoad: false,
        }
    },
    methods:{
        saveItem(car) {
            const compo = this;
            compo.isLoad = true;
            const sUrl = `http://localhost:3000/car/create`;

            compo.axios
                .post(sUrl, car)
                .then((resp) => {
                    console.log(resp);
                    compo.isLoad = false;
                    compo.$router.push({name:'car_list'});
                })
                .catch((err) => {
                    compo.$data.isLoad = false;
                    if (err.response.data.errors && err.response.data.errors.length) {
                        for(let one of err.response.data.errors) {
                            compo.makeToast("Error", one.msg, "danger");
                        }
                    } else {
                        let message = '';
                        if (err.response.data.error) {
                            message = err.response.data.error;
                        }else {
                            message = err.message;
                        }
                        compo.makeToast("Error", message, "danger");
                    }
                });
        },
        goToList() {
            this.$router.push({name:'car_list'});
        }
    }

}
</script>

<style scoped>

</style>