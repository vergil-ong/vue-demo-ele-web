import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/login/LoginView'
import AdminView from '@/views/admin/AdminView'
import GoodsCategoryView from '@/views/goods/GoodsCategoryView'
import GoodsView from '@/views/goods/GoodsView'
import AboutView from '@/views/AboutView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/admin',
    name: 'admin',
    meta: {
      chName: '后台管理',
    },
    component: AdminView,
    direct: false, 
    children: [
      {
        path: '/goods',
        name: 'goods',
        meta: {
          chName: '商品管理',
        },
        direct: false,
      },
      {
        path: '/goods/category',
        name: 'goodsCategory',
        meta: {
          chName: '品类管理',
        },
        component: GoodsCategoryView,
        direct: true
      },
      {
        path: '/goods/manage',
        name: 'goodsManage',
        meta: {
          chName: '商品列表',
        },
        component: GoodsView,
        direct: true
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
