<template>
  <div class="sidebar-container app-grid-item">
    <ListContainer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListContainer from '@/components/sidebar/ListContainer.vue';
import '@/styles/sidebar.less';

export default defineComponent({
  name: 'Sidebar',
  components: {
    ListContainer
  },
  props: {
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
