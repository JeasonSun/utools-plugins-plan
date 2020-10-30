<template>
  <div class="app-grid-item app-list-container">
    <div class="mainlist-container-flex">
      <ListHeader />
      <ListAdd />
    </div>
    <div class="mainlist-container-flex-list">
      <TaskList/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '@/styles/mainlist.less';
import ListHeader from '@/components/lists/ListHeader.vue'
import ListAdd from '@/components/lists/ListAdd.vue'
import TaskList from '@/components/lists/TaskList.vue'

export default defineComponent({
  name: 'Lists',
  components: {
    ListHeader,
    ListAdd,
    TaskList
  },
  props: {
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
