<script setup>
import { Edit, DeleteFilled } from '@element-plus/icons-vue'
import { getChannelList, delChannel } from '@/api/article'
import { onMounted, ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import EditChannel from './component/EditChannel.vue'
// 定义获取数据分类的对象
const channelList = ref([])
// 设置楼层
const loading = ref(false)
// ref关联对话框组件
const dialog = ref()

// 获取分类数据
const getChannel = async () => {
  loading.value = true
  const res = await getChannelList()
  channelList.value = res.data.data
  loading.value = false
}

onMounted(getChannel)
// 编辑分类
const editChannel = (row) => {
  dialog.value.open(row)
}

// 删除分类
const deleteChannel = async (row) => {
  await ElMessageBox.confirm('您确认删除吗?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await delChannel(row.id)
  ElMessage({
    type: 'success',
    message: '删除分类成功！'
  })
  getChannel()
}
// 添加分类
const addTheChannel = () => {
  dialog.value.open({})
}

// 成功后刷新页面
const onSuccess = () => {
  getChannel()
}
</script>
<template>
  <pageContainer title="文章分类">
    <!-- 使用extra插槽 -->
    <template #extra>
      <el-button type="primary" @click="addTheChannel">添加分类</el-button>
    </template>
    <!-- v-loading 设置加载楼层 -->
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="150">
        <!-- row是每行的数据 -->
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            type="primary"
            plain
            circle
            @click="editChannel(row)"
          ></el-button>
          <el-button
            :icon="DeleteFilled"
            type="danger"
            plain
            circle
            @click="deleteChannel(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>
    <EditChannel ref="dialog" @success="onSuccess"></EditChannel>
  </pageContainer>
</template>

<style lang="scss" scoped>
.edit-dialog {
  .edit-name {
    margin: 5 5;
  }
}
</style>
