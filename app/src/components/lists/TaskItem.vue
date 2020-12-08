<template>
  <div class="app-task__list">
    <Checkbox @change="onCheckBoxChange" :value="checked" />
    <div class="app-task__list-input" :class="[checked ? 'checked' : '']">
      <input type="text" :value="value" :disabled="checked" />
      <!-- <a-input
        class="app-task__list-input-item"
        autocomplete="off"
        v-model:value="value"
      /> -->
      <!-- <div class="app-task__list-info">
        <span class="app-task__list-time">
          2020-10-31
        </span>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import Checkbox from '@/components/Checkbox/index.vue'
import { TaskCompleteState } from '@/enums/taskTypeEnum'
import { tasksStore } from '@/store/modules/task'

export default defineComponent({
  name: 'TaskItem',
  components: {
    Checkbox
  },
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    parent: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const { id, name, status, parent } = toRefs(props)

    const checked = computed(() => status.value === TaskCompleteState.DONE)
    const onCheckBoxChange = (isDone: boolean) => {
      console.log(isDone)
      tasksStore.changeTaskStatusAction({
        listId: parent.value,
        taskId: id.value,
        status: isDone ? TaskCompleteState.DONE : TaskCompleteState.TODO
      })
    }

    return {
      value: name,
      checked,
      onCheckBoxChange
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
