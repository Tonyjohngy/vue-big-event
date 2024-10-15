<script setup>
import { ref } from 'vue'
import { getChannelList } from '@/api/article'
// 父组件传递过来的文章分类id
defineProps({
  modelValue: {
    type: [Number, String]
  },
  width: {
    type: String
  }
})
// 文章分类列表
const channelList = ref([])
// 获得文章分类列表并赋值
const getChannelLists = async () => {
  const res = await getChannelList()
  channelList.value = res.data.data
}
// 执行获得文章分类方法
getChannelLists()
//声明要触发的事件
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <el-select
    :style="{ width }"
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <!-- $event -> $event.target.value select选中的值 双向绑定-->
    <el-option
      v-for="item in channelList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<style lang="scss" scoped></style>
