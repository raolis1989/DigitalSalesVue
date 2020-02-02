import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../components/Category.vue'
import Article from '../components/Article.vue'
import Role from '../components/Role.vue'
import User from '../components/User.vue'
import Client from '../components/Client.vue'
import Provider from '../components/Providers.vue'
import Login from '../components/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path:'categories',
    name: 'categories',
    component: Category
  },
  {
    path:'articles',
    name:'articles',
    component: Article
  },
  {
    path:'roles',
    name:'roles',
    component: Role
  },
  {
    path:'users',
    name:'users',
    component: User
  },
  {
    path:'clients',
    name:'clients',
    component:Client
  },
  {
    path:'providers',
    name:'providers',
    component:Provider
  },
  {
    path:'/login',
    name:'login',
    component:Login
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
