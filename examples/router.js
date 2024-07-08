import Vue from 'vue';
import VueRouter from 'vue-router';
import compSwitch from './compSwitch.json';
import {userCard, showList} from './cardConf/index.js';
import HomPage from './play/home/index.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: HomPage,
        props: {
            baseConf: {
                userCard,
                showList
            },
            compSwitch,
            foramteListFunc: productItem => ({
                ...productItem,
                originalPrice: '￥' + productItem.originalPrice,
                price: '￥' + productItem.price
            })
        }
    }
];


export default new VueRouter({
    mode: 'history',
    base: __dirname,
    routes
});
