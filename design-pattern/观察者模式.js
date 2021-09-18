// 当一个属性发生变化 观察者会连续引发所有相关改变

class MediaCenter{
    constructor() {
        this.state = ''
        this.observers = []
    }
    attache(observer) {
        this.observers.push(observer)
    }
    setState(state) {
        this.state = state
        this.notifyAllObservers()
    }
    notifyAllObservers() {
        this.observers.forEach(item => {
            item.update()
        })
    }
}
class Observer {
    constructor(name, center) {
        this.name = name
        this.center = center
        this.center.attach(this)
    }
    update() {
        console.log(`${this.name}update,state:${this.center.getState}`)
    }
}
const center = new MediaCenter()
const ps = new Observer('ps', center)
const tv = new Observer('tv', center)
center.setState('on')