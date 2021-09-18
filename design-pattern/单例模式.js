// 全局只需要一个实例



class PlayStation {
    constructor() {
        this.state = 'off'
    }
    play() {
        if (this.state === 'on') {
            return
        }
        this.state = 'on'
    }
    shutdown() {
        if (this.state === 'off') {
            return
        }
        this.state = 'off'
    }
    static getInstance() {
        return function() {
            if (!this.instance) {
                this.instance = new PlayStation()
            }
            return this.instance
        }()
    }
}

// PlayStation.getInstance = (function() {
//     return function() {
//         if (!this.instance) {
//             this.instance = new PlayStation()
//         }
//         return this.instance
//     }
// })()
let ps1 = PlayStation.getInstance()
ps1.play()