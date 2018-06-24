import Vue from 'vue'
import Router from 'vue-router'
import CreatePackage from '@/components/CreatePackage'
import ListPackages from '@/components/ListPackages'
import EditPackage from '@/components/EditPackage'
import ViewPackage from '@/components/ViewPackage'
import CreateRegistry from '@/components/registry/CreateRegistry'
import ViewRegistry from '@/components/registry/ViewRegistry'
import ListRegistries from '@/components/registry/ListRegistries'
import SearchByLocation from '@/components/SearchByLocation'

Vue.use(Router)

export default new Router({
  routes: [
    // Packages
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
    // Registries
    {
      path: '/package/:idpackage/registry/create',
      name: 'CreateRegistry',
      component: CreateRegistry
    },
    {
      path: '/registries',
      name: 'ListRegistries',
      component: ListRegistries
    },
    {
      path: '/registry/view/:id',
      name: 'ViewRegistry',
      component: ViewRegistry
    },
    // Search by location
    {
      path: '/searchbylocation',
      name: 'SearchByLocation',
      component: SearchByLocation
    },
    // Catch-all redirect
    {
      path: '*',
      redirect: '/'
    }
  ]
})
