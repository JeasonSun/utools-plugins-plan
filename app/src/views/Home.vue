<template>
  <a-spin :spinning="!userLogined">
    
  </a-spin>
  <div class="plan-app-layout app-grid-container" v-if="userLogined">
      <Sidebar />
      <Lists />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Sidebar from '@/components/sidebar/index.vue'
import Lists from '@/components/lists/index.vue'
import { userStore } from '@/store/modules/user'

import '@/styles/home.less'

export default defineComponent({
  name: 'Home',
  components: {
    Sidebar,
    Lists
  },
  setup () {
    return {
      userLogined: computed(() => userStore.status === 1)
    }
  }
})
</script>

<style lang="less"></style>
