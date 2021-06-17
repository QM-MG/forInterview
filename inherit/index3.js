// 原型链+借用构造函数的组合继承
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.setName = function() {

    }
}
Person.prototype.setAge = function() {

}
function Student(name, age, price) {
    Person.call(this,name,age)
    this.price = price;
}
Student.prototype = new Person();
Student.prototype.constructor = Student
Student.prototype.sayHello = function() {

}
var s1 = new Student('Tom', 20, 15000)
var s2 = new Student('Jack', 22, 14000)
var p1 = new Person('Jack', 22)
console.log(s1)
console.log(s1.constructor) //Student
console.log(p1.constructor) //Person

// 优点：

// 可以继承实例属性/方法，也可以继承原型属性/方法
// 不存在引用属性共享问题
// 可传参
// 函数可复用

// 缺点：

// 调用了两次父类构造函数，生成了两份实例