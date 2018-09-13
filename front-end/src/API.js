import axios from 'axios';

function sendAPI(controller, action, data) {
    return new Promise(cb => {
        const url = `${window.location.protocol}//${window.location.hostname}:8081/${controller}/${action}`;
        axios.post(url, JSON.stringify(data), {withCredentials: true}).then(
            response => cb(response.data),
            err => err.response ? cb(err.response.data) : cb({success: false, code: 0, msg: err.message})
        );
    });
}

const API = new Proxy({}, {
    get(obj, controller) {
        return new Proxy({}, {
            get(obj, action) {
                return data => sendAPI(controller, action, data);
            }
        });
    }
});

export default API;