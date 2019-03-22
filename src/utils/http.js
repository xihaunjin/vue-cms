'use strict'

import axios from 'axios'
import { API_BASE_URL } from "../config.js"
// import loading from "./loading.js"
// 添加一个请求拦截器
axios.interceptors.request.use((config) => {
  //  loading.put()
  return config
})
// 添加一个响应拦截器
axios.interceptors.response.use((response) => {
  //  loading.pop()
  return response
})
const request = (method = 'GET') => (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      baseURL: API_BASE_URL,
      url: url,
      params: method === 'GET' ? data : {},
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 10000
    }).then((response) => {
      if (response.status === 200) {
        resolve(response.data)
      }
    }).catch((error) => {
      reject(error)
    })
  })
}

export default {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
}
