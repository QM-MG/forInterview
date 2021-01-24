Function.prototype.my_bind = function() {
    var self = this, // 保存原函数
      context = Array.prototype.shift.call(arguments), // 保存需要绑定的this上下文
      // 上一行等价于 context = [].shift.call(arguments);
      args = Array.prototype.slice.call(arguments); // 剩余的参数转为数组
      console.log(context, args)
    return function() { // 返回一个新函数
      self.apply(context, Array.prototype.concat.call(args, Array.prototype.slice.call(arguments)));
    }
  }

function a(m, n, o) {
  console.log(this.name + ' ' + m + ' ' + n + ' ' + o);
}

var b = {
  name: 'kong'
};

const array1 = [1, 2, 3];

console.log(array1.shift());
a.my_bind(b, 7, 8)(9); // kong 7 8 9