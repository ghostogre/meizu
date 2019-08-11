<template>
  <div class="clearfix sort-box">
    <div class="fl sort-order">
      <a href="javascript: void(0);" :class="{'active': activeSortKey === 'recommand'}" @click="setSortKey('recommand')">推荐</a>
      <a href="javascript: void(0);" :class="{'active': activeSortKey === 'new'}" @click="setSortKey('new')">新品</a>
      <a href="javascript: void(0);" :class="{'active': activeSortKey === 'high' || activeSortKey === 'low'}" @click="changePrice">
        价格<i :class="sortArrow" class="icon-font arrow"></i>
      </a>
    </div>
    <div class="fr">
      <input type="checkbox" v-model="haveStock" name="" id="">
      <span>仅显示有货商品</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sort-box',
  data () {
    return {
      activeSortKey: '',
      activePrice: 'low', // high
      haveStock: false
    }
  },
  mounted () {
    this.setSortKey('recommand')
  },
  computed: {
    sortArrow () {
      if (this.activePrice === 'low') {
        return 'icon-down'
      } else {
        return 'icon-up'
      }
    }
  },
  methods: {
    setSortKey (val) {
      this.activeSortKey = val
      this.$emit('getKey', this.activeSortKey)
    },
    changePrice () {
      if (this.activeSortKey === this.activePrice) {
        this.activePrice = this.activeSortKey === 'low' ? 'high' : 'low'
      }
      this.setSortKey(this.activePrice)
    }
  },
  watch: {
    haveStock (val) {
      this.$emit('getStock', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.sort-box {
  margin: 30px auto 20px;
  color: #666;
  .sort-order {
    a {
      margin-right: 50px;
      &:hover, &.active {
        color: #00c3f5;
        transition: color .2s ease-in-out;
      }

      &:hover .arrow {
        display: inline;
      }
    }

    .arrow {
      display: none;
    }
  }
}
</style>
