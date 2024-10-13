import axios from 'axios'
import { userStore } from '@/stores/index'
import { ElMessage } from 'element-plus'
import router from '@/router'

const baseURL = 'https://big-event-vue-api-t.itheima.net'
const instance = axios.create({
  baseURL,
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    //2. 携带token
    const use = userStore()
    if (use.token) {
      config.headers.Authorization = use.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    // 3. 处理业务失败
    if (res.data.code === 0) {
      return res
    }
    // 4. 摘取核心响应数据
    ElMessage.error(res.data.message || '服务请求失败！')
    return Promise.reject(res.data)
  },
  (err) => {
    // 5. 处理401错误
    // 可选链用法，当问号前面有值才执行后面内容
    if (err.response?.status === 401) {
      router.push('/login')
    }
    ElMessage.error(err.response.data.message || '服务请求失败！')
    return Promise.reject(err)
  }
)

export default instance
