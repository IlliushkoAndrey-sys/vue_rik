import { createRouter, createWebHistory } from "vue-router";

import Characters from "@/views/Characters.vue";
import Locations from "@/views/Locations.vue";
import Episodes from "@/views/Episodes.vue";
import CharacterDetails from "@/views/CharacterDetails.vue";
import LocationDetails from "@/views/LocationDetails.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";
import Login from "@/views/Login.vue";
import { useAuth } from "../composables/useAuth.js";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { requiresAuth: false },
  },
  { path: "/", redirect: "/login" },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
  {
    path: "/characters",
    component: Characters,
    meta: { requiresAuth: true },

    props: (route) => ({
      page: Number(route.query.page) || 1,
      search: route.query.search || "",
    }),
  },

  {
    path: "/characters/:id",
    name: "character-details",
    component: CharacterDetails,
    meta: { requiresAuth: true },
    props: true,
  },

  {
    path: "/locations/:id",
    name: "location-details",
    component: LocationDetails,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/locations",
    component: Locations,
    meta: { requiresAuth: true },

    props: (route) => ({
      page: Number(route.query.page) || 1,
      search: route.query.search || "",
    }),
  },
  {
    path: "/episodes",
    meta: { requiresAuth: true },
    component: Episodes,
  },

  {
    path: "/404",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { token } = useAuth();

  if (to.meta.requiresAuth && !token.value) {
    console.warn("Доступ заборонено: потрібен логін");
    next("/login");
  } else {
    next();
  }
});

export default router;
