// settimeout 模拟实现 setinterval(带清除定时器的版本)

function mysetTimout (fn, t) {
	let timer = null
	interval()
	function interval() {
		fn()
		timer setTimeout(interval, t)
	}
}
// let a=mySettimeout(()=>{
//   console.log(111);
// },1000)
// let b=mySettimeout(() => {
//   console.log(222)
// }, 1000)

const mySetTimeout = (fn, time) => {
  const timer = setInterval(() => {
    clearInterval(timer);
    fn();
  }, time);
};
// mySetTimeout(()=>{
//   console.log(1);
// },1000)
