import http from '../../utils/http.js'

/*
 * @DESC:api接口
 */
const GET_STAFF_LIST = '/api/staff/list'
const POST_STAFF_SAVE = '/api/staff/save'
const POST_STAFF_DELETE = '/api/staff/delete'
const GET_STAFF_INFO = '/api/staff/info'
const POST_STAFF_UPDATE = '/api/staff/update'
export default {
  // 获取员工列表
  getStaffList: ({
    commit,
    dispatch,
    state,
    getters
  }, params = {}) => {
    return new Promise((resolve, reject) => {
      http.get(GET_STAFF_LIST, params)
        .then((res = null) => {
          commit('GET_STAFF_LIST', res)
          resolve()
        }, (err) => {
          reject(err.message)
        })
    })
  },
  // 保存用户信息
  saveStaffInfo: ({
    commit,
    dispatch,
    state,
    getters
  }, params = {}) => {
    return new Promise((resolve, reject) => {
      http.post(POST_STAFF_SAVE, params)
        .then((res = null) => {
          resolve(true)
        }, (err) => {
          reject(err.message)
        })
    })
  },

  // 更新用户信息
  updateStaffInfo: ({
    commit,
    dispatch,
    state,
    getters
  }, params = {}) => {
    return new Promise((resolve, reject) => {
      http.post(POST_STAFF_UPDATE, params)
        .then((res = null) => {
          resolve(true)
        }, (err) => {
          reject(err.message)
        })
    })
  },

  // 删除员工
  deleteStaff: ({
    commit,
    dispatch,
    state,
    getters
  }, params) => {
    return new Promise((resolve, reject) => {
      http.delete(POST_STAFF_DELETE + '/' + params)
        .then((res = null) => {
          resolve(true)
        }, (err) => {
          reject(err.message)
        })
    })
  },
  // 获取单个员工信息
  getStaffInfo: ({
    commit,
    dispatch,
    state,
    getters
  }, id) => {
    return new Promise((resolve, reject) => {
      http.get(GET_STAFF_INFO + '/' + id)
        .then((res = null) => {
          resolve(res)
        }, (err) => {
          reject(err.message)
        })
    })
  }
}