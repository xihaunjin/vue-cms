import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/page/Hello'

const List = resolve => require(['@/page/staff/StaffList'], resolve)
const AddStaff = resolve => require(['@/page/staff/AddStaff'], resolve)
const Login = resolve => require(['@/page/Login'], resolve)
const StaffDetails = resolve => require(['@/page/staff/StaffDetails'], resolve)

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: __dirname,
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/staff/list/',
      name: 'StaffList',
      component: List
    },
    {
      path: '/staff/save',
      name: 'AddStaff',
      component: AddStaff
    },
    {
      path: '/staff/update/:id',
      name: 'UpdateStaff',
      component: AddStaff
    },
    {
      path: '/staff/info/:id',
      name: 'StaffDetails',
      component: StaffDetails
    }
  ]
})
export default router
