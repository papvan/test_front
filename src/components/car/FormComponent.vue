<template>
    <b-overlay :show="isLoad" >
        <b-form  @submit="onSubmit" @reset="onReset">
            <b-form-group label-cols="4" label-cols-lg="2" label="Vehicle brand" label-for="model">
                <b-form-input id="model" required type="text" v-model="car.model"></b-form-input>
            </b-form-group>

            <b-form-group label-cols="4" label-cols-lg="2" label="Speed (kmh)" label-for="kmh">
                <b-form-input id="kmh" required type="number" v-model="car.kmh"></b-form-input>
            </b-form-group>

            <b-form-group label="Car features" v-slot="{ ariaDescribedby }">
                <b-form-checkbox-group
                    switches
                    stacked
                    id="features"
                    v-model="car.features"
                    :options="features"
                    :aria-describedby="ariaDescribedby"
                    name="features"
                ></b-form-checkbox-group>
            </b-form-group>

                <b-form-checkbox
                    switch
                    id="booster"
                    v-model="car.booster"
                    name="booster"
                    :value="true"
                    :unchecked-value="false"
                > Has booster
                </b-form-checkbox>

            <br>
            <div>
                <b-button type="reset">Cancel</b-button>
                <b-button type="submit" variant="success">Save</b-button>
            </div>
        </b-form>
    </b-overlay>
</template>

<script>
export default {
    name: "FormComponent",
    props: {
        carItem: { type: Object },
        saveCallback: { type: Function },
        resetCallback: { type: Function },
    },
    data() {
        return {
            isLoad: false,
            car: {
                id: null,
                model: '',
                kmh: 0,
                features: [],
                booster: false,
            },
            features: [],
        }
    },
    created() {
        this.getFeatures(this);
    },
    watch: {
        carItem(newItem, oldItem) {
            if (newItem !== oldItem) {
                this.car = newItem;
            }
        }
    },
    methods: {
        getFeatures(compo) {
            compo.isLoad = true;
            const sUrl = 'http://localhost:3000/car/features/list';
            compo.axios
                .get(sUrl)
                .then((resp) => {
                    compo.features = resp.data.items;
                    compo.isLoad = false;
                })
                .catch((err) => {
                    compo.$data.isLoad = false;
                    compo.makeToast("Error", err.message, "danger");
                });
        },
        onSubmit(event) {
            event.preventDefault()
            this.$emit('saveCallback', this.car)
        },
        onReset(event) {
            event.preventDefault()
            this.$emit('resetCallback')
        }
    }
}
</script>

<style scoped>

</style>