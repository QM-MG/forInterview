class Promise{
    constructor(handleFunction){
      console.log(0)
      // handleFunction: function(resolve,reject){\n    resolve('lsh')\n  }
        this.status = 'pending'
        this.value = undefined
        this.fulfilledList = []
        this.rejectedList = []
        
        handleFunction(this.triggerResolve.bind(this),this.triggerReject.bind(this))
    }
	// 实例resovle去调用的triggerResolve
    triggerResolve(val){ // val :lsh
        //当前的promise状态已经变成了resolve,要执行后续的操作
        setTimeout(()=>{
      console.log(1)
          if(this.status !== 'pending') return
  
          if(val instanceof Promise){
             val.then(
               value => {},
               err => {}
             )
          }else{
            //resolve方法传入的是普通值
            this.status = 'fulfilled'
            this.value = val
            this.triggerFulfilled(val)
          }
        },0)
    }
  
    triggerFulfilled(val){
      console.log(5,val, this.fulfilledList.toString())
      // fulfilledList : onFinalFulfilled
       this.fulfilledList.forEach(item =>item(val))
       this.fulfilledList = []
    }
  
    triggerReject(){
        
    }
  
    then(onFulfilled,onRejected){
      console.log(4)
      const { value , status } =  this;
      return new Promise((onNextFulfilled, onNextRejected)=>{ //onNextFulfilled [Function: bound triggerResolve]
        function onFinalFulfilled(val){
          if(typeof onFulfilled !== 'function'){
            onNextFulfilled(val)
          }
		  else{
            const res = onFulfilled(val)
            if(res instanceof Promise){
              res.then(onNextFulfilled,onNextRejected)
            }
			else{
              onNextFulfilled(res)
            }
          }
        }
        function onFinalRejected(error){
          if(typeof onRejected !== 'function'){
            onNextRejected(error)
          }
		  else{
            let res = null
            try{
              res = onRejected(error)
            } catch(e){
              onNextRejected(e)
            }
            if(res instanceof Promise){
              res.then(onNextFulfilled,onNextRejected)
            }else{
              onFulfilled(res)
            }
          }
        }
      console.log(5)
          switch(status){
            case 'pending':{
              this.fulfilledList.push(onFinalFulfilled)
              this.rejectedList.push(onFinalRejected)
              break;
            }
            case 'fulfilled':{
              onFinalFulfilled(value)
              break;
            }
          }
      })
    }
    catch(onRejected){
      return this.then(null,onRejected)
    }
  
    static resolve(value){
       if(value instanceof Promise)  return value
       return new Promise(resolve => resolve(value))
    }
  
    static reject(){
  
    }
  
    static all(list){
       return new Promise((resolve,reject)=>{
         let count = 0 ;
         const values = []
         for(const [i,promiseInstance] of list.entries()){
           Promise.resolve(promiseInstance)
           .then(res=>{
             values[i] = res;
             count++
             if(count === list.length){
               resolve(values)
             }
           },err =>{
             reject(err)
           })
         }
       })
    }
  
    static race(list){
       return  new Promise((resolve,reject)=>{
         list.forEach(item=>{
           Promise.resolve(item).then(res=>{
             resolve(res)
           },err =>{
             reject(err)
           })
         })
       })
    }
  }

  const promise = new Promise(function(resolve,reject){
	  setTimeout(()=> {
		  resolve('lsh')
	  }, 3000)
  })
  promise
  .then(function(str){console.log(str); return str })
  // .then(function(str2){console.log('resolve2',str2)})
// const promise = function(time) {
//     return new Promise(function(resolve, reject) {
//         return setTimeout(resolve, time)
//     })
// }
// Promise.all([promise(1000), promise(2000)])
// .then(function() {
//     console.log('all')
// })