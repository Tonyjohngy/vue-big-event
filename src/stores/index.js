import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

// pinia配置分离
const pinia = createPinia()
pinia.use(persist)
export default pinia

//统一管理并暴露仓库
export * from './modules/count'
export * from './modules/user'
