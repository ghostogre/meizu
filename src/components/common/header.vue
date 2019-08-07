<template>
  <header class="header">
    <div class="header-wrapper clearfix">
      <div class="header-logo fl"></div>
      <div class="header-cart fr">
        <span class="icon-moon icon-cart"></span>
      </div>
      <div class="header-user fr">
        <span class="icon-moon icon-user"></span>
      </div>
      <div class="header-search fr">
        <input type="text" class="header-search--input" placeholder="购物车">
        <span class="icon-moon icon-search header-search--icon"></span>
      </div>
      <ul class="header-nav fr">
        <template v-for="(item, index) in navData">
          <li :key="index" @mouseenter="showChildren(item)">
            <a class="nav-item" href="javascript: void(0);" @click="goToCategory">{{item.name}}</a>
          </li>
        </template>
      </ul>
    </div>
    <transition name="nav">
      <div class="nav-children" v-show="childrenShow" @mouseleave="hiddenChildren">
        <div class="children-wrapper">
          <transition-group tag="ul" @enter="enter">
            <template v-for="(item, index) in childrenData">
              <li :key="item.pic" class="children-item" :data-index="index">
                <img :src="item.pic" alt="">
                <p>{{item.name}}</p>
                <p>{{item.price}}</p>
              </li>
            </template>
          </transition-group>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
import axios from 'axios'
import velocity from 'velocity-animate'

export default {
  name: 'iHeader',
  data () {
    return {
      navData: [],
      childrenData: [],
      childrenShow: false
    }
  },
  mounted () {
    this.getNavData()
  },
  methods: {
    async getNavData () {
      const { data } = await axios.get('/api/nav')
      this.navData = data
    },
    showChildren (item) {
      this.childrenData = item.children
      this.childrenShow = true
    },
    hiddenChildren () {
      this.childrenShow = false
      this.childrenData = []
    },
    enter (el) {
      const timeOut = el.dataset.index * 150
      setTimeout(() => {
        velocity(el, {
          'opacity': 1,
          'translateX': '-50px'
        })
      }, timeOut)
    },
    goToCategory () {
      this.$router.push({ name: 'category' })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  position: relative;
  background-color: white;
  &-wrapper {
    width: 1240px;
    margin: 0 auto;
  }
  &-logo {
    width: 140px;
    height: 26px;
    margin: 28px 0;
    background: url("../../assets/images/logo.png") no-repeat center;
  }

  &-cart, &-user {
    padding: 29px 10px 0 20px;
    font-size: 24px;
    cursor: pointer;
    line-height: 1;
  }

  &-search {
    width: 172px;
    height: 32px;
    border: 1px solid #dddddd;
    border-radius: 2px;
    position: relative;
    margin: 25px 0;

    &--input {
      width: 127px;
      height: 20px;
      border: none;
      outline: none;
      position: absolute;
      font-size: 12px;
      left: 5px;
      top: 6px;
    }

    &--icon {
      position: absolute;
      top: 8px;
      right: 10px;
      font-size: 16px;
    }
  }

  &-nav {
    li {
      display: inline-block;
    }

    a.nav-item {
      display: inline-block;
      padding: 33px 20px;
      font-size: 16px;
      line-height: 1;
      cursor: pointer;
      transition: color .1s ease;

      &:hover {
        color: #31a5e7;
      }
    }
  }
}

.nav-children {
  width: 100%;
  height: 156px;
  position: absolute;
  top: 82px;
  left: 0;
  background-color: white;
  border-bottom: 1px solid #e9e9e9;
  z-index: 1;
  .children-wrapper {
    width: 1240px;
    padding-left: 150px;
    margin: 0 auto;
  }

  .children-item {
    width: 136px;
    height: 145px;
    display: inline-block;
    text-align: center;
    font-size: 12px;
    color: #666;
    opacity: 0;
  }

  img {
    width: 100px;
    height: 100px;
  }
}

.nav-enter {
  height: 1px;
  &-active {
    height: 156px;
    transition: height .3s ease-in-out;
  }
}

</style>
