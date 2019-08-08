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
      <filter-box :data="filterListData" @filter="getResult"></filter-box>
      <v-sort></v-sort>
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
      categoryListCopy: []
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
    getResult (val) {
      this.categoryListData = [].concat(this.categoryListCopy)
      Object.keys(val).forEach(key => {
        if (val[key]) {
          this.categoryListData = this.categoryListData.filter(item => {
            return item.features.indexOf(val[key]) >= 0
          })
        }
      })
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
