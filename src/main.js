import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import HomePage from './page/HomePage.vue';
import LoginPage from './page/LoginPage.vue';
import BookPage from './page/BookPage.vue';
import CartPage from './page/CartPage.vue';
import OrderPage from './page/OrderPage.vue';
import ApiPage from './page/ApiPage.vue';
import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/login', component: LoginPage },
        { path: '/cart', component: CartPage },
        { path: '/order', component: OrderPage },
        { path: '/book/:id', component: BookPage },
        { path: '/api-docs', component: ApiPage },
        { path: '/:catchAll(.*)', redirect: '/' },
    ]
});
createApp(App).use(Antd).use(router).mount('#app')
