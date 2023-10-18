<template>
    <div class="fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-black bg-opacity-50">
        <div class="w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 h-4/5 md:h-3/4 lg:h-2/3 xl:h-1/2 p-4 bg-white rounded-lg shadow-md overflow-y-auto">
            <!-- top: 12rem;
    right: 50rem; -->
            <button class="absolute sm:top-48 sm:right-[50rem] top-24 right-7 text-gray-500 hover:text-gray-800 z-30" @click="() => closeModal()">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>

            <div class="card">
                <h1 class="text-center text-xl">
                    <strong>{{ restaurant.name }}</strong>
                </h1>
                <!-- 'Fast Food', 'Fine Dining', 'Casual Dining', 'Café', 'Bar') -->
                <figure class="w-full">
                    <img
                        class="w-full h-auto"
                        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                        alt="Shoes"
                    />
                </figure>
                <div class="mt-3">
                    <label for="filter">Filter: </label>
                    <div class="inline-block" v-if="restaurant.filter_type === null">
                        <select class="select select-bordered select-sm w-full max-w-xs" name="filter option" id="filter" v-model="filterType">
                            <option disabled selected>Select Filter</option>
                            <option value="Fast Food">Fast Food</option>
                            <option value="Fine Dining">Fine Dining</option>
                            <option value="Casual Dining">Casual Dining</option>
                            <option value="Café">Café</option>
                            <option value="Bar">Bar</option>
                        </select>
                    </div>
                    <div v-else class="badge badge-primary">{{ restaurant.filter_type }}</div>
                </div>
                <div class="card-body">
                    <div class="card-actions flex flex-col sm:flex-row">
                        <div>
                            <span class="text-xs sm:text-base">Others Rating</span>
                            <star-rating :rating="restaurant.rating" class="text-xs sm:text-base" :read-only="true" />
                        </div>
                        <div>
                            <span class="text-xs sm:text-base">Valya's Rating</span>
                            <star-rating :rating="restaurant.valyas_rating" @update:rating="changeValyasRating" class="text-xs sm:text-base" />
                        </div>
                        <div>
                            <span class="text-xs sm:text-base">Jonathan's Rating</span>
                            <star-rating :rating="restaurant.jonathans_rating" @update:rating="changeJonathansRating" class="text-xs sm:text-base" />
                        </div>
                    </div>

                    <div class="bg-white p-4 rounded shadow-lg">
                        <h2 class="text-lg font-bold mb-4">Review</h2>
                        <div class="bg-gray-100 p-2 rounded-lg mb-2">
                            <h3 class="text-md font-semibold mb-1">Jonathan's Review</h3>
                            <textarea class="text-base bg-gray-100 text-gray-700 w-full resize-y" v-model="jonathansReview"></textarea>
                        </div>
                        <div class="bg-gray-100 p-2 rounded-lg">
                            <h3 class="text-md font-semibold mb-1">Valya's Review</h3>
                            <textarea class="text-base bg-gray-100 text-gray-700 w-full resize-y" v-model="valyasReview"></textarea>
                        </div>
                    </div>
                    <!-- <button class="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Submit</button> -->
                    <button @click="submit(restaurant.id)" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import StarRating from 'vue-star-rating';
    import axios from 'axios';

    export default {
        props: ['restaurant', 'modal'],
        components: {
            StarRating,
        },
        data() {
            return {
                valyasReview: this.restaurant.valya_review,
                jonathansReview: this.restaurant.jonathan_review,
                valyasRating: this.restaurant.valyas_rating,
                jonathansRating: this.restaurant.jonathans_rating,
                filterType: this.restaurant.filter_type,
            };
        },
        methods: {
            closeModal() {
                this.$emit('modal', false);
            },
            async submit(id) {
                const newChanges = {
                    valyasReview: this.valyasReview,
                    jonathansReview: this.jonathansReview,
                    valyasRating: this.valyasRating,
                    jonathansRating: this.jonathansRating,
                    filterType: this.filterType,
                };

                if (newChanges.filterType === null) {
                    console.log('please choose a filter ');
                    return;
                }
                const {data} = await axios.put(`http://localhost:3000/update?id=${id}`, newChanges);
                if (data) {
                    this.$emit('modal', false);
                }
            },
            changeValyasRating(rating) {
                this.valyasRating = rating;
            },
            changeJonathansRating(rating) {
                this.jonathansRating = rating;
            },
        },
    };
</script>

<style scoped></style>
