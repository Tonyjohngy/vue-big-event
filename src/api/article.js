import request from '@/utils/request'

// 获取文章分类
export const getChannelList = () => request.get('/my/cate/list')
// 增加文章分类
export const addChannel = (data) => request.post('/my/cate/add', data)
// 删除文章分类
export const delChannel = (id) =>
  request.delete('my/cate/del', { params: { id } })
// 更新文章分类
export const updateChannel = (data) => request.put('/my/cate/info', data)
