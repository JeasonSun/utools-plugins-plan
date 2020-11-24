<template>
  <div
    class="sidebar-list__cate"
    :class="[isActionMenuOpen ? 'active' : 'normal']"
  >
    <div class="sidebar-list__icon">
      <span :class="`iconfont icon${icon}`"></span>
    </div>
    <div class="sidebar-list__name ellipsis" @click="clickListHandler">
      {{ name }}
    </div>
    <div class="sidebar-list__count list-list">{{ count }}</div>
    <a-dropdown
      :trigger="['click']"
      placement="bottomCenter"
      @visibleChange="visibleChange"
      @click="(e) => e.preventDefault()"
    >
      <div class="sidebar-list__action list-list">
        <i class="iconfont iconaction" />
      </div>
      <template v-slot:overlay>
        <div class="sidebar-list__action-menu">
          <div class="sidebar-list__action-menu-item" @click="deleteList">
            删除
          </div>
        </div>
      </template>
    </a-dropdown>
  </div>
  <DelConfirm
    @register="registerDelConfirm"
    title="删除清单"
    :tip="content"
    @confirm="onConfirm"
  />
</template>

<script lang="ts">
import { projectStore } from '@/store/modules/project'
import { defineComponent, onMounted, ref, toRefs } from 'vue'
import { useModal } from '../Modal'
import DelConfirm from '@/components/sidebar/DelConfirm.vue'

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
    },
    parent: {
      type: String,
      required: true
    }
  },
  components: {
    DelConfirm
  },
  setup(props) {
    const { id, name, parent } = toRefs(props)
    const isActionMenuOpen = ref(false)
    const content = ref('')
    const [registerDelConfirm, delConfirm] = useModal()


    const visibleChange = (visible: boolean) => {
      isActionMenuOpen.value = visible
    }
    const hideActionMenu = () => {
      isActionMenuOpen.value = false
    }

    const deleteList = (e?: Event) => {
      e && e.preventDefault();
      hideActionMenu();
      delConfirm.openModal();
      // projectStore.deleteListByIdAction(id.value)
    }
    const clickListHandler = () => {
      console.log('click', id.value)
      projectStore.commitActiveList(id.value)
    }


    const onConfirm = () => {
      console.log('文件夹被解散', id.value)
      projectStore.deleteListByIdAction({
        listId: id.value,
        dirId: parent.value
      })
    }

    const setConfirmInfo = () => {
      content.value = `确认删除清单（${name.value}）吗？删除后清单不可恢复，清单中的所有待办也会同时被删除。`
    }

    onMounted(() => {
      // getListByDirId(id.value)
      // 设置默认的确认弹窗的信息
      setConfirmInfo()
    })

    return {
      isActionMenuOpen,
      visibleChange,
      hideActionMenu,
      deleteList,
      clickListHandler,
      registerDelConfirm,
      content,
      onConfirm
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
