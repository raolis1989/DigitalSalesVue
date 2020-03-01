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
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      Admin :true,
      Warehouse :true,
      Seller :true

    }
  },
  {
    path:'categories',
    name: 'categories',
    component: Category,
    meta: {
      Admin :true,
      Warehouse :true,
    }
  },
  {
    path:'articles',
    name:'articles',
    component: Article,
    meta: {
      Admin :true,
      Warehouse :true
    }
  },
  {
    path:'roles',
    name:'roles',
    component: Role,
    meta: {
      Admin :true,
    }
  },
  {
    path:'users',
    name:'users',
    component: User,
    meta: {
      Admin :true,
    }
  },
  {
    path:'clients',
    name:'clients',
    component:Client,
    meta: {
      Admin :true,
      Seller :true

    }
  },
  {
    path:'providers',
    name:'providers',
    component:Provider,
    meta: {
      Admin :true,
      Warehouse :true,
    }
  },
  {
    path:'/login',
    name:'login',
    component:Login,
    meta: {
      Free:  true

    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

router.beforeEach( (to, from, next) => {
   if(to.matched.some(record => record.meta.Free))
   {
     next()
   }else if(store.state.user && store.state.user.rol =="Admin"){
      if(to.matched.some(record => record.meta.Admin)){
        next()
      }
   }else if(store.state.user && store.state.user.rol =="Warehouse"){
      if(to.matched.some(record => record.meta.Warehouse)){
        next()
      }
   }else if(store.state.user && store.state.user.rol =="Seller"){
    if(to.matched.some(record => record.meta.Seller)){
      next()
    }
 }else{
   next({
     name:'login'
   })
 }
})