<script setup>
import { userStore } from '@/stores/index'
import { onMounted } from 'vue'
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

// 导入路由
const router = useRouter()
const userSt = userStore()
// 页面渲染后获取用户信息
onMounted(() => {
  userSt.getUser()
})

// 根据点击下拉菜单选项跳转路由
const onCommand = async (command) => {
  if (command === 'logout') {
    await ElMessageBox.confirm('您确定要退出吗？', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'Warning'
    })
    userSt.removeToken()
    userSt.setUser({})
    router.push('/login')
  } else {
    router.push(`/user/${command}`)
  }
}
</script>

<template>
  <div class="layout-container">
    <el-container>
      <el-aside class="aside-container" width="200px">
        <div class="aside_logo"></div>
        <el-menu
          active-text-color="#ffd04b"
          background-color="#232323"
          :default-active="$route.path"
          text-color="#fff"
          router
        >
          <el-menu-item index="/article/channel">
            <el-icon><Management /></el-icon>
            <span>文章分类</span>
          </el-menu-item>
          <el-menu-item index="/article/manage">
            <el-icon><Promotion /></el-icon>
            <span>文章管理</span>
          </el-menu-item>
          <el-sub-menu index="/user">
            <template #title>
              <el-icon><UserFilled /></el-icon>
              <span>个人中心</span>
            </template>
            <el-menu-item index="/user/profile">
              <el-icon><User /></el-icon>
              <span>基本资料</span>
            </el-menu-item>
            <el-menu-item index="/user/avatar">
              <el-icon><Crop /></el-icon>
              <span>更换头像</span>
            </el-menu-item>
            <el-menu-item index="/user/password">
              <el-icon><EditPen /></el-icon>
              <span>重置密码</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div>
            用户：<strong>{{
              userSt.userInfo.username || userSt.userInfo.nickname
            }}</strong>
          </div>
          <el-dropdown placement="bottom-end">
            <span class="el-dropdown__box">
              <el-avatar :src="userSt.userInfo.user_pic || avatar" />
              <el-icon><CaretBottom /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown placement="bottom-end" @command="onCommand">
                <el-dropdown-menu>
                  <el-dropdown-item command="profile" :icon="User"
                    >基本资料</el-dropdown-item
                  >
                  <el-dropdown-item command="avatar" :icon="Crop"
                    >更换头像</el-dropdown-item
                  >
                  <el-dropdown-item command="password" :icon="EditPen"
                    >重置密码</el-dropdown-item
                  >
                  <el-dropdown-item command="logout" :icon="SwitchButton"
                    >退出登录</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.layout-container {
  .aside-container {
    height: 100vh;
    background-color: #000;

    .aside_logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center/120px auto;
    }
  }

  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-dropdown__box {
    }
  }
}
</style>
