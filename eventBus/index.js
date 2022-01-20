// 订阅发布模式
class Bus {
    constructor () {
      this.callbacks = {}
    }
    // push
    $on(name,fn) {
      this.callbacks[name] = this.callbacks[name] || []
      this.callbacks[name].push(fn)
    }
    // 执行
    $emit(name,args) {
      if(this.callbacks[name]){
         //存在遍历所有callback
         this.callbacks[name].forEach(cb => cb(args))
      }
    }
	// 删除
	$off(name, fn) {
		if(this.callbacks[name]){
			this.callbacks[name].filter(cb => {
				return cb !== fn
			})
		}
		
	}
  }

const EventBus = new EventBusClass()
EventBus.on('fn1', function(msg) {
    alert(`订阅的消息是：${msg}`);
});
EventBus.emit('fn1', '你好，世界！');
