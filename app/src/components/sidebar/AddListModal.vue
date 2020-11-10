<template>
  <BasicModal v-bind="$attrs">
    AddListModal
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { BasicModal } from '@/components/Modal'

export default defineComponent({
  name: 'AddListModal',
  components: { BasicModal },
  setup () {
    console.log('addListModal')
    return {}
  }
})
</script>
