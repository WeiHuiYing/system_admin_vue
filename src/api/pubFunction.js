import axios from '@/libs/api.request'
import store from '@/store'

var token=store.state.user.token;


// 获取资源权限
export const getList = (id) => {
  return axios.request({
    url: 'api/Permission/GetList/'+id,
    headers: {Authorization:"Bearer "+token},
    method: 'get'
  })
}

//添加
export const Add=(data)=>{
  return axios.request({
    url: 'api/Permission/Add',
    headers: {Authorization:"Bearer "+token},
    data,
    method: 'post'
  })
}

//修改
export const Edit=(data)=>{
  return axios.request({
    url: 'api/Permission/Edit',
    headers: {Authorization:"Bearer "+token},
    data,
    method: 'post'
  })
}

//删除
export const Delete=(id)=>{
  return axios.request({
    url: 'api/Permission/Delete/'+id,
    headers: {Authorization:"Bearer "+token},
    method: 'post'
  })
}