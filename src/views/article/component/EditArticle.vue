<script setup>
import { ref } from 'vue'
import { getArticleInfo, addArticle, artEditService } from '@/api/article.js'
import { ElMessage } from 'element-plus'
import ChannelSelector from '@/views/article/component/ChannelSelector.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { baseURL } from '@/utils/request.js'
import axios from 'axios'

// 控制抽屉模块
const isDrawer = ref(false)
// 文章重置数据
const defaultForm = ref({
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
})

// 上传图片组件引用
const imgUrl = ref('')
// 富文本框组件引用
const editorRef = ref('')
// 准备文章数据
const formModel = ref({
  ...defaultForm.value
})
const rules = {
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '标题名必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
}

// 表单引用
const formRef = ref(null)

// 暴露open方法实现组件
const open = async (row) => {
  isDrawer.value = true
  if (row.id) {
    formModel.value.id = row.id
    const res = await getArticleInfo(row.id)
    formModel.value = res.data.data
    imgUrl.value = baseURL + formModel.value.cover_img
    formModel.value.cover_img = await imageUrlToFile(
      imgUrl.value,
      formModel.value.cover_img
    )
  } else {
    formModel.value = { ...defaultForm.value }
    imgUrl.value = ''
    editorRef.value.setHTML('')
  }
}

// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], {
      type: response.headers['content-type']
    })

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
  }
}

// 成功后通知父类组件刷新
const emit = defineEmits('success')

// 上传图片
const onUpdate = (updateFile) => {
  // 显示图片预览
  imgUrl.value = URL.createObjectURL(updateFile.raw)
  formModel.value.cover_img = updateFile.raw
}

// 提交文章
const onPulish = async (state) => {
  formModel.value.state = state

  // 验证表单
  formRef.value.validate(async (valid) => {
    if (valid) {
      // 提交接口需要FormData类型的数据
      const fd = new FormData()
      // 循环并逐一添加到FormData中
      for (let i in formModel.value) {
        fd.append(i, formModel.value[i])
      }

      if (formModel.value.id) {
        await artEditService(fd)
        ElMessage({
          type: 'success',
          message: '文章修改成功'
        })
        isDrawer.value = false
        emit('success', 'edit')
      } else {
        await addArticle(fd)
        ElMessage({
          type: 'success',
          message: '文章添加成功'
        })
        isDrawer.value = false
        emit('success', 'add')
      }
    } else {
      ElMessage.error('请检查输入内容')
      return false
    }
  })
}

defineExpose({
  open
})
</script>

<template>
  <!-- 抽屉模块 -->
  <el-drawer
    v-model="isDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    :with-header="true"
    direction="rtl"
    size="50%"
  >
    <el-form ref="formRef" :model="formModel" :rules="rules" label-width="80px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类">
        <channel-selector
          width="100%"
          v-model="formModel.cate_id"
        ></channel-selector>
      </el-form-item>
      <el-form-item label="文章封面">
        <el-upload
          :auto-upload="false"
          class="avatar-uploader"
          :show-file-list="false"
          style="width: 200"
          :on-change="onUpdate"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            ref="editorRef"
            theme="snow"
            v-model:content="formModel.content"
            contentType="html"
          >
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPulish('已发布')">发布</el-button>
        <el-button @click="onPulish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
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
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
