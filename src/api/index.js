import { http } from '@/utils/request'

// // 用户登录
// export const login = (data) => {
//   return http.post('/users/login', data)
// }

// // 用户注册
// export const register = (data) => {
//   return http.post('/users/register', data)
// }

// 博客信息
export const blogInfo = () => {
  return http.get('/blog/info')
}

// 文章列表
export const newsPosts = (params) => {
  return http.post('/blog/posts/list', params)
}

// 文章详情
export const postsDetail = (id) => {
  return http.get(`/blog/posts/detail/${id}`)
}

// 当前文章上下篇
export const postsRelated = (id) => {
  return http.get(`/blog/posts/related/${id}`)
}

// 所有分类
export const allCategories = () => {
  return http.get('/blog/category/all')
}

// 所有标签
export const allTags = () => {
  return http.get('/blog/tags/all')
}