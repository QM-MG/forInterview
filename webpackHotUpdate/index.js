// 一、热更新原理
// 服务端：
// 1.启动webpack-dev-server服务器
// 2.创建webpack实例
// 3.创建Server服务器
// 4.添加webpack的done事件回调 编译完成向客户端发送消息（hash和描述文件oldhash.js和oldhash.json）
// 5.创建express应用app
// 6.设置文件系统为内存文件系统
// 7.添加webpack-dev-middleware中间件 负责返回生成的文件
// 8.创建http服务 启动
// 9.使用socket 实现浏览器和服务器的通信（这里先发送一次hash，将socket存入到第四步，初次编译完第四步中的socket是空，不会触发hash下发）

// 客户端：
// 1.webpack-dev-server/client-src下文件监听hash，保存此hash值
// 2.客户端收到ok消息执行reload更新
// 3.在reload中进行判断，如果支持热更新执行webpackHotUpdate，不支持的话直接刷新页面
// 4.在webpack/hot/dev-server.js监听webpackHotUpdate 然后执行 check() 方法进行检测
// 5.在check方法里面调用module.hot.check
// 6.通过调用 JsonpMainTemplate.runtime的hotDownloadmainfest方法，向server端发送ajax请求，服务端返回一个Mainfest文件，该文件包含所有要更新模块的hash值和chunk名

// 7.调用 JsonpMainTemplate.runtime 的 hotDownloadUpdateChunk方法通过jsonp请求获取到最新的模块代码
// 8.补丁js取回后调用 JsonpMainTemplate.runtime 的 webpackHotUpdate方法，里面会调用hotAddUpdateChunk方法，用心的模块替换掉旧的模块
// 9.调用HotMoudleReplacement.runtime.js 的 hotAddUpdateChunk方法动态更新模块代码
// 10.调用 hotApply 方法热更新

// 客户端代码辅助流程理解：

// 客户端这里初次加载 先走 socket.on("hash")和socket.on("ok") 拿到服务端首次生成的hash值
// 然后执行 reloadApp 这个函数 这里派发 hotEmitter.emit('webpackHotUpdate') 事件
// 然后执行 hotEmitter.on('webpackHotUpdate') 这个函数，
// 因为是初次编译 所以 hotCurrentHash 为 undefined 然后将首次拿到的 currentHash 赋值给 hotCurrentHash
// 到这里 初次加载的逻辑执行完毕
// -------------------next--------------------
// 假如用户修改了某个模块的代码，将会再次执行 socket.on("hash")和socket.on("ok") 拿到最新的代码编译后的hash
// 如上述步骤进入 hotEmitter.on('webpackHotUpdate') 中的事件判断， if(!hotCurrentHash || hotCurrentHash == currentHash) hotCurrentHash为上次的hash值 currentHash为最新收到的 并且判断两次是否一致，一致则不需要更新，不一致就执行热更新逻辑
// hotCheck 会通过ajax请求服务端拉取最新的 hot-update.json 描述文件 说明哪些模块哪些chunk（大集合）发生了更新改变
// 然后根据描述文件 hotDownloadUpdateChunk 去创建jsonp拉取到最新的更新后的代码,返回形式为： webpackHotUpdate(id, {...})
// 为了拉取到的代码直接执行，客户端需要定义一个 window.webpackHotUpdate 函数来处理
// 这里面将缓存的旧代码更新为最新的代码，接着将父模块中的render函数执行一下
// 最后将 hotCurrentHash = currentHash 置旧hash方便下次比较


// 二、客户端代码实现如下：

//发布订阅
class Emitter{
	constructor(){
		this.listeners = {}
	}
	on(type, listener){
		this.listeners[type] = listener
	}
	emit(){
		this.listeners[type] && this.listeners[type]()
	}
}
let socket = io('/');
let hotEmitter = new Emitter();
const onConnected = () => {
	console.log('客户端连接成功')
}
//存放服务端传给的hash 本次的hash 和 上一次的hash
let currentHash, hotCurrentHash;
socket.on("hash",(hash)=>{
	currentHash = hash
});

//收到ok事件之后
socket.on('ok',()=>{
	//true代表热更新
	reloadApp(true);
})
hotEmitter.on('webpackHotUpdate',()=>{
	if(!hotCurrentHash || hotCurrentHash == currentHash){
		return hotCurrentHash = currentHash
	} 
	hotCheck()
})

