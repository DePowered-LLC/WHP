import axios from 'axios'

function sendAPI (controller, action, data = {}) {
	return new Promise(resolve => {
		const url = `${window.location.protocol}//${window.location.hostname}:8081/${controller}/${action}`
		axios.post(url, JSON.stringify(data), { withCredentials: true }).then(
			response => resolve(response.data),
			err => err.response ? resolve(err.response.data) : resolve({ success: false, code: 0, msg: err.message })
		)
	})
}

const API = new Proxy({}, {
	get (obj, controller) {
		return new Proxy({}, {
			get (obj, action) {
				return data => sendAPI(controller, action, data)
			}
		})
	}
})

export default API
