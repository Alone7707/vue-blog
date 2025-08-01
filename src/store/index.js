import { defineStore } from 'pinia'
import { blogInfo } from '@/api/index'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useStore = defineStore('main', {
    state: () => {
        return {
            init: false,
            blogInfo: null,
            routeList: [
                { name: '首页', path: '/' },
                { name: '关于', path: '/about' },
                { name: '分类', path: '/category' },
                { name: '归档', path: '/archive' },
                { name: '联系', path: '/contact' }
            ]
        }
    },
    actions: {
        async getBlogInfo() {
            return new Promise((resolve, reject) => {
                if (this.init) return resolve()
                blogInfo().then(res => {
                    this.blogInfo = res.data
                    this.init = true
                    resolve()
                }).catch(err => {
                    reject()
                })
            })
        }
    },
})