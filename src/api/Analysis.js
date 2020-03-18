import axios from '@/libs/api.request'
import store from '@/store'

var token = store.state.user.token;

// SingleSalesAnalysis 销售报表
export const getSales = (data) => {
  return axios.request({
    url: 'api/SingleSalesAnalysis/GetList/',
    headers: {
      Authorization: "Bearer " + token,
    },
    method: 'POST',
    data,
  })
}

//BnsUsBaseInventory 美国仓仓底维护

// 获取列表
export const getUsBase = (data) => {
  return axios.request({
    url: 'api/BnsUsBaseInventory/GetList/',
    headers: {
      Authorization: "Bearer " + token
    },
    method: 'POST',
    data,
  })
}

// 获取单个数据
export const getUsBaseInfo = (data) => {
  return axios.request({
    url: 'api/BnsUsBaseInventory/Get',
    headers: {
      Authorization: "Bearer " + token
    },
    method: 'POST',
    data,
  })
}
