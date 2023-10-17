import {createApp} from 'vue';
import App from './App.vue';
import restaurantStore from './store/restaurantStore';
import './assets/tailwind.css';

const app = createApp(App);

app.use(restaurantStore);

app.mount('#app');
