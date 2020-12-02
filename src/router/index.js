import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/404', component: () => import('../views/404.vue'), hidden: true },
  {
    path: '/',
    name: "首页",
    component: () => import('../views/index.vue')

  },
  {
    path: "/Config",
    name: "config",
    component: () => import('../views/home.vue'),
    meta: {
      title: '配置'
    },
    children: [
      {
        path: 'rule',
        name: 'rule',
        component: () => import('../views/Config/rule/index.vue'),
        meta: {
          title: '规则配置'
        },
      },
      {
        path: 'DimConfig',
        name: 'DimConfig',
        component: () => import('../views/Config/DimConfig/index.vue'),
        meta: {
          title: '维度配置'
        },
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true },

]

const router = new VueRouter({
  routes
})

export default router
