import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        restaurants: [],
    },
    mutations: {
        setItems(state, items) {
            state.restaurants = items;
        },
        addItem(state, item) {
            state.restaurants.push(item);
        },
        updateItem(state, updatedItem) {
            const index = state.restaurants.findIndex((item) => item.id === updatedItem.id);
            if (index !== -1) {
                state.restaurants[index] = updatedItem;
            }
        },
        deleteItem(state, id) {
            const index = state.restaurants.findIndex((item) => item.id === id);
            if (index !== -1) {
                state.restaurants.splice(index, 1);
            }
        },
    },
    actions: {
        async fetchItems({commit}) {
            try {
                const response = await axios.get('/api/items'); // Replace with your API endpoint
                commit('setItems', response.data);
            } catch (error) {
                console.error('An error occurred while fetching data:', error);
            }
        },
        async createItem({commit}, newItem) {
            try {
                const response = await axios.post('/api/items', newItem); // Replace with your API endpoint
                commit('addItem', response.data);
            } catch (error) {
                console.error('An error occurred while creating an item:', error);
            }
        },
        async updateItem({commit}, updatedItem) {
            try {
                const response = await axios.put(`/api/items/${updatedItem.id}`, updatedItem); // Replace with your API endpoint
                commit('updateItem', response.data);
            } catch (error) {
                console.error('An error occurred while updating an item:', error);
            }
        },
        async deleteItem({commit}, id) {
            try {
                await axios.delete(`/api/items/${id}`); // Replace with your API endpoint
                commit('deleteItem', id);
            } catch (error) {
                console.error('An error occurred while deleting an item:', error);
            }
        },
    },
});
