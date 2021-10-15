// 两数只和 nums = [2,7,11,15], target = 9 2+7 = 9 输出：[0,1]
const arr = [2, 7, 11, 20]
const target = 9
function twoSum(arr, target) {
    let map = new Map();
    for (let i = 0; i < arr.length; i++) {
        if (map.get(arr[i]) !== undefined) {
            return [map.get(arr[i]), i]
        }
        else {
            map.set(target - arr[i], i)
        }
    }
    return []
}
// const res1 = twoSum(arr, target)
// console.log(res1)


// 2.两数组交集
// 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// 输出：[9,4]

const nums1 = [4,9,5], nums2 = [9,4,9,8,4]
function intersection(list1, list2) {
    return result = [...new Set(list1)].filter(item => new Set(list2).has(item))
}
// const res2 = intersection(nums1, nums2)
// console.log(res2)

function intersection2(num1, num2) {
    let map = {}
    let res = []
    for (let i = 0; i < num1.length; i++) {
        map[num1[i]] = true;
    }
    for (let i = 0; i < num2.length; i++) {
        if (map[num2[i]]) {
            res.push(num2[i])
            map[num2[i]] = false
        }
    }
    return res
}
// const res2 = intersection2(nums1, nums2)
// console.log(res2)

// 3.查找字符串数组中的最长公共前缀。
// 输入：strs = ["flower","flow","flight"]
// 输出："fl"
// 示例 2：
var numbers = [1, 5, 3, 2];

function getSum(total, num) {
	console.log(total, num)
    return total + num;
}
function myFunction(item) {
    const total = numbers.reduce(getSum, 0);
}
myFunction()