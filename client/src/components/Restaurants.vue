<template>
    <div>
        <!-- loop goes here -->
        <div class="card w-96 bg-base-100 shadow-xl" v-for="(restaurant, index) in restaurants" :key="index">
            <figure>
                <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                    alt="Shoes"
                />
            </figure>
            <div class="card-body">
                <div class="flex">
                    <img
                        class="mr-2"
                        :src="restaurant.icon_url"
                        style="
                             {
                                height: 20px;
                                width: 20px;
                            }
                        "
                    />
                    <h1 class="card-title">{{ restaurant.name }}</h1>
                </div>
                <div>
                    <span>Filter: </span>
                    <div class="badge badge-primary">{{ restaurant.filter_name }}</div>
                </div>
                <span
                    >Address: <a :href="restaurant.addressLink">{{ restaurant.formatted_address }}</a>
                </span>
                <!-- price level -->
                <div class="flex">
                    <span class="pr-2">Price Level: </span>
                    <span v-for="n in restaurant.price_level" :key="n"> $ </span>
                </div>
                <div>
                    <span class="pr-2">Type of Restaurant</span>
                    <div class="badge badge-secondary" v-for="n in restaurant.typeOfRestaurant" :key="n">{{ n }}</div>
                </div>
                <div class="card-actions">
                    <span>Others Rating</span>
                    <star-rating :rating="restaurant.rating" :read-only="true" :round-start-rating="false" />
                    <span>Jonathan's Rating</span>
                    <star-rating :rating="restaurant.valyas_rating" :read-only="true" :round-start-rating="false" />
                    <span>Valya's Rating</span>
                    <star-rating :rating="restaurant.jonathans_rating" :read-only="true" :round-start-rating="false" />
                </div>
                <div class="bg-white p-8 rounded shadow-lg">
                    <h2 class="text-2xl font-bold mb-6">Review</h2>
                    <div class="bg-gray-100 p-4 rounded-lg mb-4">
                        <h3 class="text-xl font-semibold mb-2">Jonathan's Review</h3>
                        <p class="text-base text-gray-700">{{ restaurant.jonathan_review }}</p>
                    </div>
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <h3 class="text-xl font-semibold mb-2">Valya's Review</h3>
                        <p class="text-base text-gray-700">{{ restaurant.valya_review }}</p>
                    </div>
                </div>
                <div>
                    <button class="btn" @click="openModal(restaurants[index])">Add Rating</button>
                </div>
            </div>
        </div>

        <!-- modal -->
        <!-- Open the modal using ID.showModal() method -->
        <Restaurant v-if="showModal" :restaurant="selectedRestaurant" @modal="handleModal" />
    </div>
</template>

<script>
    import StarRating from 'vue-star-rating';
    import Restaurant from './Restaurant.vue';
    import axios from 'axios';
    export default {
        components: {
            StarRating,
            Restaurant,
        },
        data() {
            return {
                restaurants: [],
                showModal: false,
                selectedRestaurant: null,
            };
        },
        methods: {
            openModal(selectedRestaurant) {
                this.showModal = true;
                this.selectedRestaurant = selectedRestaurant;
            },
            async fetchResturants() {
                const {data} = await axios.get('http://localhost:3000/all');
                this.restaurants = data;
            },
            handleModal(newModalState) {
                this.showModal = newModalState;
            },
        },
        mounted() {
            this.fetchResturants();
        },
        watch: {
            showModal(newModalState) {
                if (!newModalState) {
                    this.selectedRestaurant = null;
                    this.fetchResturants();
                }
            },
        },
    };
</script>

<style scoped></style>
