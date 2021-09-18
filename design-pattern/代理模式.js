
// 使用代理人来代替原始对象

class Game{
    play() {
        return 'playing'
    }
}
class Player {
    constructor(age) {
        this.age = age
    }
}

class GameProxy {
    constructor(player) {
        this.player = player
    }
    play() {
        return this.player.age < 16 ? false:new Game().play()
    }
}
const player = new Player(18)
const game = new GameProxy(player)
game.play()