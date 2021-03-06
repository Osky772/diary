import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import './backend/init';
import './assets/styles.scss';

createApp(App).use(router).mount('#app');
