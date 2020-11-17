<template>
  <div class="sidebar-container app-grid-item sidebar-flex-container">
    <div class="sidebar-toolbar-flex-container">
      <Toolbar />
    </div>
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
      <div class="add-btn" @click="addList">
        <span class="iconfont iconadd"></span>
      </div>
    </div>
    <AddListModal @register="registerAddListModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Toolbar from '@/components/sidebar/Toolbar.vue'
import ListCate from '@/components/sidebar/ListCate.vue'
import ListContainer from '@/components/sidebar/ListContainer.vue'
import '@/styles/sidebar.less'
import { useModal } from '../Modal'
import AddListModal from './AddListModal.vue'

export default defineComponent({
  name: 'Sidebar',
  components: {
    Toolbar,
    ListCate,
    ListContainer,
    AddListModal
  },
  props: {},
  setup (props, context) {
    /**
     * 将registerAddListModal注册方法传递给BasicModal，
     * 在BasicModal中会把基础Modal的
     * 
     */
    const [registerAddListModal, listModal] = useModal()

    // 点击添加按钮 -> 弹窗
    const addList = () => {
      console.log('addList')
      console.log(context)
      listModal.openModal()
      // context.$message.info('This is a normal message');
    }
    return {
      addList,
      registerAddListModal
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
