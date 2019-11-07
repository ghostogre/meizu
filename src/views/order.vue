<template>
  <div>
    <m-header></m-header>
    <main>
      订单
    </main>
    <m-footer></m-footer>
  </div>
</template>

<script>
import mHeader from '../components/common/header'
import mFooter from '../components/common/footer'
export default {
  name: 'order',
  components: {
    mHeader,
    mFooter
  }
}
</script>

<style lang="scss">

</style>
