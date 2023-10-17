import {createStore} from 'vuex';

export default createStore({
    // is where we keep our state
    state: {
        restaurants: [],
    },
    // is where we mutate our state
    mutations: {
        setItems(state, item) {
            state.restaurants = item;
        },
    },
    // is where we put our async code
    actions: {},
});
