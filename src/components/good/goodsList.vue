<template>
  <ul>
    <li v-for="(item, index) in data" :key="index">
      <a :href="item.href">
        <img :src="item.goodsUrl" alt="">
        <div>{{item.goodsName}}</div>
        <div>{{item.goodsDesc}}</div>
        <div>
          <i>￥</i>
          {{item.goodsPrice}}
          <span v-if="item.lower">起</span>
          <span v-if="item.oldPrice">{{item.oldPrice}}</span>
        </div>
      </a>
      <div v-if="item.newProduct">新品</div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'goods-list',
  props: {
    data: {
      type: Array,
      default () {
        return {
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
