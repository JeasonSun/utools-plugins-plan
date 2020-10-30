<template>
  <div class="app-mainlist-header">
    <div class="mainlist-header__icon">
      <span class="iconfont iconlist"></span>
    </div>
    <div class="mainlist-header__title">测试文件夹</div>
    <div class="mainlist-header__setting">
      <span class="iconfont icondot"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListHeader',
  props: {
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
