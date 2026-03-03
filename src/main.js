import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/store.js'
import './assets/main.css'
import Vue3LazyLoad from 'vue3-lazyload'

async function bootstrap() {
    const res = await fetch('/mock-auth/token', {
        method: 'POST'
    })

    const data = await res.json()

    localStorage.setItem('auth_token', data.token)

    createApp(App)
        .use(store)
        .use(router)
        .use(Vue3LazyLoad, {
            error: '@/public/rick.png',
            attempt: 1,
        })
        .mount('#app')
}

bootstrap()