import axios from '@/libs/api.request'
import store from '@/store'
var token = store.state.user.token;


//获取列表
export const getList = (data) => {
  return axios.request({
    url: 'api/User/GetPage',
    headers: {
      Authorization: "Bearer " + token
    },
    data,
    method: 'post'
  })

}
//获取详情
export const Get = (data) => {
  return axios.request({
    url: '/api/User/Get',
    headers: {
      Authorization: "Bearer " + token
    },
    data,
    method: 'post'
  })

}



//添加用户 
export const Add = (data) => {
  return axios.request({
    url: 'api/User/Add',
    headers: {
      Authorization: "Bearer " + token
    },
    data,
    method: 'post'
  })

}
//编辑用户 
export const Edit = (data) => {
  return axios.request({
    url: 'api/User/Edit',
    headers: {
      Authorization: "Bearer " + token
    },
    data,
    method: 'post'
  })

}
//删除用户 
export const Delete = (id) => {
  return axios.request({
    url: 'api/User/Delete/' + id,
    headers: {
      Authorization: "Bearer " + token
    },
    method: 'post'
  })

}

//用户权限列表
export const getPermissions = (id) => {
  return axios.request({
    url: 'api/User/GetUserPermissions?userId=' + id,
    headers: {
      Authorization: "Bearer " + token
    },
    method: 'post'
  })
}

// 用户权限保存
