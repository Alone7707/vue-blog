import { defineStore } from 'pinia'
import { allTags } from '@/api'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useTagStore = defineStore('tag', {
    state: () => {
        return {
            init: false,
            list: []
        }
    },
    actions: {
        async getTags() {
            return new Promise((resolve, reject) => {
                allTags().then(res => {
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
        getAllTag: async (state) => {
            if (!state.init) await state.getTags()
            return state.list
        }
    },
})