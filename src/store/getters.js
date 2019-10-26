const getters = {
  shopCartData (state) {
    return state.shopCartData
  },
  isAllChecked (state) {
    let checked = true
    state.shopCartData.forEach(item => {
      if (!item.checked) {
        checked = false
      }
    })
    return checked
  }
}

export default getters
