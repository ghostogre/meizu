<template>
  <div class="container">
    <div>
      <i class="logo left"></i>
      <span class="vs-text">VS</span>
      <i class="logo right"></i>
    </div>
    <div class="vs-wrapper">
      <div class="vs-bar team-vs-bar">
        <!-- 左右比分条必须左右浮动，这样才能在点击 -->
        <div class="bar-left" :style="leftWidth">
          <a href="javascript: void(0);" class="btn btn-left">
            <div class="item" @click="addLeft"></div>
          </a>
          <div class="num-wrap">
            <div class="num-inline"><span>{{leftNum}}</span><i v-if="leftIncrease">+1</i></div>
          </div>
        </div>
        <div class="bar-right" :style="rightWidth">
          <a href="javascript: void(0);" class="btn btn-right">
            <div class="item" @click="addRight"></div>
          </a>
          <div class="num-wrap">
            <div class="num-inline"><i v-if="rightIncrease">+1</i><span>{{rightNum}}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'css3animate',
  data () {
    return {
      leftNum: 5,
      rightNum: 5,
      leftIncrease: false,
      rightIncrease: false
    }
  },
  computed: {
    totalNum () {
      return this.leftNum + this.rightNum
    },
    leftWidth () {
      if (this.leftNum === this.rightNum) { // 主要是为了防止两边都是0的情况
        return {
          width: '50%'
        }
      }
      return {
        width: `${((this.leftNum / this.totalNum).toFixed(5) * 100)}%`
      }
    },
    rightWidth () {
      if (this.leftNum === this.rightNum) { // 主要是为了防止两边都是0的情况
        return {
          width: '50%'
        }
      }
      return {
        width: `${((1 - (this.leftNum / this.totalNum).toFixed(5)) * 100)}%`
      }
    }
  },
  methods: {
    addLeft () {
      this.leftIncrease = false
      this.leftNum++
      setTimeout(() => {
        this.leftIncrease = true
      }, 0)
    },
    addRight () {
      this.rightIncrease = false
      this.rightNum++
      setTimeout(() => {
        this.rightIncrease = true
      }, 0)
    }
  }
}
</script>

<style lang="scss">
.container {
  text-align: center;
  margin-top: 30px;
}

.logo {
  width: 25px;
  height: 25px;
  display: inline-block;
  vertical-align: middle;
}

.vs-text {
  font-weight: 600;
  color: grey;
  font-size: 32px;
  padding: 0 20px;
  vertical-align: middle;
}

.vs-wrapper {
  margin-top: 200px;
  padding-top: 4px;
  background: #f5f5f5;
}

