<template>
    <b-overlay :show="isLoad" >
        <h1>Estimation</h1>
        <b-form>
            <b-form-group label-cols="4" label-cols-lg="2" label="Vehicle brand" label-for="model-select">
                <b-form-select id="model-select" required v-model="model" :options="models">
                    <template #first>
                        <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
                    </template>
                </b-form-select>
            </b-form-group>

            <b-form-group label-cols="4" label-cols-lg="2" label="Distance (Km)" label-for="distance">
                <b-form-input id="distance" required type="number" v-model="distance"></b-form-input>
            </b-form-group>

            <b-row>
                <b-col>
                    <b-button variant="success" @click="calculateData()">Calculate</b-button>
                </b-col>
                <b-col v-if="time">
                    Estimated time to destination: {{ time }} h.
                </b-col>
            </b-row>

        </b-form>
    </b-overlay>
</template>

<script>
import ToastMixin from "@/mixins/ToastMixin";

export default {
    name: "CalculatorComponent",
    mixins: [ToastMixin],
    data() {
        return {
            isLoad: false,
            distance: 0,
            model: null,
            models: [],
            time: null,
        }
    },
    created() {
        this.getCarsList(this);
    },
    methods: {
        getCarsList(compo) {
            compo.isLoad = true;
            const sUrl = 'http://localhost:3000/car/list';
            compo.axios
                .get(sUrl)
                .then((resp) => {
                    compo.models = resp.data.cars.map((item) => {
                        return item.model
                    });
                    compo.isLoad = false;
                })
                .catch((err) => {
                    compo.$data.isLoad = false;
                    compo.makeToast("Error", err.message, "danger");
                });
        },
        calculateData() {
            const compo = this;
            compo.isLoad = true;
            const sUrl = 'http://localhost:3000/calculate';

            const data = {
                model: compo.model,
                distance: compo.distance
            }
            compo.axios
                .post(sUrl, data)
                .then((resp) => {
                    compo.time = resp.data.time;
                    if (!compo.time) {
                        compo.makeToast("Error", 'Something went wrong', "danger");
                    }

                    compo.isLoad = false;
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
    }
}
</script>