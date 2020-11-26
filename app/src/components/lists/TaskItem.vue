<template>
  <div class="app-task__list">
    <Checkbox @change="onCheckBoxChange" :value="checked" />
    <div class="app-task__list-input" :class="[isChecked ? 'checked' : '']">
      <input type="text" :value="value" :disabled="isChecked" />
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
    }
  },
  setup (props) {
    const { id, name, status } = toRefs(props)

    const checked = computed(() => status.value === TaskCompleteState.DONE)
    return {
      value: name,
      checked
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
