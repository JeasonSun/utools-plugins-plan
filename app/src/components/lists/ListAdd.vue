<template>
  <div class="app-mainlist_add">
    <div class="add-list__input-container">
      <a-input
        placeholder="添加任务至清单，回车即可保存"
        class="add-list__input"
        @pressEnter="pressEnter"
        autocomplete="off"
        v-model:value="value"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, unref } from 'vue'

export default defineComponent({
  name: 'ListAdd',
  props: {
    listId: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const { listId } = toRefs(props)
    console.log(listId.value)
    const value = ref('')
    const pressEnterHandler = () => {
      const taskName = unref(value)
      const lId = unref(listId)
      console.log(taskName, lId)
      value.value = ''
    }
    return {
      pressEnter: pressEnterHandler,
      value
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
