<template>
  <div class="app-mainlist_add">
    <div class="add-list__input-container">
      <input type="text" autocomplete="off" 
      placeholder="添加任务至清单，回车即可保存" class="add-list__input">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListAdd',
  props: {
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
