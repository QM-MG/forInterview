// 行为型 不同对象直接划分责任和算法抽象化
// 命令模式 对于游戏角色控制

// 接受者
class Receiver{
    execute() {
        console.log('角色奔跑')
    }
}
// 触发者
class Operator {
    constructor(command) {
        this.command = command
    }
    run() {
        this.command.execute()
    }
}
// 指令器
class Command {
    constructor(receiver) {
        this.receiver = this.receiver
    }
    execute() {
        this.receiver.execute
    }
}
const soldier = new Receiver()
const order = new Command(soldier)
const player = new Operator(order)
player.run()