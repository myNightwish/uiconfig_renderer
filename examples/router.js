import Vue from 'vue';
import VueRouter from 'vue-router';
import compSwitch from './compSwitch.json';
import {userCard, showList} from './cardConf/index.js';
import HomPage from './pages/home/index.vue';
import formPage from './pages/form/index.vue';
import DragDropEditor from './pages/DragDropEditor.vue';


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: DragDropEditor,
    },
    {
        path: '/form',
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
    mode: 'hash',
    base: __dirname,
    routes
});
