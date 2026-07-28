import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/store.js'
import './assets/main.css'
import Vue3LazyLoad from 'vue3-lazyload';



createApp(App)
    .use(store)
    .use(router)
    .use(Vue3LazyLoad, {
        error: '@/public/rick.png',
        attempt: 1,
    })
    .mount('#app')