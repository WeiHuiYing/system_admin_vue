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
export const Add = (data) => {
  return axios.request({
    url: 'api/OmsAnsList/AddRecivingCode',
    headers: {
      Authorization: "Bearer " + token
    },
    method: 'POST',
    data
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
