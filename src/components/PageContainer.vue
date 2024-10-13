<script setup>
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>
<!-- 使用具名插槽
  单纯传值不需要slot，拼接内容才用
-->
<template>
  <el-card class="page-container">
    <!-- 使用el-card的header插槽 -->
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
        <div>
          <!-- 定义extra插槽 -->
          <slot name="extra"></slot>
        </div>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  height: 100%;
  box-sizing: border-box;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
