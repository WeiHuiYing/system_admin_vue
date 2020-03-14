import axios from '@/libs/api.request'
import store from '@/store'

var token = store.state.user.token;

//获取所有角色
export const getList = (data) => {
  return axios.request({
    url: 'api/ResRole/GetList',
    headers: {
      Authorization: "Bearer " + token
    },
    data,
    method: 'post'
  })
}

//分页
export const getPage = (data) => {
  return axios.request({
    url: 'api/ResRole/GetPage',
    headers: {
      Authorization: "Bearer " + token
    },
    data,
    method: 'post'
  })

}

//添加
export const Add = (data) => {
  return axios.request({
    url: 'api/ResRole/Add',
    headers: {
      Authorization: "Bearer " + token
    },
    data,
    method: 'post'
  })
}

//修改
export const Edit = (data) => {
  return axios.request({
    url: 'api/ResRole/Edit',
    headers: {
      Authorization: "Bearer " + token
    },
    data,
    method: 'post'
  })
}

//停用
export const Delete = (id) => {
  return axios.request({
    url: 'api/ResRole/Delete/' + id,
    headers: {
      Authorization: "Bearer " + token
    },
    method: 'post'
  })
}

//角色权限列表
export const getFunctions = (id) => {
  return axios.request({
    url: 'api/ResRole/GetPermissions/' + id,
    headers: {
      Authorization: "Bearer " + token
    },
    method: 'post'
  })
}

//保存权限
export const saveFunctions = (id, data) => {
  return axios.request({
    url: 'api/ResRole/SaveFunctions/' + id,
    data,
    headers: {
      Authorization: "Bearer " + token
    },
    method: 'post'
  })
}
