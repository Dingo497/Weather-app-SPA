import './bootstrap';
import {createApp} from 'vue';
import { createPinia } from 'pinia'
import router from './router/index.js';
import App from './App.vue';

import VueFeather from 'vue-feather';

const pinia = createPinia();
const app = createApp(App);

app.component(VueFeather.name, VueFeather);

app.use(pinia)
    .use(router)
    .mount("#app");

