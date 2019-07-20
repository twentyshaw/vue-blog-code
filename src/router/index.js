import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index/index'
import Login from '@/pages/login/index'
import Register from '@/pages/register/index'
import Create from '@/pages/create/index'
import Detail from '@/pages/detail/index'
import Edit from '@/pages/edit/index'
import My from '@/pages/my/index'
import User from '@/pages/user/index'
import store from '../store'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Index
    },    
    {
    	path: '/login',
    	component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/create',
      component: Create,
      meta:{requiresAuth:true}
    },
    {
      path: '/detail/:blogId',
      component: Detail
    },
    {
      path: '/edit/:blogId',
      component: Edit,
      meta:{requiresAuth:true}
    },
    {
      path: '/my',
      component: My,
      meta:{requiresAuth:true}
    },
    {
      path: '/user/:userId',
      component: User
    }
  ]
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch('getInfo').then(isLogin=>{
      if (!isLogin) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
      } else {
        next()
      }
    })
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router