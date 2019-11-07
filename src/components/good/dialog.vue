<template>
  <transition name="dialog">
    <div class="dialog-mask" v-show="show">
      <div class="dialog-box">
        <div class="dialog-wrapper" :style="dialogBox">
          <div class="dialog-header" :class="{'dialog-title': title !== ''}">
            {{title}}
            <i class="icon-font icon-close dialog-close" @click="close"></i>
          </div>
          <div class="dialog-content" :style="dialogContent">
            <slot></slot>
          </div>
          <div class="dialog-footer" v-if="confirmButtonShow || cancelButtnShow">
            <div v-show="confirmButtonShow" class="btn success mr20 wd100" @click="confirm">{{confirmButtonText}}</div>
            <div v-show="cancelButtonShow" class="btn cancel wd100" @click="cancel">{{cancelButtonText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'vDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 760
    },
    height: {
      type: Number,
      default: 280
    },
    title: {
      type: String,
      default: ''
    },
    confirmButtonShow: {
      type: Boolean,
      default: false
    },
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    }
  },
  computed: {
    dialogBox () {
      return {
        width: `${this.width}px`
      }
    },
    dialogContent () {
      return {
        height: `${this.height}px`
      }
    }
  },
  methods: {
    close () {
      // .sync 其实是一个缩写 @update:show=”val=>show=val”语法糖。
      this.$emit('update:show', false)
    },
    confirm () {
      this.$emit('confirm')
    },
    cancel () {
      this.$emit('cancel')
      this.$emit('update:show', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(153, 153, 153, 0.6);
  display: table;

  .dialog-box {
    display: table-cell;
    vertical-align: middle;
  }

  .dialog-wrapper {
    margin: 0 auto;
    background-color: white;
    text-align: center;
  }

  .dialog-header {
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 4px 4px 0 0;
    position: relative;
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }

  .dialog-title {
    border-bottom: 1px solid #efefef;
  }

  .dialog-close {
    position: absolute;
    right: 26px;
    top: 16px;
    color: #bdbdbd;
  }

  .dialog-footer {
    padding-bottom: 20px;
  }

  .mr20 {
    margin-right: 20px;
  }

  .wd100 {
    width: 100px;
  }
}

.dialog-enter-active {
  transition: opacity 0.2s;
}

.dialog-enter {
  opacity: 0;
}
</style>
