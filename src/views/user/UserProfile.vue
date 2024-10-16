<script setup>
import { ref } from 'vue'
import { userGetInfoService, userUpdateInfoService } from '@/api/user'
import { ElMessage } from 'element-plus'
const uerForm = ref({
  id: '',
  username: '',
  nickname: '',
  email: '',
  user_pic: ''
})

const rules = ref({
  nickname: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '长度大于5小于10', trigger: 'blur' }
  ],
  email: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: '请输入正确格式的邮箱',
      trigger: 'blur'
    }
  ]
})
const getUserInfo = async () => {
  const res = await userGetInfoService()
  uerForm.value = res.data.data
}
getUserInfo()
const onSubmit = async () => {
  await userUpdateInfoService(uerForm.value)
  ElMessage.success('修改用户数据成功!')
}
</script>

<template>
  <page-container title="个人详情" class="user-form">
    <el-form ref="form" :model="uerForm" :rules="rules" label-width="80px">
      <el-form-item label="登录名称">
        <el-input v-model="uerForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input
          v-model="uerForm.nickname"
          placeholder="请输入用户昵称"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input
          v-model="uerForm.email"
          placeholder="请输入用户邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交修改</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>

<style scoped lang="scss">
.user-form {
  .el-input {
    width: 50%;
  }
}
</style>
