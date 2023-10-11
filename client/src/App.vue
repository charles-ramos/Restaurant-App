<template>
    <NavigationBar />
    <Search />
    <Restaurants />
</template>

<script>
    import './assets/tailwind.css';
    import NavigationBar from './components/NavigationBar.vue';
    import Search from './components/Search.vue';
    import Restaurants from './components/Restaurants.vue';
    export default {
        data() {
            return {
                message: 'Hello Vue!',
            };
        },
        components: {
            NavigationBar,
            Search,
            Restaurants,
        },
        methods() {
            return {
                test() {
                    console.log('test');
                },
            };
        },
    };
</script>

<style scoped></style>
