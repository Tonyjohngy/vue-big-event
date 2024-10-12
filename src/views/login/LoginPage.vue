<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
// 引入的是函数不用() 对象就要
import { userRegisterService, userLoginService } from '@/api/user.js'
import { ElMessage } from 'element-plus'
import { userStore } from '@/stores/index'
import { useRouter } from 'vue-router'
// 控制注册登录页面切换
const isRegister = ref(false)
// 设置token类
const userToken = userStore()
// 路由
const router = useRouter()

// 表单属性
const ruleForm = ref({
  username: '',
  password: '',
  repassword: ''
})
// 表单校验规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '长度大于5小于10', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 15, message: '长度大于6小于15', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { min: 6, max: 15, message: '长度大于6小于15', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    },
    // rule 校验规则 value传入的值 callback返回的结果
    {
      validator: (rule, value, callback) => {
        if (value !== ruleForm.value.password) {
          return callback(new Error('两次输入的密码不一致！'))
        } else {
          return callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
// 定义绑定表单
const form = ref()

// 注册
const register = async () => {
  //再次校验表单数据
  await form.value.validate()
  await userRegisterService(ruleForm.value)
  ElMessage.success('注册成功!')
  isRegister.value = false
}

// 登录
const login = async () => {
  await form.value.validate()
  const res = await userLoginService(ruleForm.value)
  userToken.setToken(res.data.token)
  ElMessage.success('登陆成功！')
  router.push('/')
}

// 监视器
watch(isRegister, () => {
  ruleForm.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
</script>
<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"> </el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-form v-if="isRegister" :rules="rules" :model="ruleForm" ref="form">
        <el-form-item>
          <h1 class="title">注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            name="username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            name="password"
            :prefix-icon="Lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="ruleForm.repassword"
            type="password"
            name="repassword"
            :prefix-icon="Lock"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            @click="register()"
            auto-insert-space
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <el-form class="form" :model="ruleForm" :rules="rules" ref="form" v-else>
        <el-form-item>
          <h1 class="title">登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            :prefix-icon="Lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox label="记住我"></el-checkbox>
            <el-link type="info"> 忘记密码 </el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="login"
            class="button"
            type="primary"
            auto-insert-space
          >
            登录
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center/cover;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
