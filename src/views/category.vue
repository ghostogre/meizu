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
      <filter-box :data="filterListData"></filter-box>
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
export default {
  name: 'category',
  components: {
    vHeader,
    vFooter,
    filterBox,
    categoryList
  },
  data () {
    return {
      categoryListData: [],
      filterListData: []
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
    },

    async  getFilterListData () {
      const { data } = await axios.get('/api/queryList')
      this.filterListData = data
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
