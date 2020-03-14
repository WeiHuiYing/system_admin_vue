import axios from '@/libs/api.request'
import store from '@/store'

var token = store.state.user.token;

//获取列表
export const getPage = (data) => {
  return axios.request({
    url: 'api/ResResource/GetPage',
    headers: {
      Authorization: "Bearer " + token
    },
    data: data,
    method: 'post'
  })
}

//获取列表
export const getList = (data) => {
  return axios.request({
    url: 'api/ResResource/GetList',
    headers: {
      Authorization: "Bearer " + token
    },
    data: data,
    method: 'post'
  })
}

//获取单个id
export const Get = (data) => {
  return axios.request({
    url: 'api/ResResource/Get',
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
    url: 'api/ResResource/Add',
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
    url: 'api/ResResource/Edit',
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
    url: 'api/ResResource/Delete/' + id,
    headers: {
      Authorization: "Bearer " + token
    },
    method: 'post'
  })
}
