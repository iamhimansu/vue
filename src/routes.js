import {createWebHistory, createRouter} from 'vue-router';
import WelcomeHome from "@/pages/WelcomeHome.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'Welcome',
            path: '/',
            component: WelcomeHome
        },
        {
            name: 'Home',
            path: '/home',
            component: () => import('@/pages/HomePage.vue')
        },
        {
            name: 'EditArticles',
            path: '/create',
            component: () => import('@/pages/EditArticles.vue')
        },
        {
            name: 'LoginPage',
            path: '/login',
            component: () => import('@/pages/LoginPage.vue')
        },
        {
            name: 'SignUpPage',
            path: '/register',
            component: () => import('@/pages/RegisterPage.vue')
        },
    ]
});

export default router;