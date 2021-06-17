class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    // 定义一般方法
    showName() {

    }
}
class Student extends Person{
    constructor(name, age, salary) {
        super(name, age)
        this.salary = salary
    }
    showName() {

    }
}
let s1 = new Student('wade', 38, 1000000000)
console.log(s1)
s1.showName()

// 优点：

// 语法简单易懂,操作更方便
// 缺点：

// 并不是所有的浏览器都支持class关键字