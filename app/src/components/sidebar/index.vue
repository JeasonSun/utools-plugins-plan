<template>
  <div class="sidebar-container app-grid-item sidebar-flex-container">
    <div class="sidebar-cate-flex-container">
      <ListCate icon="box" name="收集箱" />
      <ListCate icon="daiban" name="今天" />
      <ListCate icon="done" name="已完成" />
      <ListCate icon="star" name="标星" />
    </div>
    <div class="sidebar-list-flex-container">
      <ListContainer />
    </div>
    <div class="sidebar-action-flex-container">
      <div class="add-btn">
        <span class="iconfont iconadd"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListCate from '@/components/sidebar/ListCate.vue';
import ListContainer from '@/components/sidebar/ListContainer.vue';
import '@/styles/sidebar.less';
import { projectStore } from '@/store/modules/project';

export default defineComponent({
  name: 'Sidebar',
  components: {
    ListCate,
    ListContainer
  },
  props: {
  },
  created(){
    this.getProjectList()
  },
  methods:{
    async getProjectList() {
      await projectStore.getListAction()

      console.log('methods', projectStore.list)
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
