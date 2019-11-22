/**
 * 找出数组中第k大和第m大的数字相加之和
 * 说明：实现一个方法，找出数组中第k大的和第m大的数字相加之和
 * 示例：
 *   let arr = [1,2,4,4,3,5], k = 2, m = 4
 *   findTopSum(arr, k, m); // 第2大的数是4，出现2次，第4大的是2，出现1次，所以结果为10
 */
function findTopSum (arr, k, m) {
  /** 代码实现 */
  if (arr instanceof Array && arr.length > k && arr.length > m) {
    let a
    let sum = 0
    // 为了不改变k, m
    let k1 = 0
    let m1 = 0
    for (let i = 0, len = arr.length; i < len; i++) {
      // 正常只进行排序其实外层循环只需要执行到i < arr.length - 1就排完了
      // 但是这样如果最后一个是一样的大小就可能处理不到
      // 最后一个的时候j = arr.length, j < len1所以下面的循环并不会执行，只会处理计算
      for (let j = i + 1, len1 = arr.length; j < len1; j++) {
        if (arr[i] < arr[j]) { // 最大的在前面
          a = arr[i]
          arr[i] = arr[j]
          arr[j] = a
        }
      }
      // 排完一个就把k1, m1减一
      if (i === 0 || arr[i] !== arr[i - 1]) {
        k1++
        m1++
      }

      k === k1 && (sum += arr[i])
      m === m1 && (sum += arr[i])
    }
    return sum
  }
}

/**
 * 按条件合并相邻项
 * 说明：实现一个方法，可将数组中相邻的项按条件合并
 * 示例：
 *   adjoin([1, 2, 3, 4, 5], item => item !== 3); // [[1, 2], 3, [4, 5]]
 *   adjoin([1, 2, 3, 4], item => item < 3); // [[1, 2], 3, 4]
 */
function adjoin (arr, condition) {
  /* 代码实现 */
  let result = []
  let queue = []
  arr.forEach(item => {
    if (condition(item)) {
      queue.push(item)
    } else {
      queue.length > 0 && result.push(queue)
      result.push(item)
      queue = []
    }
  })
  // 最后多处理一次
  queue.length > 0 && result.push(queue)
  return result
}

/**
 * 说明：实现一个方法，用于比较两个版本号（version1、version2）
 *     如果version1 > version2，返回1；如果version1 < version2，返回-1，其他情况返回0
 *     版本号规则`x.y.z`，xyz均为大于等于0的整数，至少有x位
 * 示例：
 * compareVersion('0.1', '1.1.1'); // 返回-1
 * compareVersion('13.37', '1.2 '); // 返回1
 * compareVersion('1.1', '1.1.0'); // 返回0
 */

function compareVersion (version1, version2) {
  /* 功能实现 */
  const arr1 = version1.split('.')
  const arr2 = version2.split('.')
  let len1 = arr1.length
  let len2 = arr2.length
  let len = len1 < len2 ? len1 : len2
  for (let i = 0; i < len; i++) {
    if (arr1[i] > arr2[i] || (i === len - 1 && len1 > len2)) {
      return 1
    } else if (arr1[i] < arr2[i] || (i === len1 - 1 && len1 < len2)) {
      return -1
    } else if (i === len1 - 1) {
      return 0
    }
  }
}

let arr = [1, 1, 2, 4, 3, 5]
let k = 1
let m = 5
console.log(findTopSum(arr, k, m)) // 第2大的数是4，出现2次，第4大的是2，出现1次，所以结果为10
console.log(adjoin([1, 2, 3, 4, 5], item => item < 3))
