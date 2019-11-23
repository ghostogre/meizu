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
function MyPromise (excutor) {
  let that = this // 缓存当前promise实例
  that.status = PENDING // 初始状态
  that.value = undefined // 终值
  that.reason = undefined // 拒因
  that.onFulfilledCallbacks = [] // 存储fulfilled状态对应的onFulfilled函数
  that.onRejectedCallbacks = [] // 存储rejected状态对应的onRejected函数

  function resolve (value) { // value是成功时接受到的终值
    if (value instanceof MyPromise) { // value是promise对象的时候，当前promise的状态取决于value的状态了。
      return value.then(resolve, reject)
    }

    // 为什么resolve 加setTimeout?
    // 2.2.4规范 onFulfilled 和 onRejected 只允许在 execution context 栈仅包含平台代码时运行.
    // 注1 这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。

    setTimeout(() => {
      if (that.status === PENDING) {
        // 只能由pending => fulfilled，只执行一次
        that.status = FULFILLED
        that.value = value
        that.onFulfilledCallbacks.forEach(cb => cb(that.value))
      }
    })
  }

  function reject (reason) {
    setTimeout(() => {
      if (that.status === PENDING) {
        that.status = REJECTED
        that.reason = reason
        that.onRejectedCallbacks.forEach(cb => cb(that.reason))
      }
    })
  }

  // 捕获excutor执行器抛出的异常
  try {
    excutor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

/**
 * resolve中的几种情况
 * 1. 普通值
 * 2. promise对象
 * 3. thenable对象/函数
 */

// 增强改造resolve，适应不同的情况
function resolvePromise (promise2, x, resolve, reject) {
  if (promise2 === x) { // 避免循环引用
    return reject(new TypeError('循环引用'))
  }
  let called = false // 避免多次调用
  // 如果x是一个promise对象 (该判断和下面的判断是不是thenable对象重复，所以可有可无)
  if (x instanceof MyPromise) {
    if (x.status === PENDING) {
      // 如果是promise就等待这个promise拒绝或者成功
      x.then(y => {
        resolvePromise(promise2, y, resolve, reject)
      }, reason => {
        reject(reason)
      })
    } else { // 如果 x 已经处于执行态或者拒绝态
      x.then(resolve, reject)
    }
  } else if (x !== null && ((typeof x === 'object') || (typeof x === 'function'))) {
    try { // 是否为thenable函数(具有then方法)
      let then = x.then
      if (typeof then === 'function') {
        // called控制两个参数只能调用一次，因为是thenable不是promise
        then.call(x, y => {
          if (called) return
          called = true
          resolvePromise(promise2, y, resolve, reject)
        }, reason => {
          if (called) return
          called = true
          reject(reason)
        })
      } else { // 说明是一个普通对象和函数
        resolve(x)
      }
    } catch (error) {
      if (called) return
      called = true
      reject(error)
    }
  } else {
    resolve(x)
  }
}

// 注册fulfilled/rejected状态对应的回调函数
// 前一个回调函数，有可能返回的还是一个Promise对象（即有异步操作）
// 这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const that = this
  let newPromise
  // 处理参数默认值 保证参数后续能够继续执行
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value // 处理参数不是函数的情况
  onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
  // then里面的FULFILLED/REJECTED状态时 为什么要加setTimeout ?
  // 原因:
  // 其一 2.2.4规范 要确保 onFulfilled 和 onRejected 方法异步执行(且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行) 所以要在resolve里加上setTimeout
  // 其二 2.2.6规范 对于一个promise，它的then方法可以调用多次.（当在其他程序中多次调用同一个promise的then时 由于之前状态已经为FULFILLED/REJECTED状态，则会走的下面逻辑),所以要确保为FULFILLED/REJECTED状态后 也要异步执行onFulfilled/onRejected

  // 其二 2.2.6规范 也是resolve函数里加setTimeout的原因
  // 总之都是 让then方法异步执行 也就是确保onFulfilled/onRejected异步执行

  // 如下面这种情景 多次调用p1.then
  // p1.then((value) => { // 此时p1.status 由pending状态 => fulfilled状态
  //     console.log(value); // resolve
  //     // console.log(p1.status); // fulfilled
  //     p1.then(value => { // 再次p1.then 这时已经为fulfilled状态 走的是fulfilled状态判断里的逻辑 所以我们也要确保判断里面onFuilled异步执行
  //         console.log(value); // 'resolve'
  //     });
  //     console.log('当前执行栈中同步代码');
  // })
  // console.log('全局执行栈中同步代码');
  //

  if (that.status === FULFILLED) {
    return (newPromise = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onFulfilled(that.value)
          resolvePromise(newPromise, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    }))
  }

  if (that.status === REJECTED) {
    return (newPromise = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onRejected(that.reason)
          resolvePromise(newPromise, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    }))
  }

  if (that.status === PENDING) {
    return (newPromise = new MyPromise((resolve, reject) => {
      // 当运行到then的时候，因为返回是一个新的promise，这里new Promise是同步执行的
      // 加入到回调队列的函数的resolve和reject是newPromise的
      // newPromise默认是resolved，返回promise才能实现链式调用
      // 执行了才能知道onFulfilled返回的是不是promise
      that.onFulfilledCallbacks.push((value) => {
        try {
          let x = onFulfilled(value)
          resolvePromise(newPromise, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })

      that.onRejectedCallbacks.push((reason) => {
        try {
          let x = onRejected(reason)
          resolvePromise(newPromise, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    }))
  }
}

// 静态方法
MyPromise.all = function (promises) {
  return new MyPromise((resolve, reject) => {
    let done = gen(promises.length, resolve)
    promises.forEach((item, index) => {
      item.then((value) => {
        done(index, value)
      }, reject)
    })
  })
}

function gen (length, resolve) {
  let count = 0
  let values = []
  return function (i, value) {
    values[i] = value
    if (++count === length) {
      console.log(values)
      resolve(value)
    }
  }
}

MyPromise.race = function (promises) {
  return new MyPromise((resolve, reject) => {
    promises.forEach(item => {
      item.then(resolve, reject)
    })
  })
}

MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

MyPromise.resolve = function (value) {
  return new MyPromise((resolve) => {
    resolve(value)
  })
}

MyPromise.reject = function (reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason)
  })
}

MyPromise.deferred = function () { // 延迟对象
  let defer = {}
  defer.promise = new Promise((resolve, reject) => {
    defer.resolve = resolve
    defer.reject = reject
  })
  return defer
}

try {
  module.exports = MyPromise
} catch (e) {
}
