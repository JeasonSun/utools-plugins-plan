<template>
  <div class="plan-app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { userStore } from '@/store/modules/user'

export default defineComponent({
  name: 'App',
  setup (props, context) {
    async function checkUser () {
      await userStore.getUserInfo()
    }
    checkUser()
  }
})
</script>

<style lang="less"></style>
