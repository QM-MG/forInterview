// 装饰器模式
// 动态将责任附加到对象上

class Device {
    create() {

    }
}
class Phone {
    create() {

    }
}
class Decorator {
    constructor(device) {
        this.device = device
    }
    create() {
        this.device.create()
        this.update(this.device)
    }
    // 升级
    update(device) {
        console.log(device + 'pro')
    }
}
const device = new Device()
device.create()
const neDevice = new Decorator(device)
newDevice.create()