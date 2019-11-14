<template>
  <div>
    <m-header></m-header>
    <main class="order">
      <div class="order-item">
        <h1 class="order-title order-title__address">收货人信息</h1>
        <ul class="address-list clearfix">
          <li v-for="(item, index) in addressData" :class="{'active': item.checked}" :key="index" class="fl address-item" @click="checkAddress(item)">
            <div class="clearfix address-title">
              <div class="fl">{{item.name}}</div>
              <div class="fr">{{item.phone}}</div>
            </div>
            <div class="address-info">{{item.province}}{{item.district}}{{item.city}}</div>
            <div class="address-checked" v-show="item.checked">
              <i class="icon-font icon-check address-check"></i>
            </div>
          </li>
          <li class="fl address-item address-add">
            <div class="address-add__icon">+</div>
            <div>添加新地址</div>
          </li>
        </ul>
      </div>
      <div class="order-item">
        <h1 class="order-title">确认订单信息</h1>
        <table class="order-goods">
          <thead>
            <tr>
              <th class="goods-name">商品</th>
              <th class="goods-price">单价</th>
              <th class="goods-number">数量</th>
              <th class="goods-count">小计</th>
              <th class="goods-express">配送方式</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in orderData" :key="index">
              <td class="goods-name">
                <img :src="item.imageUrl" alt="">
                <div class="goods-desc">
                  <p>{{item.goodsName}}</p>
                  <p>{{item.goodsDesc}}</p>
                </div>
              </td>
              <td class="goods-price">￥{{item.goodsPrice}}</td>
              <td class="goods-number">{{item.count}}</td>
              <td class="goods-count">{{item.count * item.goodsPrice}}</td>
              <td v-if="index === 0" :rowspan="orderData.length" class="goods-express">快递配送，运费<span class="red">￥0.00</span></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="order-footer">
                备注：<textarea name="" id="" cols="30" rows="10" placeholder="备注"></textarea>
              </td>
              <td colspan="2" class="footer-total">
                合计：<span class="price">￥{{checkedGoodsPrice}}</span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="order-item clearfix">
        <h1 class="order-title">选择支付方式</h1>
        <div class="order-pay">
          <div class="pay-item clearfix">
            <h1 class="pay-title fl">支付宝</h1>
            <ul class="pay-content fl clearfix">
              <li>
                <input type="radio" name="payMode" value="huabei">
                <img src="../assets/images/banks/huabei.png" alt="">
              </li>
              <li>
                <input type="radio" name="payMode" value="alipay">
                <img src="../assets/images/banks/alipay.png" alt="">
              </li>
            </ul>
          </div>
          <div class="pay-item clearfix">
            <h1 class="pay-title fl">微信</h1>
            <ul class="pay-content fl clearfix">
              <li>
                <input type="radio" name="payMode" value="wechat">
                <img src="../assets/images/banks/wechat.png" alt="">
              </li>
            </ul>
          </div>
          <div class="pay-item clearfix">
            <h1 class="pay-title fl">网上银行</h1>
            <ul class="pay-content fl clearfix pay-bank">
              <li>
                <input type="radio" name="payMode" value="zhongguo">
                <img src="../assets/images/banks/zhongguo.png" alt="">
              </li>
              <li>
                <input type="radio" name="payMode" value="jianshe">
                <img src="../assets/images/banks/jianshe.png" alt="">
              </li>
              <li>
                <input type="radio" name="payMode" value="jiaotong">
                <img src="../assets/images/banks/jiaotong.png" alt="">
              </li>
              <li>
                <input type="radio" name="payMode" value="gongshang">
                <img src="../assets/images/banks/gongshang.png" alt="">
              </li>
              <li>
                <input type="radio" name="payMode" value="nongye">
                <img src="../assets/images/banks/nongye.png" alt="">
              </li>
              <li>
                <input type="radio" name="payMode" value="shanghai">
                <img src="../assets/images/banks/shanghai.png" alt="">
              </li>
              <li>
                <input type="radio" name="payMode" value="xingye">
                <img src="../assets/images/banks/xingye.png" alt="">
              </li>
              <li>
                <input type="radio" name="payMode" value="zhaoshang">
                <img src="../assets/images/banks/zhaoshang.png" alt="">
              </li>
              <li>
                <input type="radio" name="payMode" value="youzheng">
                <img src="../assets/images/banks/youzheng.png" alt="">
              </li>
            </ul>
          </div>
          <ul class="order-total">
            <li class="clearfix">
              <div class="fl">总金额</div>
              <div class="fr">￥{{checkedGoodsPrice}}</div>
            </li>
            <li class="clearfix">
              <div class="fl">运费</div>
              <div class="fr">￥0.00</div>
            </li>
            <li class="order-gap"></li>
            <li class="clearfix">
              <div class="fl">应付</div>
              <div class="fr order-price">￥{{checkedGoodsPrice}}</div>
            </li>
            <li class="order-button">
              <a href="javascript: void(0);" class="btn success" @click="pushOrder">下单并支付</a>
            </li>
          </ul>
        </div>
      </div>
    </main>
    <m-footer></m-footer>

    <v-dialog :show.sync="dialogShow" :confirm-button-show="false" :cancel-button-show="false" :width="360" :height="80">
      <div>
        <i class="icon-font icon-check-circle add-success"></i>成功提交订单
      </div>
      <a class="go-shopcart" href="javascript:void(0);" @click="goToIndex">返回首页</a>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapMutations } from 'vuex'
