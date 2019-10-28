import Vue from 'vue'
const mutations = {
  ADD_SHOPCART (state, obj) {
    let haveData = false
    state.shopCartData.forEach(element => {
      // eslint-disable-next-line no-cond-assign
      if (element.id = obj.data.id) {
        haveData = true
        element.count += obj.num
      }
    })
    if (!haveData) {
      Vue.set(obj.data, 'count', obj.num)
      Vue.set(obj.data, 'checked', true)
      state.shopCartData.push(obj.data)
    }
  },

  // 添加购物车
  INCREASE_SHOPCART (state, id) {
    for (let i = 0, len = state.shopCartData.length; i < len; i++) {
      if (state.shopCartData[i].id === id) {
        state.shopCartData[i].count++
        break
      }
    }
  },

  // 减少购物车
  REDUCE_SHOPCART (state, id) {
    const shopCartData = state.shopCartData
    for (let i = 0, len = shopCartData.length; i < len; i++) {
      if (shopCartData[i].id === id && shopCartData[i].count > 1) {
        shopCartData[i].count--
        break
      }
    }
  },

  // 选中商品
  CHECK_GOODS (state, id) {
    state.shopCartData.forEach(item => {
      if (item.id === id) {
        item.checked = !item.checked
      }
    })
  },

  // 全选
  CHECK_ALL_GOODS (state, checked) {
    state.shopCartData.forEach(item => {
      item.checked = !checked
    })
  },

  // 删除
  DEL_SHOPCART (state, id) {
    for (let i = 0, len = state.shopCartData.length; i < len; i++) {
      if (state.shopCartData[i].id === id) {
        state.shopCartData.splice(i, 1)
      }
    }
  }
}

export default mutations
