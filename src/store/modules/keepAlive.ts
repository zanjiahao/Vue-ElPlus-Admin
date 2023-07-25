import { defineStore } from 'pinia'

export const useKeepAliveStore = defineStore({
  id: 'keepAlive',
  state: (): KeepAliveState => ({
    keepAliveName: []
  }),
  actions: {
    // Add
    async addKeepAliveName(name: string) {
      !this.keepAliveName.includes(name) && this.keepAliveName.push(name)
    },
    // Remove
    async removeKeepAliveName(name: string) {
      this.keepAliveName = this.keepAliveName.filter(item => item !== name)
    },
    // Set KeepAliveName
    async setKeepAliveName(keepAliveName: string[] = []) {
      this.keepAliveName = keepAliveName
    }
  }
})
