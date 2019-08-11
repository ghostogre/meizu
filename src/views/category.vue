<template>
  <div>
    <v-header></v-header>
    <div class="category-wrapper">
      <div class="bread">
        <span>首页</span>
        <span class="arrow">></span>
        <span>全部</span>
        <span class="arrow">></span>
        <span class="last-bread">手机</span>
      </div>
      <filter-box :data="filterListData" @filter="getQuery"></filter-box>
      <v-sort @getKey="getSortKey" @getStock="getSortsStock"></v-sort>
      <category-list :data="categoryListData"></category-list>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import axios from 'axios'
import vHeader from '../components/common/header'
import vFooter from '../components/common/footer'
import filterBox from '../components/good/filterBox'
import categoryList from '../components/good/categoryList'
import vSort from '../components/good/sort'
export default {
  name: 'category',
  components: {
    vHeader,
    vFooter,
    filterBox,
    categoryList,
    vSort
  },
  data () {
    return {
      categoryListData: [],
      filterListData: [],
      categoryListCopy: [],
      currentQuery: null,
      currentStock: null,
      currentKey: null
    }
  },
  mounted () {
    this.getCategoryListData()
    this.getFilterListData()
  },
  methods: {
    async  getCategoryListData () {
      const { data } = await axios.get('/api/categoryList')
      this.categoryListData = data
      this.categoryListCopy = [].concat(data)
    },

    async  getFilterListData () {
      const { data } = await axios.get('/api/queryList')
      this.filterListData = data
    },

    getQuery (val) {
      this.currentQuery = val
      this.sortGoods()
    },

    sortGoods () {
      this.categoryListData = [].concat(this.categoryListCopy)
      if (this.currentQuery) {
        Object.keys(this.currentQuery).forEach(key => {
          if (this.currentQuery[key]) {
            this.categoryListData = this.categoryListData.filter(item => {
              return item.features.indexOf(this.currentQuery[key]) >= 0
            })
          }
        })
      }
      if (this.currentStock) {
        this.categoryListData = this.categoryListData.filter((item) => {
          return item.available
        })
      }

      if (this.currentKey === 'recommand') {
        this.categoryListData.sort((a, b) => {
          return b.shelveTime - a.shelveTime
        })
      } else if (this.currentKey === 'new') {
        this.categoryListData.sort((a, b) => {
          return b.publishedTime - a.publishedTime
        })
      } else if (this.currentKey === 'low') {
        this.categoryListData.sort((a, b) => {
          return b.goodsPrice - a.goodsPrice
        })
      } else if (this.currentKey === 'high') {
        this.categoryListData.sort((a, b) => {
          return a.goodsPrice - b.goodsPrice
        })
      }
    },

    // 获取排序
    getSortKey (key) {
      this.currentKey = key
      this.sortGoods()
    },

    getSortsStock (val) {
      this.currentStock = val
      this.sortGoods()
    }
  }
}
</script>

<style lang="scss" scoped>
.category {
  &-wrapper {
    width: 1240px;
    margin: 0 auto;
    padding-bottom: 60px;
  }
}

.bread {
  height: 40px;
  line-height: 40px;

  .arrow, .last-bread {
    color: #999;
  }
}

</style>
