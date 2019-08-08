<template>
  <ul class="filter-box">
    <li class="box-item clearfix" v-for="(item, index) in data" :key="index">
      <div class="fl filter-title">{{item.name}}:</div>
      <ul class="fl">
        <li :class="{'active': activeFilters[item.key] === info.value}" class="filter-item fl" v-for="(info, idx) in item.queryList" :key="idx" @click="changeFilter(item.key, info.value)">
          {{info.name}}
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'filterBox',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      activeFilters: {}
    }
  },
  methods: {
    changeFilter (key, value) {
      this.$set(this.activeFilters, key, value)
      this.$emit('filter', this.activeFilters)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-box {
  background-color: white;
  padding: 15px 10px;
  border: 1px solid #efefef;

  .box-item {
    height: 46px;
    line-height: 46px;
  }

  .filter-title {
    width: 85px;
    padding-left: 10px;
    white-space: nowrap;
    color: #333;
    overflow: hidden;
  }

  .filter-item {
    cursor: pointer;
    margin-right: 62px;

    &.active {
      color: #00c3f5;
    }
  }
}
</style>
