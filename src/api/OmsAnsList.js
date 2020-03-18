import axios from '@/libs/api.request'
import store from '@/store'

var token = store.state.user.token;

// OmsAnsList
export const getList = (data) => {
  return axios.request({
    url: 'api/OmsAnsList/GetList',
    headers: {
      Authorization: "Bearer " + token,
    },
    method: 'POST',
    data,
  })
}


// 添加
export const Add = (codes) => {
  return axios.request({
    url: 'api/OmsAnsList/AddRecivingCode?codes=' + codes,
    headers: {
      Authorization: "Bearer " + token
    },
    method: 'POST',
  })
}

// 获取单个数据
export const getDetails = (id) => {
  return axios.request({
    url: 'api/OmsAnsList/GetDetails?id=' + id,
    headers: {
      Authorization: "Bearer " + token
    },
    method: 'POST',
  })
}
