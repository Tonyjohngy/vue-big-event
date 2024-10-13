<script setup></script>

<template>
  <PageContainer title="文章管理">
    <template #extra>
      <el-button type="primary">发布文章</el-button>
    </template>

    <el-form inline>
      <el-form-item label="文章分类：">
        <el-select width="100">
          <el-option :label="1" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select>
          <el-option :label="发布" :value="发布"></el-option>
          <el-option :label="未发布" :value="未发布"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button type="primary">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column label="文章标题" prop="title" width="100">
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date"></el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
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
  </PageContainer>
</template>

<style scoped></style>
