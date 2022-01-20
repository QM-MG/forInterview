// 1、实现一个监听器 Observer：对数据对象进行遍历，包括子属性对象的属性，利用 Object.defineProperty() 对属性都加上 setter 和 getter。
// 这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。

// 2、实现一个解析器 Compile：解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，
// 并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。

// 3、实现一个订阅者 Watcher：Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁 ，
// 主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。

// 4、实现一个订阅器 Dep：订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对监听器 Observer 和 订阅者 Watcher 进行统一管理。
function SelfVue (options) {
    var self = this;
    this.data = options.data;
    this.methods = options.methods;

    Object.keys(this.data).forEach(function(key) {
        self.proxyKeys(key);
    });

    observe(this.data);
    new Compile(options.el, this);
    options.mounted.call(this); // 所有事情处理好后执行mounted函数
}
// 可以通过this.xxx 来更改 this.$data.xxx 的结果
SelfVue.prototype = {
    proxyKeys: function (key) {
        var self = this;
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get: function getter () {
                return self.data[key]; // 取值从data里取
            },
            set: function setter (newVal) {
<<<<<<< HEAD
                self.data[key] = newVal; // 改时将data里的值改掉
=======
                self.data[key] = newVal; 
>>>>>>> 828043749074185616971c1d060581637f90b01d
            }
        });
    }
}
