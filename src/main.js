import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
import router from '@/router/index'
import pinia from '@/stores/index'
// 全局跳转样式
import '@/assets/main.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
