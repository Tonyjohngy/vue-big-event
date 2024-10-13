import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user'

export const userStore = defineStore(
  'user',
  () => {
    // 声明token
    const token = ref('')

    // 用户信息
    const userInfo = ref({})

    // 设置token的值
    const setToken = (newToken) => {
      token.value = newToken
    }
    // 清空token
    const removeToken = () => {
      token.value = ''
    }

    // 获取用户信息
    const getUser = async () => {
      const res = await userGetInfoService()
      userInfo.value = res.data.data
    }
    //更改用户信息
    const setUser = (obj) => {
      userInfo.value = obj
    }
    return { token, setToken, removeToken, getUser, userInfo, setUser }
  },
  { persist: true } //持久化
)
