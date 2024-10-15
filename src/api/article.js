import request from '@/utils/request'

// 获取文章分类
export const getChannelList = () => request.get('/my/cate/list')
// 增加文章分类
export const addChannel = (data) => request.post('/my/cate/add', data)
// 删除文章分类
export const delChannel = (id) =>
  request.delete('my/cate/del', { params: { id } })
// 更新文章分类
export const updateChannel = (params) =>
  request.put('/my/cate/info', { params })
// 获取文章列表
export const getArticleList = (params) =>
  request.get('/my/article/list', { params })
//发布文章
export const addArticle = (data) => request.post('/my/article/add', data)
//删除文章
export const deleteArticle = (id) =>
  request.delete('/my/article/info', { params: { id } })
//获取文章详情
export const getArticleInfo = (id) =>
  request.get('/my/article/info', { params: { id } })
// 修改文章详情
export const artEditService = (data) => request.put('my/article/info', data)
