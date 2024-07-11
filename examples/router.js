import Vue from 'vue';
import VueRouter from 'vue-router';
import compSwitch from './compSwitch.json';
import {userCard, showList} from './cardConf/index.js';
import HomPage from './pages/home/index.vue';
import formPage from './pages/form/index.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: formPage,
    },
    {
        path: '/home',
        component: HomPage,
        props: {
            baseConf: {
                userCard,
                showList
            },
            compSwitch,
            foramteListFunc: productItem => ({
                ...productItem,
            })
        }
    }
];


export default new VueRouter({
    mode: 'history',
    base: __dirname,
    routes
});
