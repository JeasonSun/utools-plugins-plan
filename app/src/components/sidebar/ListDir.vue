<template>
  <div class="sidebar-list__dir-container" :class="[isOpen ? 'open' : 'close']">
    <div class="sidebar-list__dir">
      <div class="sidebar-list__icon">
        <span
          class="iconfont"
          :class="[isOpen ? 'iconfileopen' : 'iconfileclose']"
        ></span>
      </div>
      <div class="sidebar-list__name ellipsis">
        {{ name }}
      </div>
      <div class="sidebar-list__count">{{ count }}</div>
      <div class="sidebar-list__arrow" :class="[isOpen ? 'open' : 'close']">
        <span class="iconfont iconarrow"></span>
      </div>
    </div>
    <div class="sidebar-list__dir-list">
      <ListCate name="重要不紧急" />
      <ListCate name="重要且紧急" />
      <ListCate name="不重要但紧急" />
      <ListCate name="不重要且不紧急" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListCate from '@/components/sidebar/ListCate.vue';

export default defineComponent({
  name: 'ListDir',
  components:{
    ListCate
  },
  props: {
    name: {
      type: String,
      default: '默认文件夹'
    },
    count: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isOpen: false
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
