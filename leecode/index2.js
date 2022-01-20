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
    return total + num;
}
function myFunction(item) {
    const total = numbers.reduce(getSum, 0);
}
// myFunction()

// 4. 杨辉三角
var generate = function(numRows) {
    if(numRows === 0){ return [] }
    const result = Array.from(new Array(numRows), ()=>[])
    for(let i = 0; i < numRows; i++){
        result[i][0] = 1; result[i][i] = 1;
        for(let j = 1; j < i; j++){
        result[i][j] = result[i-1][j-1] + result[i-1][j] 
        }
    }
    return result
};
let res4 = generate(4)
// console.log(res4)

// 输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
// 输出：[1,2,2,3,5,6]

let num11 = [1,2,3,0,0,0], m = 3, num22 = [2,5,6], n = 3
var merge = function (nums1, m, nums2, n) {
    let len = m + n - 1;
    m--, n--;
    while (m >= 0 && n >= 0) {
      if (nums1[m] > nums2[n]) {
        nums1[len] = nums1[m--]
      } else {
        nums1[len] = nums2[n--]
      }
      len--;
    }
    if(m === -1){
      return nums1.splice(0, len+1, ...nums2.slice(0, n + 1));
    }
    if(n === -1){
      return nums1;
    }
  };
//   let res5 = merge(num11, m, num22, n)
//   console.log(res5)


// 6.给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。
var removeDuplicates = function(nums) {
    let i = 0;
    for(let j = 1; j < nums.length; j++){
        if(nums[j] !== nums[i]){
            nums[i+1] = nums[j];
            i++
        }
    }
    return i + 1
};
// let res6 = removeDuplicates([0,0,1,1,1,2,2,3,3,4])
// console.log(res6)

// 7 回文字符串
var isPalindrome = function(s) {
    s = s.replace(/[^\w]/g, '').toLowerCase();
    let leftPointer = 0;
    let rightPointer = s.length - 1;
    while(rightPointer > leftPointer){
        if(s[leftPointer++] === s[rightPointer--]){
            continue;
        }else{
            return false;
        }
    }
    return true;
  };
//   let res7 = isPalindrome('aca')
// console.log(res7)
  
// 8 移动0 输入: [0,1,0,3,12]
// 输出: [1,3,12,0,0]
var moveZeroes = function(nums) {
    let i = j = 0;
    while(i < nums.length) {
        if(nums[i] !== 0){
            [nums[i], nums[j]] = [nums[j], nums[i]]
            j++
        }
        i++
    }

    return nums
    };
    // console.log(moveZeroes([0,1,0,3,12]))

// 9 翻转字符串
// 输入：["h","e","l","l","o"]
// 输出：["o","l","l","e","h"]
var reverseString = function(s) {
    let l = 0 ;
    let r = s.length - 1;
    while(l < r){
      [s[l], s[r]] = [s[r], s[l]];
      l++; r--;
    }
    return s;
  };

//   10. 左括号必须用相同类型的右括号闭合。左括号必须以正确的顺序闭合。
let s = "()[]{}"
  var isValid = function(s) {
    const map = { '{': '}', '(': ')', '[': ']' };
    const stack = [];
    for(let i of s){
        if(map[i]){
            stack.push(i);
        } else {
            console.log(map[stack[stack.length - 1]])
            if(map[stack[stack.length - 1]] === i){
                stack.pop()
            }else{
                return false;
            }
        }
    }
    return stack.length === 0;
};
// console.log(isValid(s))

// 11. 最大子序和
var maxSubArray = function(nums) {
    let res = nums[0];
    const dp = [nums[0]];
    for(let i=1;i < nums.length;i++){
        console.log(dp[i-1])
        if(dp[i-1]>0){
          dp[i]=nums[i]+dp[i-1]
        }else{
         dp[i]=nums[i]
        }
        
      res=Math.max(dp[i],res)
    }
    return res
};
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))

// 12. 加一 输入：digits = [1,2,3]
// 输出：[1,2,4]

var plusOne = function(digits) {
    let carry = 1; // 进位（因为我们确定+1，初始化进位就是1）
    for(let i = digits.length - 1; i >= 0; i--){
        let sum = 0; // 这个变量是用来每次循环计算进位和digits[i]的值的
        sum = digits[i] + carry; 
        digits[i] = sum % 10; // 模运算取个位数
        carry = (sum / 10) | 0; //  除以10是取百位数，并且｜0表示舍弃小数位
    }
    if(digits[0] === 0) digits.unshift(carry);
    return digits
  };
  console.log(plusOne([9,9, 9]))