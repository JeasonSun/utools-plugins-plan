<template>
  <a-spin :spinning="!userLogined"> </a-spin>
  <div class="plan-app-layout app-grid-container" v-if="userLogined">
    <Sidebar />
    <Lists />
    <div class="plan-app__main-content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watchEffect } from 'vue'
import Sidebar from '@/components/sidebar/index.vue'
import Lists from '@/components/lists/index.vue'
import { userStore } from '@/store/modules/user'

import '@/styles/todo.less'
import { projectStore } from '@/store/modules/project'
import { toRawObj } from '@/utils'
import { updateStoreListApi } from '@/api/project'

export default defineComponent({
  name: 'Todo',
  components: {
    Sidebar,
    Lists
  },
  setup () {
    const isLogined = computed(() => userStore.status === 1)
    watchEffect(() => {
      if (isLogined.value) {
        console.log('检测到list更新')
        const list = projectStore.list
        const rawList = toRawObj(list)
        updateStoreListApi(rawList)
      }
    })
    return {
      userLogined: isLogined
    }
  }
})
</script>

<style lang="less"></style>
