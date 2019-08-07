<template>
  <ul>
    <li v-for="(item, index) in data" :key="index">
      <div>{{item.name}}</div>
      <ul>
        <li v-for="(info, idx) in item.queryList" :key="idx">
          {{info.name}}
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'filterBox',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
