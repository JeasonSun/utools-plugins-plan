<template>
  <div class="app-grid-item app-list-container">
    <div class="app-list-content" v-if="listId">
      <div class="mainlist-container-flex">
        <ListHeader />
        <ListAdd :listId="listId"/>
      </div>
      <div class="mainlist-container-flex-list">
        <TaskItem />
        <TaskItem />
      </div>
    </div>
    <div class="app-list-empty-content" v-if="!listId">
      <Empty tip="暂无清单任务"/>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import '@/styles/mainlist.less'
import ListHeader from '@/components/lists/ListHeader.vue'
import ListAdd from '@/components/lists/ListAdd.vue'
import TaskItem from '@/components/lists/TaskItem.vue'
import Empty from '@/components/Empty/index.vue'
import { projectStore } from '@/store/modules/project'

export default defineComponent({
  name: 'Lists',
  components: {
    ListHeader,
    ListAdd,
    TaskItem,
    Empty
  },
  props: {},
  setup () {
    return {
      listId: computed(() => projectStore.activeId)
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .app-list-empty-content{
    display: flex;
    height: 100%;
    align-items: center;
  }
</style>
