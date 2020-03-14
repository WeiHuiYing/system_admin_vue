import axios from '@/libs/api.request'
import store from '@/store'

var token = store.state.user.token;

export const getList = (data) => {
  return axios.request({
    url: 'api/ResDept/GetList',
    headers: {
      Authorization: "Bearer " + token
    },
    data: data,
    method: 'post'
  })
}

//获取子部门
export const getChildList = (id) => {
  return axios.request({
    url: 'api/ResDept/GetChildList/' + id,
    headers: {
      Authorization: "Bearer " + token
    },
    method: 'post'
  })
}

//添加
export const Add = (model) => {
  const data = model;
  return axios.request({
    url: 'api/ResDept/Add',
    headers: {
      Authorization: "Bearer " + token
    },
    data,
    method: 'post'
  })
}

//修改
export const Edit = (model) => {
  const data = model;
  return axios.request({
    url: 'api/ResDept/Edit',
    headers: {
      Authorization: "Bearer " + token
    },
    data,
    method: 'post'
  })
}

//删除
export const Delete = (id) => {
  return axios.request({
    url: 'api/ResDept/Delete/' + id,
    headers: {
      Authorization: "Bearer " + token
    },
    method: 'post'
  })
}

//获取详情
export const Get = (data) => {
  return axios.request({
    url: 'api/ResDept/Get',
    headers: {
      Authorization: "Bearer " + token
    },
    data,
    method: 'post'
  })
}
