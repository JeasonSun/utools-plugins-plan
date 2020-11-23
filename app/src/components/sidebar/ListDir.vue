<template>
  <div
    class="sidebar-list__dir-container"
    :class="[isOpen ? 'open' : 'close', isActionMenuOpen ? 'active' : 'normal']"
  >
    <div class="sidebar-list__dir">
      <div class="sidebar-list__icon" @click="toggleDir">
        <span
          class="iconfont"
          :class="[isOpen ? 'iconfileopen' : 'iconfileclose']"
        ></span>
      </div>
      <div class="sidebar-list__name ellipsis">
        {{ name }}
      </div>
      <div class="sidebar-list__count list-dir">{{ count }}</div>

      <a-dropdown
        :trigger="['click']"
        placement="bottomCenter"
        @visibleChange="visibleChange"
        @click="(e) => e.preventDefault()"
      >
        <div class="sidebar-list__action list-dir">
          <i class="iconfont iconaction" />
        </div>
        <template v-slot:overlay>
          <div class="sidebar-list__action-menu">
            <div class="sidebar-list__action-menu-item" @click="deleteDir">
              解散
            </div>
          </div>
        </template>
      </a-dropdown>
      <div
        class="sidebar-list__arrow"
        :class="[isOpen ? 'open' : 'close']"
        @click="toggleDir"
      >
        <span class="iconfont iconarrow"></span>
      </div>
    </div>
    <div class="sidebar-list__dir-list">
      <ListCate :name="item.name" :key="item.id" v-for="item in subList" />
    </div>
  </div>
  <DelConfirm
    @register="registerDelConfirm"
    title="解散文件夹"
    :tip="content"
    @confirm="onConfirm"
  />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRefs } from 'vue'
import ListCate from '@/components/sidebar/ListCate.vue'
import DelConfirm from '@/components/sidebar/DelConfirm.vue'
import { projectStore } from '@/store/modules/project'
import { ProjectInfo } from '@/types/project'
import { useModal } from '../Modal'

export default defineComponent({
  name: 'ListDir',
  components: {
    ListCate,
    DelConfirm
  },
  props: {
    name: {
      type: String,
      default: '默认文件夹'
    },
    id: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      default: 0
    },
    child: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const { id, name, count, child } = toRefs(props)
    const isOpen = ref(false)
    const isActionMenuOpen = ref(false)
    const content = ref('')
    const subList = ref<ProjectInfo[]>([])

    const [registerDelConfirm, delConfirm] = useModal()

    const toggleDir = () => {
      isOpen.value = !isOpen.value
    }
    // const getListByDirId = async (id: string) => {
    //   const childList = await projectStore.getListByDirIdAction(id)
    //   subList.value = childList
    // }

    const visibleChange = (visible: boolean) => {
      isActionMenuOpen.value = visible
    }
    const hideActionMenu = () => {
      isActionMenuOpen.value = false
    }

    const onConfirm = () => {
      console.log('文件夹被解散', name.value)
    }

    const deleteDir = () => {
      // 如果是没有子清单的， 直接删除
      const childLength = child.value.length
      console.log(count.value, childLength)
      if (count.value || childLength) {
        delConfirm.openModal()
      } else {
        onConfirm()
      }

      hideActionMenu()
    }

    const setConfirmInfo = () => {
      content.value = `解散后，文件夹（${name.value}）中的清单将直接显示在侧边栏。`
    }


    onMounted(() => {
      // getListByDirId(id.value)
      // 设置默认的确认弹窗的信息
      setConfirmInfo()
    })

    return {
      isOpen,
      subList: computed(() => child.value),
      toggleDir,
      isActionMenuOpen,
      visibleChange,
      hideActionMenu,
      deleteDir,
      registerDelConfirm,
      content,
      onConfirm,
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
