// 适配器 优化结构的实现方式

// 适配独立模块 保证模块间独立解耦连接兼容
class HKDevice{
    getPlug() {
        return '港行双圆柱插头'
    }
}
class Target {
    constructor() {
        this.plug = new HKDevice()
    }
    getPlug() {
        return this.plug.getPlug() + '港行双圆柱转换器'
    }
}
const target = new Target()
target.getPlug()