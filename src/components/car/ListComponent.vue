<template>
    <b-overlay :show="isLoad">
        <b-row>
            <b-col>
                <b-table striped hover :items="items" :fields="fields">
                    <template #cell(features)="row">
                        {{ row.item.features.join(', ') }}
                    </template>
                    <template #cell(booster)="row">
                        <b-icon-check v-if="row.item.booster"></b-icon-check>
                    </template>
                    <template #cell(ctrl)="row">
                        <b-button size="sm" @click="updateItem(row.item)" class="mr-2" title="Edit">
                            <b-icon-pencil></b-icon-pencil>
                        </b-button>

                        <b-button size="sm" variant="danger" @click="removeItem(row.item)" class="mr-2" title="Remove">
                            <b-icon-trash></b-icon-trash>
                        </b-button>
                    </template>
                </b-table>

            </b-col>
        </b-row>
        <b-row>
            <b-col class="sm-2">
                <b-button size="sm" variant="success" class="mr-2" title="Add" @click="addItem()">
                    <b-icon-plus-circle-dotted></b-icon-plus-circle-dotted> Add new
                </b-button>
            </b-col>
            <b-col class="sm-10"></b-col>
        </b-row>
    </b-overlay>
</template>

<script>
import ToastMixin from "@/mixins/ToastMixin";

export default {
    name: "ListComponent",
    mixins: [ToastMixin],
    data(){
        return {
            isLoad: false,
            items: [],
            fields: [
                'model',
                'kmh',
                'features',
                'booster',
                'ctrl'
            ],
        }
    },
    created() {
        this.getList(this);
    },
    methods: {
        getList(compo) {
            compo.isLoad = true;
            const sUrl = 'http://localhost:3000/car/list';
            compo.axios
                .get(sUrl)
                .then((resp) => {
                    compo.items = resp.data.cars;
                    compo.isLoad = false;
                })
                .catch((err) => {
                    compo.$data.isLoad = false;
                    compo.makeToast("Error", err.message, "danger");
                });
        },
        addItem() {
            this.$router.push({name: 'car_add'});
        },
        updateItem(item) {
            this.$router.push({name: 'car_edit', params: {id: item.id}});
        },
        removeItem(item) {
            const compo = this;

            this.$bvModal.msgBoxConfirm('Please confirm that you want to delete ' + item.model, {
                title: 'Please Confirm',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'danger',
                okTitle: 'YES',
                cancelTitle: 'NO',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
            })
                .then(value => {
                    if (value === true) {
                        compo.isLoad = true;
                        const sUrl = `http://localhost:3000/car/delete/${item.id}`;

                        compo.axios
                            .delete(sUrl)
                            .then((resp) => {
                                if (resp.data.item) {
                                    compo.$router.push({name:'car_list'});
                                } else {
                                    compo.makeToast("Error", 'Something went wrong', "danger");
                                }
                                compo.getList(compo);
                                compo.isLoad = false;
                            })
                            .catch((err) => {
                                compo.$data.isLoad = false;
                                compo.makeToast("Error", err.message, "danger");
                            });
                    }
                })
                .catch(err => {
                    // An error occurred
                    console.log(err);
                })
        },
    }
}
</script>

<style scoped>

</style>