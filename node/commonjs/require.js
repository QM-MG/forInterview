const vm = require('vm')
const path = require('path')
const fs = require('fs')

function r (filename) {
    const pathToFile = path.resolve(__dirname, filename)
    const content = fs.readFileSync(pathToFile, 'utf-8')
    const wrapper = [
        '(function(require, module, exports, __dirname, __filename, a) {',
        '})'
    ]
    const wrapperContent = wrapper[0] + content + wrapper[1]
    console.log(wrapperContent)
    const script = new vm.Script(wrapperContent, {
        filename: 'index.js'
    })

    const module = {
        export: {}
    }
    const result = script.runInThisContext();

    result(r, module, module.export, null, null, 'hell0')
    return module.exports
}
console.dir(r)

global.r = r
