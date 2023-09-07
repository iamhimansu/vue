import {createWebHistory, createRouter} from 'vue-router';
import WelcomeHome from "@/pages/WelcomeHome.vue";

const router = createRouter({
    history: createWebHistory(),
    mode: 'history', // Use history mode for cleaner URLs
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
        {
            name: 'ArticleView',
            path: '/article/:id',
            props: true,
            component: () => import('@/pages/ArticleView.vue')
        },
    ]
});

export default router;