function hotCheck(){
	hotDownloadMainfest().then((update)=>{
		let chunkIds = Object.keys(update.c)
		chunkIds.forEach(chunkId=>{
			hotDownloadUpdateChunk(chunkId);
		})
	})
}
function hotDownloadUpdateChunk(chunkId){
	let script = document.createElement('script');
	script.charset = 'utd-8'
	script.src = '/'+chunkId+'.'+hotCurrentHash+'.hot-update.js'
	document.head.appendChild(script);
}
//此方法用来询问服务器到底这一次编译相对于上一次编译改变了哪些chunk、哪些模块
function hotDownloadMainfest(){
	return new Promise(function(resolve){
		let request = new XMLHttpRequest()
		let requestPath = '/'+hotCurrentHash+".hot-update.json"
		request.open('GET', requestPath, true)
		request.onreadystatechange = function(){
			if(request.readyState === 4){
				let update = JSON.parse(request.responseText)
				resolve(update)
			}
		}
		request.send()
	})
}

function reloadApp(hot){
	if(hot){
		//发布
		hotEmitter.emit('webpackHotUpdate')
	}else{
		//不支持热更新直接刷新
		window.location.reload()
	}
}

window.hotCreateModule = function(){
	let hot = {
		_acceptedDependencies:{},
		accept: function(deps, callback){
			//callback 对应render回调
			for(let i = 0; i < deps.length; i++){
				hot._acceptedDependencies[deps[i]] = callback
			}
			
		}
	}
	return hot
}

//通过jsonp获取的最新代码   jsonp中有webpackHotUpdate这个函数
window.webpackHotUpdate = function(chunkId, moreModules){
	for(let moduleId in moreModules){
		//从模块缓存中取到老的模块定义
		let oldModule - __webpack_requrie__.c[moduleId]
		let {parents, children} = oldModule
		//parents哪些模块引用和这个模块  children这个模块用了哪些模块
		//更新缓存为最新代码
		let module = __webpack_requrie__.c[moduleId] = {
			i: moduleId,
			l: false,
			exports: {},
			parents,
			children,
			hot: window.hotCreateModule(moduleId)
		}
		moreModules[moduleId].call(module.exports, module, module.exports, __webpack_requrie__)
		module.l = true
		//index.js ---import a.js import b.js  a.js和b.js的父模块（index.js）   
		parents.forEach(par=>{
			//父中的老模块的对象
			let parModule = __webpack_requrie__.c[par]
			parModule && parModule.hot && parModule.hot._acceptedDependencies[moduleId] && parModule.hot._acceptedDependencies[moduleId]()
		})
		//热更新之后 本次的hash变为上一次的hash  置旧操作
		hotCurrentHash = currentHash
	}
}


socket.on("connect", onConnected);


// 服务端代码实现：

const path = require('path');
const express = require('express');
const mime = require('mime');
const webpack = require('webpack');
const MemoryFileSystem = require('memory-fs');
const config = require('./webpack.config');
//compiler代表整个webpack编译任务，全局只有一个
const compiler = webpack(config);
class Server{
  constructor(compiler){
      this.compiler = compiler;
      let sockets = [];
      let lasthash;//每次编译完成后都会产生一个stats对象，其中有一个hash值代表这一次编译结果hash就是一个32的字符串
      compiler.hooks.done.tap('webpack-dev-server',(stats)=>{
          lasthash = stats.hash;
          //每当新一个编译完成后都会向客户端发送消息
          sockets.forEach(socket=>{
              //先向客户端发送最新的hash值
              //每次编译都会产生一个hash值，另外如果是热更新的话，还会产出二个补丁文件。
              //里面描述了从上一次结果到这一次结果都有哪些chunk和模块发生了变化 
              socket.emit('hash',stats.hash);
              //再向客户端发送一个ok
              socket.emit('ok');
          });
      });
      let app = new express();
      //以监控的模块启动一次webpack编译，当编译成功之后执行回调
      compiler.watch({},err=>{
          console.log('又一次编译任务成功完成了')
      });
      let fs = new MemoryFileSystem();
      //如果你把compiler的输出文件系统改成了 MemoryFileSystem的话，则以后再产出文件都打包内存里去了
      compiler.outputFileSystem = fs;
      function middleware(req, res, next) {
          // /index.html   dist/index.html
          let filename = path.join(config.output.path,req.url.slice(1));
          let stat = fs.statSync(filename);
          if(stat.isFile()){//判断是否存在这个文件,如果在的话直接把这个读出来发给浏览器
            let content = fs.readFileSync(filename);
            let contentType = mime.getType(filename);
            res.setHeader('Content-Type',contentType);
            res.statusCode = res.statusCode || 200;
            res.send(content);
          }else{
             // next();
            return  res.senStatus(404);
          }
      }
      //express app  其实是一个请求监听函数
      app.use(middleware);
      this.server = require('http').createServer(app);
      let io = require('socket.io')(this.server);
      //启动一个 websocket服务器，然后等待连接来到，连接到来之后socket
      io.on('connection',(socket)=>{
        sockets.push(socket);
        socket.emit('hash',lasthash);
        //再向客户端发送一个ok
        socket.emit('ok');
      });
  }
  listen(port){
    this.server.listen(port,()=>{
        console.log(`服务器已经在${port}端口上启动了`)
    });
  }
}
let server = new Server(compiler);
server.listen(8000);