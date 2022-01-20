// 手写 new 操作符实现
function myNew(fn, ...args) {
  let obj = Object.create(fn.prototype);
  let res = fn.call(obj, ...args);
  if (res && (typeof res === "object" || typeof res === "function")) {
    return res;
  }
  return obj;
}
// // function Person(name, age) {
// //   this.name = name;
// //   this.age = age;
// // }
// // Person.prototype.say = function() {
// //   console.log(this.age);
// // };
// // let p1 = myNew(Person, "lihua", 18);
// // console.log(p1.name);
// // console.log(p1);
// // p1.say();



//测试
const obj = { name: '写代码像蔡徐抻' }
function foo() {
    // console.log(this.name)
    // console.log(arguments)
}

Function.prototype.myCall = function(context, ...args) {
    const fn = Symbol('fn');
    context = context || window;
    context[fn] = this;  // 给context添加一个方法 指向this
	console.log(this)
	console.log(context)
    const result = context[fn](...args);
    delete context[fn];
    return result
}
foo.myCall(obj, 1);

Function.prototype.myApply = function(context) {
    // 如果没有传或传的值为空对象 context指向window
    if (typeof context === "undefined" || context === null) {
        context = window
    }
    let fn = mySymbol(context)
    context.fn = this //给context添加一个方法 指向this
        // 处理参数 去除第一个参数this 其它传入fn函数
    let arg = [...arguments].slice(1) //[...xxx]把类数组变成数组，arguments为啥不是数组自行搜索 slice返回一个新数组
    context.fn(arg) //执行fn
    delete context.fn //删除方法
}

Function.prototype.myBind = function(context) {
    //返回一个绑定this的函数，我们需要在此保存this
    let self = this
        // 可以支持柯里化传参，保存参数
    let arg = [...arguments].slice(1)
    console.log(arg)
        // 返回一个函数
    return function() {
        //同样因为支持柯里化形式传参我们需要再次获取存储参数
        let newArg = [...arguments]
            // 返回函数绑定this，传入两次保存的参数
            //考虑返回函数有返回值做了return
        return self.apply(context, arg.concat(newArg))
    }
}

// foo.myBind(obj, 'a', 'b', 'c')() 

