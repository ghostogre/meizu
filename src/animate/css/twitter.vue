<template>
  <div class="heart-animation" @click="star" :class="{'link-active': stared}"></div>
</template>

<script>
export default {
  name: 'twitter',
  data () {
    return {
      stared: false
    }
  },
  methods: {
    star () {
      this.stared = !this.stared
    }
  }
}
</script>

<style lang="scss">
.heart-animation {
  background-image: url(../../assets/images/web_heart_animation_edge.png);
  background-position: left;
  background-repeat: no-repeat;
  width: 100px;
  height: 100px;
}

.link-active {
  animation-name: heart-brust;
  animation-duration: .8s;
  animation-timing-function: steps(28);
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  display: inline-block;
}

@keyframes heart-brust {
  0% {
    background-position: left;
  }

  100% {
    background-position: right;
  }
}
</style>
