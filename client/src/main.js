import {createApp} from 'vue';
import App from './App.vue';
import restaurantStore from './store/restaurantStore';
import './assets/tailwind.css';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import './service-worker';

const app = createApp(App);

app.use(restaurantStore);
app.use(ToastPlugin);

app.mount('#app');


