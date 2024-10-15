<script setup>
import { getArticleList, deleteArticle } from '@/api/article'
import { ref } from 'vue'
import { Edit, DeleteFilled } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import ChannelSelector from '@/views/article/component/ChannelSelector.vue'
import { formatTime } from '@/utils/format'
import EditArticle from '@/views/article/component/EditArticle.vue'
// 控制加载楼层
const loading = ref(false)

// 文章列表
const articleList = ref([])

const drawer = ref()
// 传递参数
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
// 总条数
const total = ref(0)
// 编辑文章
const onEditArticle = (row) => {
  drawer.value.open(row)
}
// 新增文章
const onAddArticle = () => {
  drawer.value.open({})
}
// 删除文章
const onDeleteArticle = async (row) => {
  await ElMessageBox.confirm('您确定删除文章吗', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await deleteArticle(row.id)
  ElMessage({
    type: 'success',
    message: '删除文章成功！'
  })
  getArticle()
}
// 获取文章列表数据
const getArticle = async () => {
  loading.value = true
  const res = await getArticleList(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getArticle()
// 控制每页展示文章数目
const handleSizeChange = (size) => {
  params.value.pagesize = size
  params.value.pagenum = 1
  getArticle()
}
// 控制当前页码
const handleCurrentChange = (page) => {
  params.value.pagenum = page
  getArticle()
}
// 搜索文章列表
const onSearch = () => {
  params.value.pagenum = 1
  getArticle()
}
// 重置搜索数据
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticle()
}
//获取子组件传递的新增文章数据信息
const onSuccess = (type) => {
  if (type === 'add') {
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticle()
}
</script>

<template>
  <PageContainer title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">发布文章</el-button>
    </template>
    <el-form inline>
      <!-- vue3中的v-model是 :modelValue和@update:modelValue 的结合 -->
      <el-form-item label="文章分类：" width="400">
        <channel-selector
          v-model="params.cate_id"
          width="200px"
        ></channel-selector>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select style="width: 200px" v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch()">搜索</el-button>
        <el-button @click="onReset()">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="articleList" style="width: 100%">
      <el-table-column label="文章标题" prop="title" width="100">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"> </el-table-column>
      <el-table-column label="发表时间">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"> </el-table-column>
      <el-table-column label="操作">
        <!-- row是每行的数据 -->
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            type="primary"
            plain
            circle
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            :icon="DeleteFilled"
            type="danger"
            plain
            circle
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>
    <!-- 分页 -->
    <div class="demo-pagination-block">
      <el-pagination
        v-model:current-page="params.pagenum"
        v-model:page-size="params.pagesize"
        :page-sizes="[2, 3, 4, 5, 10]"
        :background="true"
        layout="jumper,total, sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="margin-top: 20px; justify-content: flex-end"
      />
    </div>
    <!-- 抽屉模块 -->
    <edit-article @success="onSuccess" ref="drawer"></edit-article>
  </PageContainer>
</template>

<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
