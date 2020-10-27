<template>
  <div class="plan-app-layout app-grid-container">
    <Sidebar />
    <Lists />
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import Sidebar from '@/components/sidebar/index.vue';
import Lists from '@/components/lists/index.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Sidebar,
    Lists
  },
});
</script>

<style lang="less">
.app-grid-container {
  display: grid;
  grid-template-columns: 20% 80%;
}

.app-grid-item{

}
</style>
