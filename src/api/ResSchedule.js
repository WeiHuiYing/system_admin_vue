import axios from '@/libs/api.request'
import store from '@/store'

var token=store.state.user.token;
// 查询数据
export const GetPage = (data) => {
  return axios.request({
    url: 'api/Schedule/GetPage',
    headers: {Authorization:"Bearer "+token},
    data,
    method: 'post'
  })
}
// 添加任务
export const Add = (data) => {
    return axios.request({
      url: 'api/Schedule/Add',
      headers: {Authorization:"Bearer "+token},
      data,
      method: 'post'
    })
}

// 修改任务
export const Edit = (data) => {
    return axios.request({
      url: 'api/Schedule/Edit',
      headers: {Authorization:"Bearer "+token},
      data,
      method: 'post'
    })
}

// 执行任务
export const Excute=(id)=>{
    return axios.request({
      url: 'api/Schedule/Excute/'+id,
      headers: {Authorization:"Bearer "+token},
      method: 'post'
    })
}
// 停止任务
export const Stop=(id)=>{
    return axios.request({
      url: 'api/Schedule/Stop/'+id,
      headers: {Authorization:"Bearer "+token},
      method: 'post'
    })
}
// 恢复暂停任务
export const Resume=(id)=>{
    return axios.request({
      url: 'api/Schedule/Resume/'+id,
      headers: {Authorization:"Bearer "+token},
      method: 'post'
    })
}
//删除任务
export const Delete=(id)=>{
    return axios.request({
      url: 'api/Schedule/Delete/'+id,
      headers: {Authorization:"Bearer "+token},
      method: 'post'
    })
}