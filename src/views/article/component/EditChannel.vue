<script setup>
import { ref } from 'vue'
import { addChannel, updateChannel } from '@/api/article.js'
import { ElMessage } from 'element-plus'

// 文章分类编辑框
const isDialog = ref(false)

// open方法，当传递来的值是{}则是添加，有row就赋值
const open = (row) => {
  isDialog.value = true
  // { ...row }创建一个新的对象并赋值给channelModel，通过浅拷贝
  channelModel.value = { ...row }
}
const channelModel = ref({
  id: '',
  cate_name: '',
  cate_alias: ''
})

const form = ref()

// 分类表单验证
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名字', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: blur
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: blur },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位的字母数字',
      trigger: 'blur'
    }
  ]
}
const emit = defineEmits(['success'])

// 提交数据
const onSubmit = async () => {
  await form.value.validate()
  if (channelModel.value.id) {
    await updateChannel(channelModel.value)
  } else {
    await addChannel(channelModel.value)
  }
  ElMessage({
    type: 'success',
    message: channelModel.value.id ? '编辑成功！' : '新增成功！'
  })
  // 返回成功结果给父组件
  emit('success')
  isDialog.value = false
}

// 暴露方法
defineExpose({ open })
</script>
<template>
  <el-dialog
    v-model="isDialog"
    style="width: 450px"
    class="edit-dialog"
    :title="channelModel.id ? '分类编辑' : '新增分类'"
  >
    <el-form :rules="rules" :model="channelModel" ref="form">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input
          v-model="channelModel.cate_name"
          minlength="1"
          maxlength="10"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input
          v-model="channelModel.cate_alias"
          minlength="1"
          maxlength="15"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isDialog = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
