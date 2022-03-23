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
    path: '/employees/:id',
    name: 'employee',
    component: () => import(/* webpackChunkName: "employee" */ '../views/employees/Employee.vue')
  },
  {
    path: '/advances',
    name: 'advances',
    component: () => import(/* webpackChunkName: "advances" */ '../views/advances/index.vue')
  },
  {
    path: '/payroll',
    name: 'payroll',
    component: () => import(/* webpackChunkName: "payroll" */ '../views/payroll/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
