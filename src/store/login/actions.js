import http from '../../utils/http.js'

/*
 * @DESC:api接口
 */
const ADMIN_LOGIN = '/api/admin/login'
const SEND_CODE = '/api/admin/code'

export default {
	login: ({ //登录
		commit,
		dispatch,
		state,
		getters
	}, params = {}) => {
		return new Promise((resolve, reject) => {
			http.post(ADMIN_LOGIN, params)
				.then((res = null) => {
					resolve(res);
				}, (err) => {
					reject(err.message)
				})
		})
	},
	sendCode: ({ //发送登录验证码
		commit,
		dispatch,
		state,
		getters
	}, params = {}) => {
		return new Promise((resolve, reject) => {
			http.post(SEND_CODE, params)
				.then((res = null) => {
					resolve(res);
				}, (err) => {
					reject(err.message)
				})
		})
	}
}