.team-vs-bar {
  width: 100%;
  height: 40px;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 1;
  color: white;
  position: relative;
  .bar-left {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    line-height: 40px;
    background-color: #ee3bbe;
    transition: width .5s ease-in;
    &:after {
      content: "";
      position: absolute;
      right: -20px;
      top: 0px;
      width: 0;
      height: 0;
      z-index: 1;
      border-left: 20px solid transparent;
      border-top: 20px solid #ee3bbe;
      border-right: 20px solid transparent;
      border-bottom: 20px solid transparent;
    }

    .num-wrap {
      padding-left: 40px;
      text-align: left;
    }

    i {
      right: -25px;
    }
  }

  .bar-right {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    line-height: 40px;
    background-color: #3753cc;
    transition: width .5s ease-in;
    &:after {
      content: "";
      position: absolute;
      left: -20px;
      top: 0px;
      width: 0;
      height: 0;
      border-left: 20px solid transparent;
      border-top: 20px solid transparent;
      border-right: 20px solid transparent;
      border-bottom: 20px solid #3753cc;
    }

    .num-wrap {
      padding-right: 40px;
      text-align: right;
    }

    i {
      left: -25px;
    }
  }

  .num-inline {
    display: inline-block;
    position: relative;
    i {
      position: absolute;
      z-index: 2;
      width: 20px;
      opacity: 0;
      top: 0;
      animation: num-plus 1s ease-in-out;
      vertical-align: top;
    }

    span {
      display: inline-block;
      max-width: 90px;
      letter-spacing: 1px;
      word-break: break-all;
    }
  }

  .btn {
    border: none;
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    &-left {
      left: 0;
      position: absolute;
      .item {
        left: 17px;
      }
    }

    &-right {
      position: absolute;
      right: 0;
      .item {
        right: 17px;
        transform: rotateY(180deg);
      }
    }

    .item {
      position: absolute;
      top: 12px;
      height: 14px;
      width: 14px;
      overflow: hidden;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAdCAYAAAC9pNwMAAAAAXNSR0IArs4c6QAAAb5JREFUSA3FlslKw1AYhRtHFBzAhQiCICi4VnDjhOALCC7EZ+gTiDsfQBBfwI24cVEUNwVFoUvFjQpaFQUriANKnait399amiY3aZpm+OEjN+fee87NzUAiEZeVy+U6YBXScA9RqHNp53waIWuQhWK90ph07uBiJAEtkCom6o6ymDYnlm63phtz1dwp9B4/gwcwb1QEDKK1K3STpFq1aZBCGEVrVegNaE0K3SS5DZ7BqdnkVhCyFnqZXHUwD88cDkNlLqWTR5ofpVOPWoT2QQKsKk5Hr0dxBRsMuyBmlfivL3G0ugXVrQcjeWfHYR3s6onOYafumgxkwjSHWdC/n4ucX8EOjEAn2NUznQn4Artn543+FQldgBsw1gSCXK0fta3hmmQF/WCsMYQjeId6Y2eN55+yJarQGn0rTk/a3YuKs2sYsBVGsHzZYmEEnxF8HkbwBsHfYQTHNU3LBB18zNXegu0XRvq9rl0MX8Q0yCvOkLfPNssnNdDgE/KuJVQqyCveIy+VTw0w+JesA7Y5rQ+Wvfe77gi41IfIVm/qBZ/ap/he6L3ldzQKDzAP8jOe/zng6EX9YHIIy/LR0Bv+ATSEcRN3tjd8AAAAAElFTkSuQmCC) no-repeat;
      background-size: contain;
    }
  }

}

@keyframes num-plus {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50%, 60% {
    transform: scale(1);
    opacity: 1;
  }
  80% {
    opacity: 0;
    transform: scale(1.4);
  }
}

.left {
  animation: team-logo-left 1s;
  // background:bg-color bg-image position/bg-size bg-repeat bg-origin bg-clip bg-attachment initial|inherit;
  // background-size是CSS3的属性?
  // 合并写法写入fixed 会使得size和position不起作用?
  background: url(../../assets/images/ml.png) 0 0 / 100% 100% no-repeat;
}

.right {
  animation: team-logo-right 1s;
  background: url(../../assets/images/lwp.png) 0 0 / 100% 100% no-repeat;
}

@keyframes team-logo-left {
  0% {
    transform: translate3d(-145px, 0, 0) scale(2);
    transform-origin: center;
    transition-timing-function: ease-out;
    opacity: .05;
  }

  50%, 60% {
    transform: translate3d(27px, 0, 0) scale(2);
    transform-origin: center;
    transition-timing-function: cubic-bezier(.33, .95, .77, 1.01);
    opacity: .8;
  }

  85% {
    transform: translate3d(-10px, 0, 0) scale(1);
    transform-origin: center;
    transition-timing-function: ease-in;
    opacity: 1;
  }

  100% {
    transform: translate3d(0, 0, 0) scale(1);
    transform-origin: center;
    opacity: 1;
  }
}

@keyframes team-logo-right {
  0% {
    transform: translate3d(145px, 0, 0) scale(2);
    transform-origin: center;
    transition-timing-function: ease-out;
    opacity: .05s;
  }

  50%, 60% {
    transform: translate3d(-27px, 0, 0) scale(2);
    transform-origin: center;
    transition-timing-function: cubic-bezier(.33, .95, .77, 1.01);
    opacity: .8;
  }

  85% {
    transform: translate3d(10px, 0, 0) scale(1);
    transform-origin: center;
    transition-timing-function: ease-in;
    opacity: 1;
  }

  100% {
    transform: translate3d(0, 0, 0) scale(1);
    transform-origin: center;
    opacity: 1;
  }
}
</style>
