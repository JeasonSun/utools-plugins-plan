<template>
  <div class="sidebar-list__cate">
    <div class="sidebar-list__icon">
      <span :class="`iconfont icon${icon}`"></span>
    </div>
    <div class="sidebar-list__name ellipsis">
      {{name}}
    </div>
    <div class="sidebar-list__count">{{count}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListCate',
  props: {
    icon:{
      type:String,
      default: 'list'
    },
    name: {
      type:String,
      default: ''
    },
    count: {
      type: Number,
      default: 0
    }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
