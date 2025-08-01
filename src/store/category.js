import { defineStore } from 'pinia'
import { allCategories } from '@/api'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useCategoryStore = defineStore('category', {
    state: () => {
        return {
            init: false,
            list: []
        }
    },
    actions: {
        async getCategories() {
            return new Promise((resolve, reject) => {
                allCategories().then(res => {
                    const { code, data } = res
                    if (code === 200) {
                        this.list = data
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
        getAllCategory: async (state) => {
            if (!state.init) await state.getCategories()
            return state.list
        }
    },
})