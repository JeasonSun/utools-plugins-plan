<template>
  <div
    class="sidebar-list__cate"
    :class="[isActionMenuOpen ? 'active' : 'normal']"
    @click="clickListHandler"
  >
    <div class="sidebar-list__icon">
      <span :class="`iconfont icon${icon}`"></span>
    </div>
    <div class="sidebar-list__name ellipsis">
      {{ name }}
    </div>
    <div class="sidebar-list__count list-list">{{ count }}</div>
    <a-dropdown
      :trigger="['click']"
      placement="bottomCenter"
      @visibleChange="visibleChange"
      @click="e => e.preventDefault()"
    >
      <div class="sidebar-list__action list-list">
        <i class="iconfont iconaction" />
      </div>
      <template v-slot:overlay>
        <div class="sidebar-list__action-menu">
          <div class="sidebar-list__action-menu-item" @click="deleteDir">
            删除
          </div>
        </div>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts">
import { projectStore } from '@/store/modules/project'
import { defineComponent, ref, toRefs } from 'vue'

export default defineComponent({
  name: 'ListCate',
  props: {
    icon: {
      type: String,
      default: 'list'
    },
    name: {
      type: String,
      default: ''
    },
    count: {
      type: Number,
      default: 0
    },
    id: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const { id } = toRefs(props)
    const isActionMenuOpen = ref(false)

    const visibleChange = (visible: boolean) => {
      isActionMenuOpen.value = visible
    }
    const hideActionMenu = () => {
      isActionMenuOpen.value = false
    }

    const deleteDir = () => {
      hideActionMenu()
    }
    const clickListHandler = () => {
      console.log('click', id.value)
      projectStore.commitActiveList(id.value)
    }

    return {
      isActionMenuOpen,
      visibleChange,
      hideActionMenu,
      deleteDir,
      clickListHandler
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
