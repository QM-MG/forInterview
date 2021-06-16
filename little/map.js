const selfMap = function (fn, context) {
    let arr = Array.prototype.slice.call(this);
    let mapArray = [];
    for (let i = 0; i < arr.length; i++) {
        if (!arr.hasOwnProperty(i)) {
            continue;
        }
        console.log(context, arr[i], i, this)
        mapArray[i] = fn.call(context, arr[i], i, this)
    }
    return mapArray;
}
Array.prototype.selfMap = selfMap;
let result = [1,2,3].selfMap(num => num * 2)
console.log(result)