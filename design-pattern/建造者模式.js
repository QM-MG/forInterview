// 建造者
// 拆分模块 独立执行 注重过程与搭配
// 每个模块独立解耦 建造者负责创建串联整体系统

// 需求： 优惠套餐 商品+皮肤打折售卖

const pubg = new packageBuilder('pubg')
pubg.getPackage()

class Product {
    constructor(name) {
        this.name = name
    }
    init() {

    }
}
class Shop {
    constructor(name) {
        this.package = ''
    }
    create(name) {
        this.package = new packageBuilder(name)
    }
    get() {
        return this.package.getPackage()
    }
}
class Skin {
    constructor() {
        this.package = ''
    }
    create(name) {
        this.package = ''
    }
    get() {
        return this.package
    }
}

class packageBuilder {
    constructor(name) {
        this.game = new product(name)
        this.skin = new Skin(name)
    }
    getPackage() {
        // 商品和皮肤初始化
        return this.game.init() + this.skin.init()
    }

}

