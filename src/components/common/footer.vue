<template>
  <footer class="footer">
    <div class="footer-wrapper">
      <div>
        <ul>
          <li v-for="(item, index) in serviceLinkData" :key="index">
            <a :href="item.href">
              <img :src="item.icon" alt="">
              {{item.name}}
            </a>
          </li>
        </ul>
        <div>
          <span>周一至周五 7:30-24:00</span>
          <p>400-788-3333</p>
          <a href="">在线客服</a>
        </div>
      </div>
      <hr>
      <div>
        <div>
          <ul>
            <li v-for="(item, index) in externalLinkData" :key="index">
              <a :href="item.href">
                {{item.name}}
              </a>
            </li>
          </ul>
          <div></div>
        </div>
        <div>
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
}

</style>
