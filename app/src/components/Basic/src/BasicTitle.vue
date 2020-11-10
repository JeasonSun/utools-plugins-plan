<template>
  <span class="base-title" :class="{ 'show-span': showSpan && $slots.default }">
    <slot />
  </span>
</template>

<script lang="ts">
import { defineComponent, Prop, PropType } from 'vue'

export default defineComponent({
  name: 'BasicTitle',
  props: {
    showSpan: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },
  setup () {
    return {}
  }
})
</script>
