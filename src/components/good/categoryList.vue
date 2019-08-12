<template>
  <div>
    <ul v-if="data.length > 0" class="clearfix">
      <li @click="clickItem(item)" :class="{'last-child': (index + 1) % 4 === 0}" class="goods-list" v-for="(item, index) in data" :key="index">
        <a :href="item.href">
          <image-list :data="item.colorImageUrls"></image-list>
          <div class="goods-name">{{item.goodsName}}</div>
          <div class="goods-desc">{{item.goodsDesc}}</div>
          <div class="goods-price">
            <i>￥</i>
            {{item.goodsPrice}}
            <span class="lower" v-if="item.lower">起</span>
            <span class="goods-oldprice" v-if="item.oldPrice">{{item.oldPrice}}</span>
          </div>
        </a>
        <div class="goods-new" v-if="item.newProduct">新品</div>
      </li>
    </ul>
    <div v-else class="clearfix empty">
      <div class="fl empty-bg"></div>
      <div class="fr empty-desc">
        <div class="title">抱歉没有找到相关的商品</div>
        <div>
          建议您：<br>
          1. 适当减少筛选条件<br>
          2. 尝试其他条件
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import imageList from '../common/imageList.vue'
export default {
  name: 'categoryList',
  components: {
    imageList
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    clickItem (item) {
      this.$emit('clickItem', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.goods {
  &-list {
    float: left;
    width: 303px;
    height: 436px;
    background-color: white;
    cursor: pointer;
    transition: all .3s ease;
    position: relative;
    margin-top: 10px;
    margin-right: 9px;
    overflow: hidden;
    text-align: center;
    &:hover {
      box-shadow: 0 15px 30px rgba(0, 0, 0, .1);
    }

    &.last-child {
      margin-right: 0;
    }
  }

  &-img {
    height: 230px;
    margin-top: 30px;
  }

  &-name {
    margin-top: 30px;
    margin-bottom: 2px;
    color: #333;
    font-size: 16px;
  }

  &-desc {
    font-size: 14px;
    color: #999;
  }

  &-price {
    display: inline-block;
    position: relative;
    padding-left: 14px;
    font-size: 22px;
    color: #c00;

    i {
      font-style: normal;
      font-size: 14px;
      position: absolute;
      left: 0;
      top: 5px;
    }
  }

  &-oldprice {
    text-decoration: line-through;
    color: #666666;
    font-size: 14px;
    margin-left: 8px;
  }

  &-new {
    position: absolute;
    left: 30px;
    top: 30px;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border-radius: 30px;
    color: white;
    background: linear-gradient(120deg, #2e74f6, #56bdf9);
  }
}

.lower {
  font-size: 16px;
}

.empty {
  width: 335px;
  margin: 120px auto 380px auto;
  &-bg {
    background: url("../../assets/images/xiongmao.png") no-repeat;
    width: 105px;
    height: 130px;
    margin-right: 30px;
  }

  &-desc {
    width: 200px;
  }

  .title {
    font-size: 18px;
    color: #00c3f5;
    margin: 15px auto;
  }
}
</style>
