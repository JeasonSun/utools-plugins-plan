<template>
  <div class="app-task__list-list"></div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { Task } from '@/types/task'

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
      
    })
    return {
      taskList: []
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
