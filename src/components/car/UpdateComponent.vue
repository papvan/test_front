<template>
    <div>
        <h1>Editing car</h1>
        <FormComponent :carItem="car" @saveCallback="saveItem" @resetCallback="goToList()"></FormComponent>
    </div>
</template>

<script>
import FormComponent from "@/components/car/FormComponent";
export default {
    name: "UpdateComponent",
    components: {
        "FormComponent": FormComponent
    },
    data() {
        return {
            isLoad: false,
            carId: null,
            car: null,
        }
    },
    beforeRouteEnter (to, from, next) {
        next(function (vm) {
            vm.$data.carId = to.params.id;
            vm.getItem();
        });
    },
    methods:{
        saveItem(car) {
            const compo = this;
            compo.isLoad = true;
            const sUrl = `http://localhost:3000/car/update/${compo.carId}`;

            compo.axios
                .put(sUrl, car)
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
        getItem() {
            let compo = this;
            compo.isLoad = true;
            const sUrl = `http://localhost:3000/car/get/${compo.carId}`;
            compo.axios
                .get(sUrl)
                .then((resp) => {
                    compo.car = resp.data.item;
                    compo.isLoad = false;
                })
                .catch((err) => {
                    compo.$data.isLoad = false;
                    compo.makeToast("Error", err.message, "danger");
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