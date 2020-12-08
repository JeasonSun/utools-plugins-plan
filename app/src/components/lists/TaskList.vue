<template>
  <div class="app-task__list-list" :class="{ empty: !taskList.length }">
    <TaskItem
      v-for="item in taskList"
      :key="item.id"
      :id="item.id"
      :name="item.name"
      :status="item.status"
      :parent="item.parent"
    />
    <Empty tip="暂无清单任务" v-if="!taskList.length" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs, watchEffect } from 'vue'
import { Task } from '@/types/task'
import { projectStore } from '@/store/modules/project'
import { tasksStore } from '@/store/modules/task'
import { TaskCompleteState } from '@/enums/taskTypeEnum'
import TaskItem from '@/components/lists/TaskItem.vue'
import Empty from '@/components/Empty/index.vue'

export default defineComponent({
  name: 'TaskList',
  components: {
    TaskItem,
    Empty
  },
  props: {
    listId: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const { listId } = toRefs(props)

    const taskList = computed<Task[]>(() => tasksStore.list)
    watchEffect(() => {
      tasksStore.getTasksByListIdAction({
        listId: listId.value,
        status: TaskCompleteState.ALL
      })
    })
    return {
      taskList
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
