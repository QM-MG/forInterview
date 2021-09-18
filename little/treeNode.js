/* 二叉树遍历 */
var tree = {
    value: "-",
    left: {
        value: '+',
        left: {
            value: 'a',
        },
        right: {
            value: '*',
            left: {
                value: 'b',
            },
            right: {
                value: 'c',
            }
        }
    },
    right: {
        value: '/',
        left: {
            value: 'd',
        },
        right: {
            value: 'e',
        }
    }
}
// 深度优先遍历
let result = [];
let dfs = function (node) {
    if(node) {
        result.push(node.value);
        dfs(node.left);
        dfs(node.right);
    }
}

dfs(tree);
console.log(result); 
// ["-", "+", "a", "*", "b", "c", "/", "d", "e"]


// 广度优先遍历
let result = [];
let stack = [tree]; // 先将要遍历的树压入栈
let count = 0; // 用来记录执行到第一层
let bfs = function () {
    let node = stack[count];
    if(node) {
        result.push(node.value);
        if(node.left) stack.push(node.left);
        if(node.right) stack.push(node.right);
        count++;
        bfs();
    }
}
dfc();
console.log(result);
//  ["-", "+", "/", "a", "*", "d", "e", "b", "c"]