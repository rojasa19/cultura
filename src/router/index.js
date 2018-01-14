import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Dashboard from '@/components/Dashboard'
import NewUser from '@/components/NewUser'
import EditUser from '@/components/EditUser'
import ViewUser from '@/components/ViewUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'new-user',
      component: NewUser
    },
    {
      path: '/edit/:email ',
      name: 'edit-user',
      component: EditUser
    },
    {
      path: '/:email',
      name: 'view-user',
      component: ViewUser
    }
  ]
})
