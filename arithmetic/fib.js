function fb (n) {
    if (n === 0) {
        return 0
    }
    if (n === 1 || n === 2) {
        return 1
    }
    return fb(n - 1) + fb (n - 2)
}
let res = fb(10)
// console.log(res)

// bp
function fb1 (n) {
    if (n === 0) {
        return 0
    }
    let memoryList = new Array(n+1).fill(0)
    return fibHelper(memoryList, n)
}
function fibHelper(memoryList, n) {
    if (n === 1 || n === 2) {
        return 1
    }
    if (!memoryList[n]) {
        memoryList[n] = fibHelper(memoryList, n-1) + fibHelper(memoryList, n-2)
    }
    return memoryList[n]
}
let res1 = fb1(10)
// console.log(res1)

// 状态压缩
function fb3(n) {
    if (n === 0) {
        return 0
    }
    if (n === 1 || n === 2) {
        return 1
    }
    let pre = 1
    let current = 1
    let sum = 0;
    for (let i = 3; i <= n; i++) {
        let sum = pre + current // f(3)
        pre = current;
        current = sum;
    }
    return current;
}
let res3 = fb3(10)
console.log(res3)