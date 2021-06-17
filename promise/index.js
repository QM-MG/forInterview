https://zhuanlan.zhihu.com/p/58428287

// 调用 then 方法，将想要在 Promise 异步操作成功时执行的 onFulfilled 放入callbacks队列，
// 其实也就是注册回调函数，可以向观察者模式方向思考；
// 创建 Promise 实例时传入的函数会被赋予一个函数类型的参数，
// 即 resolve，它接收一个参数 value，代表异步操作返回的结果，当异步操作执行成功后，
// 会调用resolve方法，这时候其实真正执行的操作是将 callbacks 队列中的回调一一执行；


require('@babel/register');
// promise 源码
class Promise {
    constructor(handleFunc) {
        console.log(1)
        this.status = 'pending';
        this.value = undefined;
        this.fulfilledList = [];
        this.rejectedList = [];
        handleFunc(this.triggerResolve.bind(this), this.triggerReject.bind(this));
    }
    // 当前的promise状态已经变成了resolve,要执行后续操作
    triggerResolve(val) { // triggerResolve: reslove
        console.log(2)
        // 注册then里的代码 才知道回调什么
        setTimeout(() => {
            if (this.status !== 'pending') {
                return;
            }
            if (val instanceof Promise) {
                val.then(
                    value = {},
                    err = {}  
                )
            }
            // resolve 传入的是普通值
            else { 
                this.status = 'fulfilled';
                this.value = val; // hello world
                this.triggeFulfilled(val);
            }
        }, 0)
    }
    // 依次执行回调
    triggeFulfilled(val) { // hello world
        console.log(3)
        this.fulfilledList.forEach(item => { // item: onFinalFulfilled
            item(val);
        })
        this.fulfilledList = [];
    }
    triggerReject() {
    }
    // promise 方法 onFulfilled 注册的回调函数 onNextFulfilled 新的回调函数
    then(onFulfilled, onRejected) {  //   promise.then(function(str){console.log(str); return str })
        console.log(4)
        return new Promise((onNextFulfilled, onNextRejected) => {
            // 实现链式调用 // val 为hello word
            function onFinalFulfilled(val) {
                console.log(5)
                if (typeof onFulfilled !== 'function') {
                    onNextFulfilled(val)
                }
                else {
                    // 执行的结果
                    const res = onFulfilled(val)
                    if (res instanceof Promise) {
                        res.then(onNextFulfilled, onNextRejected)
                    }
                    else {
                        onNextFulfilled(res)
                    }
                }
            }
            switch(status) {
                case 'pending': {
                    console.log(6)
                    this.fulfilledList.push(onFinalFulfilled)
                    this.rejectedList.push(onRejected)
                    break;
                }
                case 'fulfilled':{
                    console.log(7)
                    onFinalFulfilled(value)
                    break;
                  }
            }
        })

    }
    catch(onRejected){
        return this.then(null, onRejected)
    }
    // promise 实例上的方法
    static resolve(value) { // value promoise
        console.log(8)
        if (value instanceof Promise) {
            return value;
        }
        return new Promise(resolve => resolve(value))
    }
    static reject() {

    }
    static all(list) {
        return new Promise((resolve, reject) => {
            let count = 0;
            const values = []
            for (const [i, promiseInstance] of list.entries()) { // index Promise
                console.log(i, promiseInstance)
                Promise.resolve(promiseInstance)
                .then(res => {
                    values[i] = res
                    count++
                    if (count === list.length)  {
                        resolve(values)
                    }
                }, err => {
                    reject(err)
                })
            }
        })

    }
    static race() {

    }

}
const promise = new Promise(function(resolve,reject){
    resolve('lsh')
  })
  promise
  .then(function(str){console.log(str); return str })
  .then(function(str2){console.log('resolve2',str2)})
  
// test promise

// const promise = function(time) {
//     return new Promise(function(resolve, reject) {
//         return setTimeout(resolve, time)
//     })
// }
// Promise.all([promise(1000), promise(2000)])
// .then(function() {
//     console.log('all')
// })