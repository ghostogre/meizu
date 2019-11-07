<template>
  <div class="bg-white">
    <v-header></v-header>
    <div class="detail-wrapper">
      <div class="bread">
        <span>首页</span>
        <span class="arrow">></span>
        <span>全部</span>
        <span class="arrow">></span>
        <span class="last-bread">手机</span>
      </div>
      <div class="clearfix">
        <div class="fl">
          <image-list :data="infoData.colorImageUrls" type="large"></image-list>
        </div>
        <div class="fl detail-props">
          <h1 class="props-title">{{infoData.goodsName}}</h1>
          <p class="props-desc">{{infoData.goodsDesc}}</p>
          <div class="prop-sale">
            <span class="prop-name">价<span class="prop-space"></span>格:</span>
            <span class="prop-price">￥{{infoData.goodsPrice}}</span>
          </div>
          <div>
            <span class="prop-name">支<span class="prop-space"></span>持:</span>
            <ul class="service-list">
              <li class="list-item"><i class="icon-font icon-check-circle"></i>百城速达</li>
              <li class="list-item"><i class="icon-font icon-check-circle"></i>顺丰包邮</li>
              <li class="list-item"><i class="icon-font icon-check-circle"></i>七天无理由退货</li>
            </ul>
          </div>
          <div>
            <span class="prop-name">服<span class="prop-space"></span>务:</span>
            <span>本商品由魅族负责发货并提供售后服务</span>
          </div>
          <div>
            <span class="prop-name">数<span class="prop-space"></span>量:</span>
            <div class="clearfix prop-number">
              <input class="fl prop-input" v-model="purchaseQuality" type="number">
              <div class="fl change-box">
                <div class="change-value" @click="increase">+</div>
                <div class="change-value" @click="reduce">-</div>
              </div>
            </div>
          </div>
          <div class="prop-buy">
            <a href="javascript: void(0);" class="btn danger mr20" @click="purchase">立即购买</a>
            <a href="javascript: void(0);" class="btn success" @click="addShopCart">加入购物车</a>
          </div>
        </div>
      </div>
      <div class="detail-info__wrapper">
        <div class="detail-info">
          <a href="javascript: void(0);" class="info-title">商品详情</a>
        </div>
        <img v-for="(item, index) in infoData.information" :key="index" class="detail-images" :src="item" alt="">
      </div>
    </div>
    <v-footer></v-footer>

    <v-dialog :show.sync="dialogShow" :confirm-button-show="false" :cancel-button-show="false" :width="360" :height="80">
      <div>
        <i class="icon-font icon-check-circle add-success"></i>加入购物车
      </div>
      <a class="go-shopcart" href="javascript:void(0);" @click="goToShopcart">进入购物车</a>
    </v-dialog>
  </div>
</template>

<script>
import vFooter from '../components/common/footer'
import vHeader from '../components/common/header'
import imageList from '../components/common/imageList'
import vDialog from '../components/good/dialog'
import axios from 'axios'
export default {
  name: 'detail',
  components: {
    vFooter,
    vHeader,
    imageList,
    vDialog
  },
  data () {
    return {
      infoData: {},
      purchaseQuality: 1,
      dialogShow: false
    }
  },
  mounted () {
    this.getDetail(this.$route.params)
  },
  methods: {
    async getDetail ({ id }) {
      const { data } = await axios.get(`/api/categoryList/${id}`)
      this.infoData = data
    },
    // 增加
    increase () {
      this.purchaseQuality = parseInt(this.purchaseQuality) + 1
    },
    // 减少
    reduce () {
      if (this.purchaseQuality > 1) {
        this.purchaseQuality = parseInt(this.purchaseQuality) - 1
      }
    },
    addShopCart () {
      this.$store.commit('ADD_SHOPCART', {
        data: this.infoData,
        num: parseInt(this.purchaseQuality)
      })
      this.dialogShow = true
    },
    purchase () {
      this.$store.commit('ADD_SHOPCART', {
        data: this.infoData,
        num: parseInt(this.purchaseQuality)
      })
      this.goToShopcart()
    },
    goToShopcart () {
      this.$router.push({
        name: 'cart'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-white {
  background-color: white;
}

.bread {
  height: 40px;
  line-height: 40px;

  .arrow, .last-bread {
    color: #999;
  }
}

.detail-wrapper {
  width: 1240px;
  margin: 0 auto;
}

.detail-props {
  width: 675px;
  font-size: 12px;
  .props-title {
    font-size: 24px;
    font-weight: 400;
    color: #000;
    margin-bottom: 10px;
  }

  .props-desc {
    font-size: 16px;
    color: #e22841;
    margin-bottom: 15px;
  }

  .prop-name {
    padding: 0 10px;
    line-height: 34px;

    .prop-space {
      padding: 0 12px;
    }
  }

  .prop-sale {
    height: 55px;
    background-color: #f5f5f5;
    margin-bottom: 26px;

    .prop-price {
      font-size: 24px;
      color: #e02b41;
      line-height: 55px;
    }
  }

  .service-list {
    display: inline-block;
    .list-item {
      display: inline-block;
      margin-right: 20px;

      i {
        margin-right: 5px;
        color: #00c3f5;
      }
    }
  }

  .prop-number {
    display: inline-block;
    vertical-align: middle;

    .prop-input {
      width: 53px;
      height: 38px;
      line-height: 38px;
      border: 1px solid #dcdcdc;
      color: #333;
      text-align: center;
    }

    .change-box {
      margin-left: 6px;
    }

    .change-value {
      width: 20px;
      height: 16px;
      font-size: 14px;
      color: #666666;
      border: 1px solid #dcdcdc;
      cursor: pointer;
      line-height: 14px;
      text-align: center;

      &:last-child {
        margin-top: 6px;
      }
    }
  }

  .prop-buy {
    margin-top: 17px;
  }

  .mr20 {
    margin-right: 20px;
  }
}

.detail-info__wrapper {
  font-size: 0;
  margin-top: 60px;
  margin-bottom: 80px;
  .detail-info {
    height: 62px;
    border-bottom: 1px solid #dcdcdc;
  }

  .info-title {
    font-size: 16px;
    height: 62px;
    line-height: 62px;
    color: #00c3f5;
    border-bottom: 1px solid #00c3f5;
    padding: 0 20px;
    margin-bottom: -1px;
    box-sizing: border-box;
    display: inline-block;
  }

  .detail-images {
    width: 1240px;
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
