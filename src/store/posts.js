import { defineStore } from 'pinia'
import { postList } from '@/api'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const usePostStore = defineStore('post', {
    state: () => {
        return {
            init: false,
            list: []
        }
    },
    actions: {
        async getPosts() {
            return new Promise((resolve, reject) => {
                postList({
                    pageNum: 1,
                    pageSize: 5
                }).then(res => {
                    const { code, data } = res
                    if (code === 200) {
                        this.list = data.list
                        this.init = true
                    }
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        }
    },
    getters: {
        getNewPosts: async (state) => {
            if (!state.init) await state.getPosts()
            console.log("🚀 ~ state.list:", state.list)
            return state.list
        }
    },
})