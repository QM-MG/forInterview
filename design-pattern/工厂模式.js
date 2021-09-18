// 工厂模式
// 需求：在游戏里商店下载初始化游戏，并且运行游戏
class Shop {
    create(name) {
        return new Game(name)
    }
}

class Game {
    constructor(name) {
        this.name = name
    }
    init() {

    }
    run () {

    }
}
const show = new Shop()
const pubg = new Game('pubg')
pubg.init()
pubg.run()