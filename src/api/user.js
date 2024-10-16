import request from '@/utils/request'
// 注册接口
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })
// 用户登录接口
export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })
// 通过token获取用户信息
export const userGetInfoService = () => request.get('/my/userinfo')
// 更新用户基本资料
export const userUpdateInfoService = (data) => request.put('/my/userinfo', data)
// 更新用户头像
export const userUpdateAvaService = (avatar) =>
  request.patch('/my/update/avatar', { avatar })
// 更新用户密码
export const userUpdatePassService = ({ old_pwd, new_pwd, re_pwd }) =>
  request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
