import axios from 'axios'

function sendAPI (controller, action, data = {}) {
	return new Promise(resolve => {
		const url = `${window.location.protocol}//${window.location.hostname}:8081/${controller}/${action}`;
		axios.post(url, JSON.stringify(data), { withCredentials: true }).then(
			response => resolve(response.data),
			err => err.response ? resolve(err.response.data) : resolve({ success: false, code: 0, msg: err.message })
		);
	});
}

function makeWS (controller, action, data, resolve) {
	const url = `${window.location.protocol.replace('http', 'ws')}//${window.location.hostname}:8081/ws`;
	var socket = new WebSocket(url);
	function send (msg) { socket.send(JSON.stringify(msg)); }
	socket.onopen = () => {
		resolve({ success: true, msg: 'connected' });
		setTimeout(() => send({ controller, action, data }), 10);
	};
	socket.onclose = e => !e.wasClean && resolve({ success: false, msg: e });
	socket.onmessage = e => resolve(JSON.parse(e.data));
	socket.onerror = err => resolve({ success: false, msg: err.message });
}

const API = new Proxy({}, {
	get (obj, controller) {
		return new Proxy({}, {
			get (obj, action) {
				return action.startsWith('ws')
					? (data, cb) => makeWS(controller, action, data, cb)
					: data => sendAPI(controller, action, data);
			}
		});
	}
});

window.API = API;

export default API
