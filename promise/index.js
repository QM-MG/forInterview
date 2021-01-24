require('@babel/register');
// promise 源码
class Promise {
    constructor(handleFunc) {
        this.status = 'pending';
        this.value = undefined;
        this.fulfilledList = [];
        this.rejectedList = [];
        handleFunc(this.triggerResolve.bind(this), this.triggerReject.bind(this));
    }
    // 当前的promise状态已经变成了resolve,要执行后续操作
    triggerResolve(val) { // triggerResolve: reslove
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
        this.fulfilledList.forEach(item => { // item: onFinalFulfilled
            item(val);
        })
        this.fulfilledList = [];
    }
    triggerReject() {
    }
    // promise 方法 onFulfilled 注册的回调函数 onNextFulfilled 新的回调函数
    then(onFulfilled, onRejected) {  //   promise.then(function(str){console.log(str); return str })
        return new Promise((onNextFulfilled, onNextRejected) => {
            // 实现链式调用 // val 为hello word
            function onFinalFulfilled(val) {
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
                    this.fulfilledList.push(onFinalFulfilled)
                    this.rejectedList.push(onRejected)
                    break;
                }
                case 'fulfilled':{
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
// const promise = new Promise(function(resolve,reject){
//     resolve('lsh')
//   })
//   promise
//   .then(function(str){console.log(str); return str })
//   .then(function(str2){console.log('resolve2',str2)})
  
// test promise

const promise = function(time) {
    return new Promise(function(resolve, reject) {
        return setTimeout(resolve, time)
    })
}
Promise.all([promise(1000), promise(2000)])
.then(function() {
    console.log('all')
})