import mHeader from '../components/common/header'
import mFooter from '../components/common/footer'
import vDialog from '../components/good/dialog'
export default {
  name: 'order',
  components: {
    mHeader,
    mFooter,
    vDialog
  },
  data () {
    return {
      addressData: [],
      payMode: '',
      dialogShow: false
    }
  },
  mounted () {
    this.getAddressData()
  },
  computed: {
    orderData () {
      const data = this.$store.state.shopCartData.filter(item => item.checked)
      return data
    },
    ...mapGetters([
      'checkedGoodsPrice'
    ])
  },
  methods: {
    ...mapMutations([
      'REMOVE_GOODS'
    ]),

    async getAddressData () {
      const { data } = await axios.get('/api/addressData')
      this.addressData = data
    },

    checkAddress (val) {
      this.addressData.forEach(item => {
        item.checked = false
        if (item.id === val.id) {
          item.checked = true
        }
      })
    },

    pushOrder () {
      const date = new Date()
      const address = this.addressData.filter(item => item.checked)[0]
      const data = {
        orderId: date.getTime(),
        address: address,
        orderData: this.orderData,
        price: this.checkedGoodsPrice,
        time: date,
        payMode: this.payMode
      }
      console.log(data)

      this.REMOVE_GOODS()
      this.dialogShow = true
    },

    goToIndex () {
      this.$router.push({ name: 'Index' })
    }
  }
}
</script>

