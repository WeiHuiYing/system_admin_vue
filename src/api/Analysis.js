import axios from '@/libs/api.request'
import store from '@/store'

var token = store.state.user.token;

// SingleSalesAnalysis 销售报表
export const getSales = (data) => {
  return axios.request({
    url: 'api/SingleSalesAnalysis/GetPage/',
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



// 类型列表 UsTagTypeInventory
// 获取列表
export const getUsInventoryList = (data) => {
  return axios.request({
    url: 'api/UsTagTypeInventory/GetPage',
    headers: {
      Authorization: "Bearer " + token
    },
    method: 'POST',
    data,
  })
}

// ECShipBatch 头层出库单

// 获取列表
export const getShipList = (data) => {
  return axios.request({
    url: 'api/ECShipBatch/getList',
    headers: {
      Authorization: "Bearer " + token
    },
    method: 'POST',
    data,
  })
}

// 添加头层入库单
export const addShip = (data) => {
  return axios.request({
    url: 'api/ECShipBatch/addShipBatch',
    headers: {
      Authorization: "Bearer " + token
    },
    method: 'POST',
    data,
  })
}
