<template>
  <div class="app-task__list-list">
    List
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { Task } from '@/types/task'
import { projectStore } from '@/store/modules/project'
import { tasksStore } from '@/store/modules/task'


export default defineComponent({
  name: 'TaskList',
  components: {},
  props: {
    listId: {
      type: String,
      required: true
    },
  }, 
  setup(){
    const taskList = ref<Task[]>([])
    watchEffect(() => {
      tasksStore.getTasksByListIdAction({})
    })
    return {
      taskList: []
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
