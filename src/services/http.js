import axios from 'axios';
import qs from 'qs';
import { getStorage } from '../utils/storage';

axios.interceptors.request.use((config) => {
	if (!config.headers) {
		config.headers = {};
	}
	config.headers.Authorization = `Bearer ${getStorage('token')}`;
	return config;
});

async function get(url, params = {}, method = 'GET') {
	return await axios({
		method,
		url,
		params
	});
}

async function post(url, data = {}, method = 'POST') {
	return await axios({
		method,
		url,
		headers: { 'content-type': 'application/json;charset=UTF-8' },
		data: JSON.stringify(data)
	});
}

async function json(url, data, method = 'POST') {
	return await axios(url, {
		method: method,
		data: qs.stringify(data),
		headers: {
			'Content-Type': 'application/json;charset=UTF-8'
		}
	});
}

async function upload() {}

function put(url, data = {}) {
	return post(url, data, 'PUT');
}
function remove(url, params) {
	return get(url, params, 'DELETE');
}

const restfulAPI = function (url, formData) {
	if (!url) throw new Error('url不能为空');
	if (!formData) return url;
	let restfulArray = url.split('/');
	const result = restfulArray.map((item) => {
		if (item.indexOf('{') !== -1) {
			const key = item.substring(1, item.length - 1);
			return formData[key] || '';
		}
		return item;
	});
	return result.join('/');
};

const http = {
	get,
	post,
	put,
	remove,
	json,
	upload,
	restfulAPI
};

export default http;
