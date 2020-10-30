<template>
  <div class="sidebar-list__container">
    <header class="sidebar-list__header">清单</header>
    <ListCate name="默认清单" />
    <ListDir />
    
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListDir from '@/components/sidebar/ListDir.vue';
import ListCate from '@/components/sidebar/ListCate.vue';

export default defineComponent({
  name: 'ListContainer',
  components: {
    ListDir,ListCate
  },
  props: {
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
