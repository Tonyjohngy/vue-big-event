<script setup>
import { Plus, Upload } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { userUpdateAvaService } from '@/api/user'
import { userStore } from '@/stores'
// 调用userStore类
const user = userStore()
// 新建头像对象并赋于用户的图像信息
const userAvatar = ref(user.userInfo.user_pic)
// upload引用对象
const uploadRef = ref()
// 实现选择并展示头像
const onSelectAvatar = (file) => {
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    userAvatar.value = reader.result
    console.log(userAvatar.value)
  }
}
// 提交新的头像
const onSubmitAvatar = async () => {
  if (userAvatar.value === user.userInfo.user_pic) {
    ElMessage.error('请选择新的图片')
    return
  }
  await userUpdateAvaService(userAvatar.value)
  await user.getUser
  ElMessage.success('更换头像成功')
}
</script>

<template>
  <page-container title="更换头像">
    <el-form>
      <el-form-item>
        <el-upload
          ref="uploadRef"
          :auto-upload="false"
          class="avatar-uploader"
          :show-file-list="false"
          style="width: 200"
          :on-change="onSelectAvatar"
        >
          <img v-if="userAvatar" :src="userAvatar" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="uploadRef.$el.querySelector('input').click()"
          plain="true"
          :icon="Plus"
          >选择头像</el-button
        >
        <el-button
          type="success"
          @click="onSubmitAvatar()"
          plain="true"
          :icon="Upload"
          >上传头像</el-button
        >
      </el-form-item>
    </el-form>
  </page-container>
</template>

<style scoped lang="scss">
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
</style>
