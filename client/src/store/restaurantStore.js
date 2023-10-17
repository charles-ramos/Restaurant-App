import axios from 'axios';
import {createStore} from 'vuex';

export default createStore({
    state: {
        restaurants: [],
    },
    mutations: {
        setItems(state, items) {
            state.restaurants = items;
        },
        // addItem(state, item) {
        //     state.restaurants.push(item);
        // },
        // updateItem(state, updatedItem) {
        //     const index = state.restaurants.findIndex((item) => item.id === updatedItem.id);
        //     if (index !== -1) {
        //         state.restaurants[index] = updatedItem;
        //     }
        // },
        // deleteItem(state, id) {
        //     const index = state.restaurants.findIndex((item) => item.id === id);
        //     if (index !== -1) {
        //         state.restaurants.splice(index, 1);
        //     }
        // },
    },
    actions: {
        async fetchRestaurants({commit}) {
            try {
                const {data} = await axios.get('http://localhost:3000/all'); // Replace with your API endpoint
                commit('setItems', data);
            } catch (error) {
                console.error('An error occurred while fetching data:', error);
            }
        },
        // async createItem({commit}, newItem) {
        //     try {
        //         const response = await axios.post('/api/items', newItem); // Replace with your API endpoint
        //         commit('addItem', response.data);
        //     } catch (error) {
        //         console.error('An error occurred while creating an item:', error);
        //     }
        // },
        // async updateItem({commit}, updatedItem) {
        //     try {
        //         const response = await axios.put(`/api/items/${updatedItem.id}`, updatedItem); // Replace with your API endpoint
        //         commit('updateItem', response.data);
        //     } catch (error) {
        //         console.error('An error occurred while updating an item:', error);
        //     }
        // },
        // async deleteItem({commit}, id) {
        //     try {
        //         await axios.delete(`/api/items/${id}`); // Replace with your API endpoint
        //         commit('deleteItem', id);
        //     } catch (error) {
        //         console.error('An error occurred while deleting an item:', error);
        //     }
        // },
    },
});
