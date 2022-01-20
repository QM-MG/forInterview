// 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
let l1 = [1,2,4], l2 = [1,3,4]
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

var mergeTwoLists = function(l1, l2) {
    const dummpy = node = new ListNode();
    while(l1 && l2){
        if(l1.val >= l2.val) {
            node.next = l2;
            node = node.next;
            l2 = l2.next;
        } else {
            node.next = l1;
            node = node.next;
            l1 = l1.next;
        }
    }
    node.next = l1 || l2;
    return dummpy.next;
};
// let res = mergeTwoLists(l1, l2)
// console.log(res)