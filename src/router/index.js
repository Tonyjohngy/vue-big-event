import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  // 配置history模式： createWebHistory 不带井号 createHashHistory 带井号
  // import.meta.env.BASE_URL  import.meta.env是固定的，import.meta.env.DEV是目前的开发环境
  // import.meta.env.BASE_URL 是网址资源路径的前缀（url前缀），可在vite.js中配置也可以在这里
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //登录注册页面
    {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue')
    },
    // 布局架子
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        // 文章管理
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        // 频道管理
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        // 个人详情
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        // 更换头像
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        // 重置密码
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

export default router
