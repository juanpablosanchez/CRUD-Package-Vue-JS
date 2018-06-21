import Vue from 'vue'
import Router from 'vue-router'
import CreatePackage from '@/components/CreatePackage'
import ListPackages from '@/components/ListPackages'
import EditPackage from '@/components/EditPackage'
import ViewPackage from '@/components/ViewPackage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/package/create',
      name: 'CreatePackage',
      component: CreatePackage
    },
    {
      path: '/',
      name: 'ListPackages',
      component: ListPackages
    },
    {
      path: '/package/edit/:id',
      name: 'EditPackage',
      component: EditPackage
    },
    {
      path: '/package/view/:id',
      name: 'ViewPackage',
      component: ViewPackage
    },
    // Catch-all redirect
    {
      path: '*',
      redirect: '/'
    }
  ]
})
