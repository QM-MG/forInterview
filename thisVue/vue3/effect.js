// 模拟effect中的响应式数据发生变更时自动调用回调
const refVlaue  = ref(0)
effect (function fn() {
	console.log(refVlaue.value)
})
refVlaue.value++

{
	let activeEffect
	// init 参数 0
	function ref(init) {
		class RefImpl {
			constructor(init) {
			    this._init = init
			}
			get value() {
				trackRefValue(this)
				return this._value
			}
			set value(newVal) {
				this._value = newVal
				triggerRefValue(this, newVal)
			}
		}
		return new RefImpl(init)
		
	}
	function trackRefValue(refValue) {
		if (!refValue.dep) {
			refValue.dep = new Set()
		}
		refValue.dep.add(activeEffect) // effect 里已有值
	}
	function triggerRefValue(refValue) {
		[...refValue.dep].forEach(effect => effect.fn())
	}
	function effect(fn) {
		activeEffect = new ReactiveEffect(fn)
		fn()
	}
	class ReactiveEffect {
		constructor(fn) {
			this.fn = fn
		}
	}
}