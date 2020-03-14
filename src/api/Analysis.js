import axios from '@/libs/api.request'
import store from '@/store'

var token = store.state.user.token;

// SingleSalesAnalysis
export const getList = (data) => {
  return axios.request({
    url: 'api/SingleSalesAnalysis/GetList/',
    headers: {
      Authorization: "Bearer " + token
    },
    method: 'POST',
    data,
  })
}
