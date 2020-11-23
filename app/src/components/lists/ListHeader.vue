<template>
  <div class="app-mainlist-header">
    <div class="mainlist-header__icon" @click="toggleOpen">
      <span
        class="iconfont"
        :class="[isOpen ? 'iconsidebar_on' : 'iconsidebar_off']"
      ></span>
    </div>
    <div class="mainlist-header__title">ID: {{ listId }}</div>
    <div class="mainlist-header__setting">
      <span class="iconfont icondot"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { projectStore } from '@/store/modules/project'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ListHeader',
  props: {},
  setup () {
    const isOpen = ref(true)
    const toggleOpen = () => {
      console.log('toggle')
      isOpen.value = !isOpen.value
    }

    return {
      listId: computed(() => projectStore.activeId),
      isOpen,
      toggleOpen
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
