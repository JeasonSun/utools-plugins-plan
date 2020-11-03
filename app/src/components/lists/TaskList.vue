<template>
  <div class="app-task__list">
    <Checkbox @change="onCheckBoxChange" :value="checked" />
    <div class="app-task__list-input" :class="[isChecked ? 'checked' : '']">
      <input type="text" value="【项目P0】智慧学校工作台V1.1.1" :disabled="isChecked"/>
      <div class="app-task__list-info">
        <span class="app-task__list-time">
          2020-10-31
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Checkbox from '@/components/common/Checkbox.vue';

export default defineComponent({
  name: 'TaskList',
  components: {
    Checkbox
  },
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isChecked: this.checked,
    }
  },
  methods: {
    onCheckBoxChange(value: boolean) {
      console.log(value)
      this.isChecked = value
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
