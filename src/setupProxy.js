const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		// createProxyMiddleware('/api', {
		// 	target: 'http://10.1.10.13:30088',
		// 	pathRewrite: {
		// 		'^/api': ''
		// 	}
		// })
		createProxyMiddleware('/api', {
			target: 'http://10.10.103.81:8080/api/',
			pathRewrite: {
				'^/api': ''
			}
		}),
		createProxyMiddleware('/node', {
			target: 'http://10.10.103.81:8080/api/node/',
			pathRewrite: {
				'^/node': ''
			}
		}),
		createProxyMiddleware('/namespace', {
			target: 'http://10.10.103.81:8080/api/namespace/',
			pathRewrite: {
				'^/namespace': ''
			}
		}),
		createProxyMiddleware('/deployment', {
			target: 'http://10.10.103.81:8080/api/deployment/',
			pathRewrite: {
				'^/deployment': ''
			}
		}),
		createProxyMiddleware('/user', {
			target: 'http://10.10.103.81:8080/api/',
			pathRewrite: {
				'^/user': ''
			}
		}),
		createProxyMiddleware('/pod', {
			target: 'http://10.10.103.81:8080/api/pod/',
			pathRewrite: {
				'^/pod': ''
			}
		})
	);
};
