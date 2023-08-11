import { createRouter, createWebHistory } from "vue-router";

import WeatherPage from '../views/WeatherPage.vue';
import WeatherUpcomingPage from '../views/WeatherUpcomingPage.vue';
import ProfilePage from '../views/ProfilePage.vue';
import NotFoundPage from '../views/NotFoundPage.vue';
import AuthPage from '../views/AuthPage.vue';

import { storeToRefs } from "pinia";
import { useAuthStore } from '../store/auth.js';

const routes = [
    {
        path: '/',
        component: WeatherPage,
        name: 'CurrentWeather'
    },
    {
        path: '/weather-upcoming',
        component: WeatherUpcomingPage,
        name: 'WeatherUpcoming'
    },
    {
        path: '/profile',
        component: ProfilePage,
        name: 'Profile',
        meta: { requiresAuth: true }
    },
    {
        path: '/auth',
        component: AuthPage,
        name: 'Auth'
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFoundPage,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const { isLoggedIn } = storeToRefs(authStore);

    // Ak nie je pouzivatel prihlaseny, spravime redirect na Auth
    if (to.meta.requiresAuth && !isLoggedIn.value) {
        next({ name: "Auth" });
    } else {
        next();
    }
});

export default router;
