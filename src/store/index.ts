import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // 用于缓存数据

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
