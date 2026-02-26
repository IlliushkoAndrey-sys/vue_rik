import { createRouter, createWebHistory } from 'vue-router'


import Characters from '@/views/Characters.vue'
import Locations from '@/views/Locations.vue'
import Episodes from '@/views/Episodes.vue'
import CharacterDetails from '@/views/CharacterDetails.vue'
import LocationDetails from '@/views/LocationDetails.vue'
import NotFoundPage from "@/views/NotFoundPage.vue";


const routes = [
    { path: '/', redirect: '/characters' },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404'
    },
    {
        path: '/characters',
        component: Characters,
        children: [
            {
                path: ':id',
                component: CharacterDetails,
                meta: { showModal: true }
            }
        ],
        props: route => ({
            page: Number(route.query.page) || 1,
            search: route.query.search || ''
        }) },

    // {
    //     path: '/characters/:id',
    //     name: 'character-details',
    //     component: CharacterDetails,
    //     beforeEnter:(to, from, next) => {
    //         const id = Number(to.params.id)
    //
    //
    //         if(!Number.isInteger(id) || id <= 0) {
    //             next(`/404`)
    //         } else {
    //             next()
    //         }
    //     },
    //     props: true
    //
    // },
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
    {
        path: '/episodes',
        component: Episodes
    },

    {
        path: '/404',
        component: NotFoundPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
