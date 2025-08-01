import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/home/BlogMain.vue'),
    meta: { title: '首页', keepAlive: true }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/about/AboutPage.vue'),
    meta: { title: '关于' }
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('@/pages/category/CategoryPage.vue'),
    meta: { title: '分类' }
  },
  {
    path: '/category/:name',
    name: 'CategoryDetail',
    component: () => import('@/pages/category/CategoryDetailPage.vue'),
    meta: { title: '分类文章' }
  },
  {
    path: '/post/:id',
    name: 'PostDetail',
    component: () => import('@/pages/post/PostDetailPage.vue'),
    meta: { title: '文章详情' }
  },
  {
    path: '/archive',
    name: 'Archive',
    component: () => import('@/pages/archive/ArchivePage.vue'),
    meta: { title: '归档' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/pages/contact/ContactPage.vue'),
    meta: { title: '联系' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(async (to, from, next) => {
  document.title = '加载中...'
  // if (to.name === 'CategoryDetail') {
  //   document.title = `${to.params.name} - 分类文章 - 探索与思考`
  // } else if (to.name === 'PostDetail') {
  //   document.title = `文章详情 - 探索与思考`
  // } else {
  // }
  const store = useStore()
  await store.getBlogInfo()
  document.title = (to.meta.title ? `${to.meta.title + ' - '}` : '') + store.blogInfo.title
  console.log("🚀 ~ to.meta.title:", to.meta.title)
  next()
})

export default router


