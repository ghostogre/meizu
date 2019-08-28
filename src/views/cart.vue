<template>
  <div>
    <v-header></v-header>
    <div v-if="shopCartData.length > 0" class="shopCart-wrapper">
      <table class="shopCart-header">
        <tr>
          <td class="cart-select">
            <input type="checkbox" class="cart-checkbox">
            <span>全选</span>
          </td>
          <td class="cart-name">商品</td>
          <td class="cart-price">单价（元）</td>
          <td class="cart-num">数量</td>
          <td class="cart-total">小计（元）</td>
          <td class="cart-operator">操作</td>
        </tr>
      </table>
      <div class="shopcart-list">
        <table>
          <tr v-for="(item, index) in shopCartData" :key="index" class="cart-product">
            <td class="cart-select">
              <input type="checkbox" class="cart-checkbox">
              <img class="cart-img" :src="item.imageUrl" alt="">
            </td>
            <td class="cart-name">
              <span class="cart-title">{{item.goodsName}}</span>
              <span class="cart-desc">{{item.goodsDesc}}</span>
            </td>
            <td class="cart-price">￥{{item.goodsPrice}}</td>
            <td class="cart-num">
              <div class="cart-input">
                <button class="fl" @click="reduce(item.id)">-</button>
                <input class="fl" v-model="item.count" type="number">
                <button class="fl" @click="increase(item.id)">+</button>
              </div>
            </td>
            <td class="cart-total">￥{{item.count * item.goodsPrice}}</td>
            <td class="cart-operator">
              <i class="icon-font icon-close"></i>
            </td>
          </tr>
        </table>
      </div>
      <div class="clearfix shopcart-footer">
        <div class="fl">
          <input type="checkbox" class="cart-checkbox">
          <span>全选</span>
          <span class="footer-remove">删除选中的商品</span>
          <span>共<span class="footer-number gray">3</span>件商品，已选<span class="footer-number blue">3</span>件商品</span>
        </div>
        <div class="fr">
          <span>已优惠<span class="footer-number red">0.00</span>元，合计（不含运费）: <span class="footer-number red footer-total">￥4000</span></span>
          <a href="javascript: void(0);" class="btn success">去结算</a>
        </div>
      </div>
    </div>
    <div v-else class="shopcart-empty">
      <div class="empty-container">
        <div class="empty-left"></div>
        <div class="empty-right">
          <p class="empty-desc">购物车内还没有商品，赶紧去选购吧</p>
          <a href="javascript: void(0);" class="btn success" @click="goToIndex">返回商城首页</a>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import vHeader from '../components/common/header'
import vFooter from '../components/common/footer'
import { mapGetters } from 'vuex'
export default {
  components: {
    vHeader,
    vFooter
  },
  computed: {
    ...mapGetters([
      'shopCartData'
    ])
  },
  methods: {
    goToIndex() {
      this.$router.push({
        name: 'index'
      })
    },
    ...mapMutations({
      increase: 'INCREASE_SHOPCART',
      reduce: 'REDUCE_SHOPCART'
    })
  }
}
</script>

<style lang="scss" scoped>
.shopCart-wrapper {
  width: 1240px;
  margin: 10px auto;
  .shopCart-header {
    height: 50px;
    color: #333;
    background-color: white;
    border-bottom: 1px solid #efefef;
  }

  .cart-checkbox {
    width: 18px;
    height: 18px;
    border-color: #bdbdbd;
    display: inline-block;
    background-color: white;
    border-radius: 2px;
    font-size: 10px;
    vertical-align: middle;
  }

  .cart-select {
    width: 220px;
    padding-left: 45px;
    text-align: left;

    .cart-img {
      width: 100px;
      height: 100px;
      margin-left: 35px;
      vertical-align: middle;
    }
  }

  .cart-name {
    width: 270px;
    text-align: left;

    .cart-title {
      display: inline-block;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .cart-desc {
      color: #999;
    }
  }

  .cart-price {
    width: 220px;
    text-align: center;
  }

  .cart-num {
    width: 200px;
    text-align: center;
  }

  .cart-total {
    width: 200px;
  }

  .cart-operator {
    width: 170px;
    padding-right: 40px;
    text-align: right;
  }

  .shopcart-list {
    background-color: #fff;
    margin-bottom: 10px;
  }

  .shopcart-footer {
    height: 70px;
    line-height: 70px;
    background-color: white;
    padding: 0 45px;
    color: #666666;
    .footer-remove {
      color: #999;
      margin: 0 30px 0 20px;
    }

    .footer-number {
      font-weight: bold;
      margin: 0 5px;
    }

    .gray {
      color: #333;
    }

    .blue {
      color: #00c3f5;
    }

    .red {
      color: #e02b41;
    }

    .footer-total {
      margin-right: 35px;
      font-size: 20px;
    }

  }

  .cart-product {
    height: 150px;
    border-top: 1px solid #efefef;
    &:last-child {
      border-bottom: 1px solid #efefef;
    }
  }

  .cart-input {
    width: 140px;
    height: 38px;
    border: 1px solid #efefef;
    border-radius: 4px;
    margin: 0 auto;

    button {
      width: 38px;
      height: 38px;
      text-align: center;
      background-color: transparent;
      border: none;
      font-size: 20px;
      cursor: pointer;
    }

    input {
      width: 58px;
      height: 36px;
      border: none;
      text-align: center;
      border-left: 1px solid #efefef;
      border-right: 1px solid #efefef;
    }
  }
}

.shopcart-empty {
  width: 1240px;
  margin: 10px auto;
  background-color: #fff;
  display: table;
  height: 360px;
  .empty-container {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }

  .empty-left {
    display: inline-block;
    width: 100px;
    height: 114px;
    background: url(../assets/images/shopcart.png) no-repeat;
    margin-right: 30px;
    vertical-align: middle;
  }

  .empty-right {
    display: inline-block;
    vertical-align: middle;
    text-align: left;
  }

  .empty-desc {
    color: #666666;
    font-weight: bold;
    margin-bottom: 15px;
    font-size: 18px;
  }
}
</style>
