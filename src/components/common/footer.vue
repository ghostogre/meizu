<template>
  <footer class="footer">
    <div class="footer-wrapper">
      <div class="clearfix">
        <ul class="fl footer-service">
          <li v-for="(item, index) in serviceLinkData" :key="index">
            <a :href="item.href">
              <img :src="item.icon" alt="">
              {{item.name}}
            </a>
          </li>
        </ul>
        <div class="fr online-service">
          <span>周一至周五 7:30-24:00</span>
          <p>400-788-3333</p>
          <a href="">在线客服</a>
        </div>
      </div>
      <hr class="footer-hr">
      <div class="clearfix">
        <div class="fl">
          <ul class="external-link">
            <li v-for="(item, index) in externalLinkData" :key="index">
              <a :href="item.href">
                {{item.name}}
              </a>
            </li>
          </ul>
          <div class="footer-right">
            2019@
          </div>
        </div>
        <div class="fr subscribe">
          <a href="">
            <i class="icon-font icon-weibo"></i>
          </a>
          <a href="">
            <i class="icon-font icon-weixin"></i>
          </a>
          <a href="">
            <i class="icon-font icon-qqzone"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import axios from 'axios'
export default {
  name: 'myFooter',
  data () {
    return {
      serviceLinkData: [],
      externalLinkData: []
    }
  },
  mounted () {
    this.getServiceLink()
    this.getExternalLink()
  },
  methods: {
    async getServiceLink () {
      const { data } = await axios.get('/api/serviceLink')
      this.serviceLinkData = data
    },
    async getExternalLink () {
      const { data } = await axios.get('/api/externalLink')
      this.externalLinkData = data
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  background-color: white;
  padding: 48px 0 20px;
  border: 1px solid #efefef;
  &-wrapper {
    width: 1240px;
    margin: 0 auto;
  }

  &-service {
    width: 1000px;
    li {
      display: inline-block;
      width: 240px;
      height: 57px;
      font-size: 12px;
      color: #999999;
    }

    img, span {
      vertical-align: middle;
    }
  }

  &-hr {
    margin: 20px 0 28px 0;
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #eee;
  }

  .online-service {
    text-align: right;

    span {
      font-size: 10px;
      color: #999;
    }

    p {
      color: #00c3f5;
      font-size: 30px;
      font-weight: 400;
    }
  }

  .external-link {
    li {
      display: inline-block;
      padding-right: 15px;
      margin-right: 15px;
      border-right: 1px solid #d5d5d5;
      font-size: 12px;
      columns: #999;

      &:last-child {
        border: none;
      }
    }
  }

  &-right {
    padding-top: 6px;
    font-size: 12px;
    color: #999;
  }

  .subscribe {
    margin-top: 18px;

    a {
      color: #999;
      padding-right: 10px;
      margin-right: 10px;
      border-right: 1px solid #eee;

      &:last-child {
        border-right: none;
      }

      &:hover {
        color: #31e5e7;
      }
    }
  }
}

</style>
