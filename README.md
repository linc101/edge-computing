# 安装依赖
$ npm install

# 启动程序
$ npm run start

# node版本
v12.18.0

# npm版本
6.14.4

### 该程序是观云台的微前端方案--主应用

[@ice/stark 微前端解决方案](https://ice.work/docs/icestark/about)
- 子应用支持 React/Vue/Angular... 等不同框架
- 框架应用只需依赖 npm 包 @ice/stark，不耦合任何工程体系
- 子应用独立开发、不耦合任何工程体系，已有应用迁移成本极低
- 整个系统用户体验好，跟 SPA 应用基本一致
- 子应用只需发布前端资源 bundle 即可，框架应用通过 bundle 渲染子应用

```
# 启动程序
$ yarn start

# 单元测试
$ yarn test

# 生产部署
$ yarn build

#子应用配置文件（frontend.modules.json）

#代理配置文件（setupProxy.js），主要负责解决主应用请求时的跨域问题
# 1. 自身的后端请求
# 2. 请求观云台的HTML页面
```

```
文件目录结构
	-- node_modules
	-- public
	  |-- frontend.modules.json
	-- src
	  |-- assets
	  |-- common
	  |-- components
	  |-- layout
	    |-- Menu
		|-- Navbar
		|-- SubApp
	  |-- pages
	    |-- Login
		|-- NotFound
	  |-- services
	  |-- redux
	  |-- index.css
	  |-- index.js
	  |-- serviceWorker.js
	  |-- setupProxy.js
	  |-- setupTests.js
	  |-- api.json
	-- .gitignore
	-- package.json
	-- README.md
	-- yarn.lock
	-- .env
	-- .editorconfig
	-- .eslintignore
	-- .eslintrc.json
	-- .prettierrc.json
	-- config-overrides.js
```
