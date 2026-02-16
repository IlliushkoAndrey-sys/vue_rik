import { createRouter, createWebHistory } from 'vue-router'


import Characters from '@/views/Characters.vue'
import Locations from '@/views/Locations.vue'
import Episodes from '@/views/Episodes.vue'
import CharacterDetails from '@/components/CharacterDetails.vue'
import LocationDetails from '@/components/LocationDetails.vue'



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
        path: '/characters/:id',
        name: 'character-details',
        component: CharacterDetails,
        props: true

    },
    {
        path: '/locations/:id',
        name: 'location-details',
        component: LocationDetails,
        props: true

    },
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
