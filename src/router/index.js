import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/employees',
    name: 'employees',
    component: () => import(/* webpackChunkName: "employees" */ '../views/employees/index.vue')
  },
  {
    path: '/employee',
    name: 'employee',
    component: () => import(/* webpackChunkName: "employee" */ '../views/employees/Employee.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
