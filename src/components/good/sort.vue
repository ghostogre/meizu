<template>
  <div class="clearfix sort-box">
    <div class="fl sort-order">
      <a href="">推荐</a>
      <a href="">新品</a>
      <a href="">
        价格<i class="icon-font icon-up arrow"></i>
      </a>
    </div>
    <div class="fr">
      <input type="checkbox" name="" id="">
      <span>仅显示有货商品</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sort'
}
</script>

<style lang="scss" scoped>
.sort-box {
  margin: 30px auto 20px;
  color: #666;
  .sort-order {
    a {
      margin-right: 50px;
      &:hover, .active {
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
