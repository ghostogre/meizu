<template>
  <div :class="{'image-wrapper': type === 'small', 'image-wrapper_big': type === 'large'}">
    <img :src="data[activeIndex]" alt="">
    <ul class="imgs">
      <li :class="{'active': activeIndex === index}" class="imgs-item" v-for="(item, index) in data" @click="changeIndex(index)" :key="index">
        <img :src="item" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'imageList',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    type: {
      type: String,
      default: 'small'
    }
  },
  data () {
    return {
      activeIndex: 0
    }
  },
  methods: {
    changeIndex (index) {
      this.activeIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
.image {
  &-wrapper {
    text-align: center;

    img {
      height: 230px;
      margin-top: 20px;
    }

    .imgs {
      overflow: hidden;
      margin: 13px auto 15px;

      &-item {
        display: inline-block;
        height: 40px;
        width: 40px;
        margin: 0 4px;
        border-radius: 4px;
        overflow: hidden;
        border: 1px solid #efefef;
        cursor: pointer;

        &.active {
          border-color: #bdbdbd;
        }

        img {
          width: 40px;
          height: 40px;
          margin: 0;
        }
      }
    }
  }
}

.image {
  &-wrapper_big {
    text-align: center;

    img {
      height: 375px;
      margin: 20px auto;
    }

    .imgs {
      overflow: hidden;
      margin-top: 10px;

      &-item {
        display: inline-block;
        height: 75px;
        width: 75px;
        margin: 0 5px;
        border-radius: 4px;
        overflow: hidden;
        border: 1px solid transparent;
        cursor: pointer;

        &.active {
          border-color: #dcdcdc;
        }

        img {
          width: 75px;
          height: 75px;
          margin: 0;
        }
      }
    }
  }
}
</style>
