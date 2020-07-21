import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/home')
const My = () => import('../views/my/my')
const Cart = () => import('../views/cart/cart')
const Detail = () => import('../views/detail/detail')
Vue.use(VueRouter)

const routes = [
    {
        path:'',
        redirect:'/home'
    },
    {
        path:'/home',
        component:Home
    },
    {
        path:'/my',
        component:My
    },
    {
        path:'/cart',
        component:Cart
    },
    {
        path:'/detail',
        component:Detail
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router