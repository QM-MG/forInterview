// 在模板中定义好每个方法的执行步骤 方法本身关注与自己的事情

// 吃鸡分几步

class Device {
    constructor() {

    }
    powerOn() {
        console.log('打开电源')
    }
    login() {
        console.log('登录')
    }
    clickIcon() {
        console.log('开始游戏')
    }
    enterGame() {

    }
    play() {
        this.powerOn()
        this.login()
        this.clickIcon()
        this.enterGame()
    }
}