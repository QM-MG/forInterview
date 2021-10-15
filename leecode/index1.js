// 1. 给定一个整数数组，判断是否存在重复元素。
// 如果存在一值在数组中出现至少两次，函数返回 true 。如果数组中每个元素都不相同，则返回 false 。
const arr = [1, 2, 3, 1]
const containsDuplicate = function (list) {
    let map = new Map();
    for (let num of arr) {
        if(map.has(num)) {
            return true
        }
        else {
            map.set(num, 1)
        }
    }
    return false
}
// let res1 = containsDuplicate(arr)
// console.log(res)

// 2. 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。
const str = "loveleetcode"
function firstLetter(str) {
    let map = {}
    for (let s of str) {
        if (map[s] || map[s] === 0) {
            map[s]++
        }
        else {
            map[s] = 0
        }
    }
    for (let i = 0; i < str.length; i++) {
        if (map[str[i]] === 0) {
            return i
        }
    }
    return -1
}
// let res2 = firstLetter(str)
// console.log(res2)

// 3. 字母异位词 s = "anagram", t = "nagaram"
const s = "anagram", t = "nagaram"
function isAnagram (s, t) {
    let obj = {};
    const sLen = s.length
    const tLen = t.length
    if (sLen !== tLen) {
        return false
    }
    for (let i = 0; i < sLen; i++) {
        const currS = s[i]
        const currT = t[i]
        obj[currS]? obj[currS]++ : obj[currS] = 1
        obj[currT]? obj[currT]-- : obj[currT] = -1
    }
    return Object.values(obj).every(v => v === 0)
}
// let res3 = isAnagram(s, t)
// console.log(res3)