<style lang="scss">
.order {
  width: 1240px;
  margin: 0 auto 60px auto;
  &-item {
    margin-top: 10px;
    padding: 0px 40px 10px;
    background-color: white;
  }

  &-title {
    padding: 20px 0;
    font-size: 18px;
    color: black;
    font-weight: 600;
    text-indent: 10px;
    &__address {
      border-bottom: 1px solid #efefef;
    }
  }

  .address-list {
    margin-top: 30px;
    padding-left: 12px;

    .address-item {
      width: 275px;
      height: 144px;
      position: relative;
      margin: 0 12px 30px 0;
      border: 1px solid #efefef;
      padding: 15px;
      transition: border-color .8s ease-in-out;
      cursor: pointer;
      &:hover, &.active {
        border-color: #00c3f5;
      }
    }

    .address-title {
      font-size: 12px;
      color: black;
      font-weight: bold;
      line-height: 40px;
      border-bottom: 1px solid #efefef;
    }

    .address-info {
      font-size: 12px;
      padding-top: 10px;
      word-break: break-all;
      word-wrap: break-word;
    }

    .address-checked {
      position: absolute;
      width: 0;
      height: 0;
      right: 0;
      bottom: 0;
      border-right: 30px solid #00c3f5;
      border-top: 30px solid transparent;
    }

    .address-check {
      position: absolute;
      right: -30px;
      color: white;
      bottom: 4px;
      font-size: 12px;
    }

    .address-add {
      text-align: center;
      transition: color .2s;
      &:hover {
        color: #00c3f5;
      }

      &__icon {
        font-size: 30px;
        margin-top: 30px;
        margin-bottom: 10px;
        line-height: 1;
      }
    }
  }

  .order-goods {
    border: 1px solid #efefef;

    thead {
      tr {
        height: 63px;
        border-bottom: 1px solid #efefef;
      }

      .goods-number, .goods-count, .goods-express {
        font-size: 18px;
        color: black;
      }

      .goods-name {
        font-size: 12px;
        font-weight: 400;
        color: #666;
      }
    }

    tbody tr {
      border-bottom: 1px solid #efefef;
    }

    tfoot tr {
      background-color: #f5f5f5;
    }

    .goods-name {
      width: 438px;
      padding-left: 10px;
      text-align: left;
      cursor: pointer;

      img {
        width: 120px;
        height: 120px;
        vertical-align: middle;
      }

      .goods-desc {
        display: inline-block;
        vertical-align: middle;
        font-size: 16px;
      }
    }

    .goods-price {
      width: 225px;
      font-weight: bold;
      text-align: center;
      font-size: 18px;
      color: black;
    }

    .goods-number {
      width: 139px;
      font-weight: bold;
      text-align: center;
    }

    .goods-count {
      width: 173px;
      text-align: right;
      font-weight: bold;
      padding-right: 20px;
      color: #e02b41;
      font-size: 18px;
    }

    .goods-express {
      width: 184px;
      text-align: center;
      color: #999;
      border-left: 1px solid #efefef;
      .red {
        color: #e02b41;
        font-weight: bold;
      }
    }

    .order-footer {
      padding: 15px 20px;
      font-size: 12px;

      textarea {
        width: 552px;
        height: 48px;
        border: 1px solid #efefef;
        padding: 5px;
        outline: 0;
        resize: none;
        background-color: white;
        margin-left: 5px;
        vertical-align: middle;
      }
    }

    .footer-total {
      text-align: right;
      color: #e02b41;
      padding: 15px 20px;
      font-weight: bold;

      .price {
        font-size: 22px;
      }
    }
  }

  .order-pay {
    padding: 40px 26px 14px;
    border: 1px solid #efefef;

    .pay-item {
      margin-bottom: 26px;
    }

    .pay-title {
      width: 60px;
      color: #333333;
      line-height: 40px;
      font-size: 14px;
      margin: 0 20px 0 0;
    }

    .pay-content {
      li {
        float: left;
        margin-left: 40px;
        margin-bottom: 30px;
      }

      input {
        vertical-align: middle;
      }

      img {
        vertical-align: middle;
        margin-left: 20px;
      }
    }

    .pay-bank {
      width: 1020px;
    }
  }

  .order-total {
    width: 318px;
    float: right;
    margin-top: 30px;
    margin-bottom: 20px;

    li {
      margin-bottom: 20px;
    }

    .order-price {
      color: #e02b41;
      font-size: 20px;
    }

    .order-button {
      text-align: right;
    }

    .order-gap {
      height: 1px;
      background-color: #efefef;
    }
  }
}

.add-success {
  color: #00c3f5;
  margin-right: 5px;
}

.go-shopcart {
  color: #00c3f5;
  text-decoration: underline;
}
</style>
