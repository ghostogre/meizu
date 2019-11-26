<template>
  <div>
    <img class="avatar" src="../../assets/images/ml.png" alt="">
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  &:hover {
    transform: rotate(666turn);
    // 1turn = 360°
    transition-duration: 59s;
    transition-delay: 1s;
    transition-timing-function: cubic-bezier(.34, 0, .84, 1);
  }
}
</style>
