import { createRouter, createWebHistory } from 'vue-router'


import Characters from '@/views/Characters.vue'
import Locations from '@/views/Locations.vue'
import Episodes from '@/views/Episodes.vue'


const routes = [
    { path: '/', redirect: '/characters' },
    {
        path: '/characters',
        component: Characters,
        props: route => ({
            page: Number(route.query.page) || 1,
            search: route.query.search || ''
        }) },
    {
        path: '/locations',
        component: Locations,
        props: route => ({
            page: Number(route.query.page) || 1,
            search: route.query.search || ''
        }) },
    { path: '/episodes', component: Episodes },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
