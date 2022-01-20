class Prmise {
	callbacks = []
	state = 'pending'
	value = null
	constructor(fn) {
		fn(this._resolve.bind(this))
	}
	_resolve() {
		
	}
	then(onFulfilled) {
		return new Promise((resolve, reject) => {
			this._handle({
				onFulfilled: onFulfilled,
				resolve: resolve
			})
		})
	}
	_handle(callback) {
		if (this.state === 'pending') {
			this.callbacks.push(callback)
			return
		}
		
	}
	finally(onDone) {
		
	}
	static resolve() {
		
	}
	static all(list) {
		
	}
	static race() {
		
	}
}