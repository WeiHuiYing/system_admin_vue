import axios from '@/libs/api.request'
import store from '@/store'

var token = store.state.user.token;

// 列表
export const getList = (data) => {
  return axios.request({
    url: 'api/ECWarehouse/GetList/',
    headers: {
      Authorization: "Bearer " + token
    },
    method: 'POST',
    data,
  })
}

// 详情
export const Get = (data) => {
  return axios.request({
    url: 'api/ECWarehouse/Get/',
    headers: {
      Authorization: "Bearer " + token
    },
    method: 'POST',
    data,
  })
}
