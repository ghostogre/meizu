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
      state.shopCartData.push(obj.data)
    }
  }
}

export default mutations
