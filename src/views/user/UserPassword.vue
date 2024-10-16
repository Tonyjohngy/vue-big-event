<script setup>
import { ref } from 'vue'
import { userUpdatePassService } from '@/api/user'
import { ElMessage } from 'element-plus'
import { userStore } from '@/stores'
import { useRouter } from 'vue-router'
// 获取用户信息
const user = userStore()
// 引用表单
const formRef = ref()
// 默认表单的值
const defaultForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})
// 路由对象
const router = useRouter()
// 表单数据对象
const passwordForm = ref({ ...defaultForm.value })
// 表单规则
const rules = ref({
  old_pwd: [
    { required: true, message: '请输入长度大于6小于15密码', trigger: 'blur' },
    { min: 6, max: 15, message: '长度大于6小于15', trigger: 'blur' }
  ],
  new_pwd: [
    { required: true, message: '请输入长度大于6小于15密码', trigger: 'blur' },
    { min: 6, max: 15, message: '长度大于6小于15', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === passwordForm.value.old_pwd) {
          return callback(new Error('新密码不能与原来密码一样！'))
        } else {
          return callback()
        }
      },
      trigger: 'blur'
    }
  ],
  re_pwd: [
    { required: true, message: '请输入长度大于6小于15密码', trigger: 'blur' },
    { min: 6, max: 15, message: '长度大于6小于15', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.value.new_pwd) {
          return callback(new Error('两次输入的密码不一致！'))
        } else {
          return callback()
        }
      },
      trigger: 'blur'
    }
  ]
})
// 提交表单数据
const onSubmit = async () => {
  const valid = await formRef.value.validate()
  if (valid) {
    await userUpdatePassService(passwordForm.value)
    ElMessage.success('修改密码成功!')

    user.removeToken()
    user.setUser({})
    router.push('/login')
  }
}
// 重置表单数据
const onReset = () => {
  passwordForm.value = { ...defaultForm }
}
</script>

<template>
  <page-container title="重置密码" class="user-form">
    <el-form
      ref="formRef"
      :model="passwordForm"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="原密码" prop="old_pwd">
        <el-input
          type="password"
          v-model="passwordForm.old_pwd"
          placeholder="请输入原密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input
          type="password"
          v-model="passwordForm.new_pwd"
          placeholder="请输入新密码"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="确认新密码"
        prop="re_pwd"
        style="white-space: nowrap"
      >
        <el-input
          type="password"
          v-model="passwordForm.re_pwd"
          placeholder="请再次输入新密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">修改密码</el-button>
        <el-button type="default" @click="onReset()">重置</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>

<style scoped lang="scss">
.user-form {
  padding: 5px 15px;
  .el-input {
    width: 50%;
  }
}
</style>
