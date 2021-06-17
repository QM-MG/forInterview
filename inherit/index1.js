// 原型链继承
function Person (name, age) {
    this.name = name;
    this.age = age;
    this.play = [1,2,3];
}
function Student (price) {
    this.price = price;
    this.setSource = function () {

    }
}
Student.prototype = new Person();
var s1 = new Student(100);
var s2 = new Student(200);
s1.play.push(4)
console.log(s1.play, s2.play)
// 优点
// 父类新增原型方法/原型属性，子类都能访问到
// 简单，易于实现

// 缺点
// 无法实现多继承
// 来自原型对象的所有属性被所有实例共享
// 创建子类实例时，无法向父类构造函数传参
// 要想为子类新增属性和方法，必须要在Student.prototype = new Person() 之后执行，不能放到构造器中