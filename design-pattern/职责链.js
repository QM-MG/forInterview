// 链式调用 职责独立 书序执行 - 提交表单
// 关注上一步和下一步的依赖关系

class Action {
    constructor(name) {
        this.name = name
        this.nextAction = null
    }
    setNextAction(action) {
        this.nextAction = action
    }
    handle() {
        console.log(`${this.name}请审批， 是否可以打游戏`)
        if (this.nextAction !== null) {
            this.nextAction.handle()
        }
    }
}
const dad = new Action('爸')
const mom = new Action('妈')
const wife = new Action('夫人')
dad.setNextAction(mom)
mom.setNextAction(wife)
dad.handle()
