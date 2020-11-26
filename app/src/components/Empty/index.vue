<template>
  <div class="empty-container">
    <div class="empty-image-container">
      <div class="iconfont icon-orderEmpty"></div>
    </div>
    <div class="empty-text-container">
      {{ tip }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Empty',
  components: {},
  props: {
    tip: {
      type: String,
      default: '暂无数据'
    }
  },
  setup () {
    return {}
  }
})
</script>

<style scoped lang="less">
@import (reference) '../../styles/rule.less';
.empty-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  width: 100%;
}
.empty-image-container {
  font-size: 100px;
  line-height: 100px;
  padding: 10px ;
  .iconfont {
    font-size: 100px;
    color: @color-blue;
  }
}
.empty-text-container{
  color: @color-black6;
}
</style>
