import request from '@/utils/request'
// 注册接口
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })
// 用户登录接口
export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })
// 通过token获取用户信息
export const userGetInfoService = () => request.get('/my/userinfo')
