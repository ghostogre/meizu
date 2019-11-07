<template>
  <div>
    <v-header></v-header>
    <div v-if="shopCartData.length > 0" class="shopCart-wrapper">
      <table class="shopCart-header">
        <tr>
          <td class="cart-select">
            <input type="checkbox" :checked="isAllChecked" @click="checkAllGoods(isAllChecked)" class="cart-checkbox">
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
              <input type="checkbox" v-model="item.checked" class="cart-checkbox" @click="check(item.id)">
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
              <i class="icon-font icon-close" @click="handleDelete(item.id)"></i>
            </td>
          </tr>
        </table>
      </div>
      <div class="clearfix shopcart-footer">
        <div class="fl">
          <input type="checkbox" :checked="isAllChecked" @click="checkAllGoods(isAllChecked)" class="cart-checkbox">
          <span>全选</span>
          <span class="footer-remove">删除选中的商品</span>
          <span>共<span class="footer-number gray">{{shopCartTotal}}</span>件商品，已选<span class="footer-number blue">{{checkedGoodsTotal}}</span>件商品</span>
        </div>
        <div class="fr">
          <span>已优惠<span class="footer-number red">1</span>元，合计（不含运费）: <span class="footer-number red footer-total">￥{{checkedGoodsPrice}}</span></span>
          <a href="javascript: void(0);" class="btn success" :class="{'cancel': checkedGoodsTotal === 0}" @click="goToOrder">去结算</a>
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

    <v-dialog :show.sync="isShow" title="提示" :width="500" @confirm="confirmDelete">
      <div style="height: 120px;line-height: 120px;">您确定删除该商品吗？</div>
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import vHeader from '../components/common/header'
import vFooter from '../components/common/footer'
import vDialog from '../components/good/dialog'
export default {
  components: {
    vHeader,
    vFooter,
    vDialog
  },
  computed: {
    ...mapGetters([
      'shopCartData',
      'isAllChecked',
      'shopCartTotal',
      'checkedGoodsTotal',
      'checkedGoodsPrice'
    ])
  },
  data () {
    return {
      isShow: false,
      currentId: null
    }
  },
  methods: {
    goToIndex () {
      this.$router.push({
        name: 'index'
      })
    },
    ...mapMutations({
      increase: 'INCREASE_SHOPCART',
      reduce: 'REDUCE_SHOPCART',
      check: 'CHECK_GOODS',
      checkAllGoods: 'CHECK_ALL_GOODS',
      deleteGood: 'DEL_SHOPCART'
    }),
    handleDelete (id) {
      this.isShow = true
      this.currentId = id
    },
    confirmDelete () {
      this.deleteGood(this.currentId)
      this.isShow = false
    },
    goToOrder () {
      this.$router.push({
        path: '/order'
      })
    }
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

.cancel {
  color: #999;
  border-color: #efefef;
  background-color: #efefef;
  transition: all .2s ease-in-out;
  &:hover {
    border-color: #f6f6f6;
    background-color: #f6f6f6;
  }
}
</style>
