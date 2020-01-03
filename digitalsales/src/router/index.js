import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../components/Category.vue'
import Article from '../components/Article.vue'
import Role from '../components/Role.vue'

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
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
