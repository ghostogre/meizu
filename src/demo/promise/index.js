import { resolveAny } from 'dns'

// 解决 (fulfill) : 指一个 promise 成功时进行的一系列操作，
// 拒绝（reject) : 指一个 promise 失败时进行的一系列操作。
// 拒因 (reason) : 也就是拒绝原因，指在 promise 被拒绝时传递给拒绝回调的值。
// 终值（eventual value） : 所谓终值，指的是 promise 被解决时传递给解决回调的值，由于 promise 有一次性的特征，因此当这个值被传递时，标志着 promise 等待态的结束，故称之终值，有时也直接简称为值（value）。
// Promise : promise 是一个拥有 then 方法的对象或函数，其行为符合本规范。
// thenable : 是一个定义了 then 方法的对象或函数，文中译作“拥有 then 方法”。

// 3个状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

// MyPromise
class MyPromise {
  constructor (fn) {
    // 当前状态
    this.state = PENDING
    // 终值
    this.value = null
    // 拒因
    this.reason = null
    // 成功回调队列
    this.onFulfilledCallbacks = []
    // 失败回调队列
    this.onRejectedCallbacks = []

    const resolve = (value) => {
      // 使用macro-task机制(setTimeout),确保onFulfilled异步执行,且在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。
      // 不然的话在new Promise的时候可能就在then加入队列之前就执行了
      setTimeout(() => {
        if (this.state === PENDING) {
          // pending变成fulfilled，保证只执行一次
          this.state = FULFILLED
          // 终值
          this.value = value
          this.onFulfilledCallbacks.forEach(cb => {
            this.value = cb(this.value) // 传给下一个then的value是当前then的onFulfilled方法的返回值，必须用this.value
          })
        }
      })
    }

    const reject = reason => {
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = REJECTED
          // 拒因
          this.reason = reason
          this.onRejectedCallbacks.forEach(cb => {
            this.reason = cb(this.reason)
          })
        }
      })
    }

    try {
      // 执行promise
      fn(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then (onFulfilled, onRejected) {
    // then方法必须返回一个promise对象
    let newPromise
    // 如果 onFulfilled 不是函数, 且 promise 成功执行， newPromise 必须成功执行并返回相同的值。
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    // 如果 onRejected 不是函数, 且 promise 拒绝执行， newPromise 必须拒绝执行并返回相同的据因。
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw new Error(reason) }
    // 2.2.6规范 对于一个promise，它的then方法可以调用多次.
    // 当在其他程序中多次调用同一个promise的then时 由于之前状态已经为FULFILLED / REJECTED状态，则会走以下逻辑,
    // 所以要确保为FULFILLED / REJECTED状态后 也要异步执行onFulfilled / onRejected ,这里使用setTimeout

    // 6.不论 promise1 被 reject 还是被 resolve 时 promise2 都会被 resolve，只有出现异常时才会被 rejected。
    // 由于在接下来的解决过程中需要调用resolve,reject进行处理,处理我们在调用处理过程时,传入参数
    if (this.state === PENDING) {
      return (newPromise = new MyPromise((resolve, reject) => {
        // 如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决过程：[[Resolve]](newPromise, x)
        this.onFulfilledCallbacks.push(value => {
          try { // 如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 newPromise 必须拒绝执行，并返回拒因 e
            let x = onFulfilled(value)
            // 解决过程
            resolvePromise(newPromise, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
        this.onRejectedCallbacks.push(reason => {
          try {
            let x = onRejected(reason)
            resolvePromise(newPromise, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }))
    }

    if (this.state === FULFILLED) {
      return (newPromise = new MyPromise((resolve, reject) => {
        // 如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决过程：[[Resolve]](newPromise, x)
        setTimeout(() => {
          try { // 如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 newPromise 必须拒绝执行，并返回拒因 e
            let x = onFulfilled(this.value)
            // 解决过程
            resolvePromise(newPromise, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }))
    }

    if (this.state === REJECTED) {
      return (newPromise = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(newPromise, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }))
    }
  }
}

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  }, 2000)
}).then(res => {
  console.log(res)
  return res + 1
}).then(res => {
  console.log(res)
})
