<template>
  <div class="recommend">
    <div class="clearfix recommend-header">
      <h3 class="fl recommend-title">推荐商品</h3>
      <div class="fr">
        <i class="icon-font icon-left pagination-icon" :class="{'disabled': this.activeIndex === 0}" @click="prev"></i>
        <i class="icon-font icon-right pagination-icon" :class="{'disabled': this.activeIndex === this.pageSize}" @click="next"></i>
      </div>
    </div>
    <div class="recommend-content">
      <ul v-if="data.length > 0" class="clearfix" :style="listWrapper">
        <li :class="{'last-child': (index + 1) % 4 === 0}" class="goods-list" v-for="(item, index) in data" :key="index">
          <a :href="item.href">
            <img :src="item.goodsUrl" alt="">
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'recommend-list',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      activeIndex: 0
    }
  },
  computed: {
    listWrapper () {
      return {
        width: `${(this.data.length) * 250}px`,
        transform: `translate(-${this.activeIndex * 1240}px)`,
        transitionDuration: '.3s'
      }
    },
    pageSize () {
      return Math.floor(this.data.length / 5)
    }
  },
  methods: {
    prev () {
      if (this.activeIndex !== 0) {
        this.activeIndex -= 1
      }
    },
    next () {
      if (this.activeIndex !== this.pageSize) {
        this.activeIndex += 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.recommend {
  &-header {
    margin: 30px auto 10px;
  }

  &-title {
    font-size: 30px;
    font-weight: 400;
  }

  .pagination-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    cursor: pointer;
    color: #00c3f5;
    font-size: 12px;
    border: 1px solid #00c3f5;
    text-align: center;
    line-height: 24px;
    &.disabled {
      color: #efefef;
      border-color: #dcdcdc;
    }
  }
}

.recommend-content {
  width: 1240px;
  background-color: white;
  overflow: hidden;
  .goods {
    &-list {
        float: left;
        width: 220px;
        margin: 0 15px;
        background-color: white;
        cursor: pointer;
        transition: all .3s ease;
        position: relative;
        overflow: hidden;
        text-align: center;
        padding: 34px 15px;

        &.last-child {
          margin-right: 0;
        }

        img {
          height: 180px;

          &:hover {
            transform: scale(1.2);
            transition: all .3s;
          }
        }
    }

    &-name {
        margin-top: 20px;
        margin-bottom: 2px;
        color: #555757;
        font-size: 16px;
    }

    &-desc {
        font-size: 12px;
        color: #999;
    }

    &-price {
        display: inline-block;
        position: relative;
        padding-left: 14px;
        font-size: 16px;
        color: #c00;
        margin-top: 8px;

        i {
            font-style: normal;
            font-size: 12px;
            position: absolute;
            left: 0;
            top: 2px;
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
}

</style>
