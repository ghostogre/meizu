<template>
  <div class="avatar-wrapper">
    <div class="pic" @mousemove="overImage" @mouseleave="mouseLeave">
      <div class="lazy-img">
        <img src="./bg-single.png" alt="">
      </div>
      <div class="cpm" :class="{ 'show': this.showCover }">
        <div class="cover" :style="maskStyle"></div>
        <div class="progress-bar"><span :style="progressStyle"></span></div>
      </div>
      <div class="mask-video" :class="{ 'show': this.showCover }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pilipili',
  data () {
    return {
      lengthX: 20,
      width: 203,
      height: 360,
      percentage: 0,
      imageNumber: 83, // 83张图片
      mult: require('./bg-mult.png'),
      showCover: false
    }
  },
  computed: {
    progressStyle () {
      return {
        width: `${Math.floor(this.percentage * 100)}%`
      }
    },
    maskStyle () {
      const i = Math.floor(this.percentage * this.imageNumber)
      const x = -i % this.lengthX * this.width
      const y = -Math.floor(i / this.lengthX) * this.height
      const size = this.width * this.lengthX
      return {
        backgroundImage: `url(${this.mult})`,
        backgroundPosition: `${x}px ${y}px`,
        backgroundSize: `${size}px`
      }
    }
  },
  methods: {
    overImage (e) {
      let offsetX = e.offsetX
      this.showCover = true
      this.percentage = offsetX / this.width
    },
    mouseLeave () {
      this.percentage = 0
      this.showCover = false
    }
  }
}
</script>

<style lang="scss">
.pic {
  position: relative;
  width: 203px;
  height: 370px;
  display: block;
  overflow: hidden;
  text-align: center;
  border-radius: 4px;
  img {
    margin: 0 auto;
    outline: 0;
  }

  .cpm {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity .3s;
    .cover {
      position: absolute;
      top: 7px;
      left: 0;
      height: 360px;
      width: 100%;
      margin-top: 2px;
    }
  }

  .progress-bar {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 10px;
    border-color: black;
    border-style: solid;
    border-width: 4px 8px;
    background: #444;
    box-sizing: border-box;
    span {
      display: block;
      background: white;
      height: 2px;
    }
  }

  .mask-video {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .2);
    transition: opacity .3s;
  }

  .show {
    opacity: 1;
  }
}
</style>
