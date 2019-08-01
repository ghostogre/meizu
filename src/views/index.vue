<template>
  <div>
    <i-header></i-header>
    <div class="swiper">
      <!-- 轮播图 -->
      <swiper :data="swiperData"></swiper>
      <ul class="menus">
        <li v-for="(item, index) in menuData" :key="index">
          <a :href="item.href">
            {{item.name}}
          </a>
        </li>
      </ul>
    </div>
    <ul class="post-wrapper">
      <!-- 广告 -->
      <li v-for="(item, index) in postData" :key="index">
        <a :href="item.href">
          <img :src="item.imgUrl" alt="">
        </a>
      </li>
    </ul>
    <div class="index-container">
      <!-- 展示区 -->
      <div class="sale">
        <h3 class="title">热卖商品</h3>
        <goods-list :data="hotSaleData"></goods-list>
      </div>
      <div class="sale">
        <h3 class="title">手机</h3>
        <ad-list :data="phoneData"></ad-list>
        <goods-list :data="phoneSaleData"></goods-list>
      </div>
      <div class="sale">
        <h3 class="title">智能配件</h3>
        <ad-list :data="smartAdData"></ad-list>
        <goods-list :data="smartSaleData"></goods-list>
      </div>
    </div>
    <div class="footer">
      <!-- 顶部 -->
      <my-footer></my-footer>
    </div>
  </div>
</template>

<script>
import iHeader from '@/components/common/header'
import swiper from '@/components/common/swiper'
import goodsList from '@/components/good/goodsList'
import adList from '@/components/good/adList'
import myFooter from '@/components/common/footer'
import axios from 'axios'
export default {
  name: 'Index',
  components: {
    iHeader,
    swiper,
    adList,
    goodsList,
    myFooter
  },
  data () {
    return {
      swiperData: [],
      menuData: [],
      postData: [],
      hotSaleData: [],
      phoneSaleData: [],
      smartSaleData: [],
      phoneData: [],
      smartAdData: []
    }
  },
  mounted () {
    this.getSwiperData()
    this.getMenuData()
    this.getPostData()
    this.getHotSaleData()
    this.getPhoneSaleData()
    this.getSmartSaleData()
    this.getPhoneAdData()
    this.getSmartAdData()
  },
  methods: {
    async getSwiperData () {
      const { data } = await axios.get('/api/advertise')
      this.swiperData = data
    },
    async getMenuData () {
      const { data } = await axios.get('/api/menu')
      this.menuData = data
    },
    async getPostData () {
      const { data } = await axios.get('/api/post')
      this.postData = data
    },
    async getHotSaleData () {
      const { data } = await axios.get('/api/hotSale')
      this.hotSaleData = data
    },
    async getPhoneSaleData () {
      const { data } = await axios.get('/api/phoneSale')
      this.phoneSaleData = data
    },
    async getSmartSaleData () {
      const { data } = await axios.get('/api/smartSale')
      this.smartSaleData = data
    },
    async getPhoneAdData () {
      const { data } = await axios.get('/api/phoneRecommend')
      this.phoneData = data
    },
    async getSmartAdData () {
      const { data } = await axios.get('/api/smartRecommend')
      this.smartAdData = data
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  width: 1240px;
  height: 500px;
  position: relative;
  margin: 0 auto;
}

.menus {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 303px;
  background-color: rgba(0, 0, 0, .5);
  padding-top: 17px;
  li {
    height: 57px;
    line-height: 57px;
  }

  a {
    font-size: 16px;
    padding-left: 40px;
    color: #fff;
    transition: color .3s;

    &:hover {
      color: #31a5e7;
    }
  }
}

.post-wrapper {
  width: 1240px;
  overflow: hidden;
  margin: 10px auto 50px auto;
  li {
    float: left;
    width: 303px;
    height: 180px;
    margin-right: 9px;

    a {
      transition: opacity .3s ease-in-out;
      &:hover {
        opacity: .85;
      }
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

.index-container {
  width: 1240px;
  margin: 0 auto;

  .title {
    font-size: 30px;
    font-weight: 400;
    margin-bottom: 10px;
  }

  .sale {
    margin-bottom: 50px;
  }
}
</style>
