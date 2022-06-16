<template>
    <div id="app">
        <b-navbar type="dark" variant="dark">
            <b-navbar-nav>
                <b-nav-item :to="{name: 'home'}">Estimation</b-nav-item>
                <b-nav-item :to="{name: 'car_list'}">Cars</b-nav-item>
            </b-navbar-nav>
        </b-navbar>
        <b-container>
            <router-view />
        </b-container>
    </div>
</template>

<script>

export default {
    name: 'App',
    components: {
    }
}
</script>

<style>

</style>
