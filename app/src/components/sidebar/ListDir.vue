<template>
  <div class="sidebar-list__dir-container" :class="[isOpen ? 'open' : 'close']">
    <div class="sidebar-list__dir" @click="toggleDir">
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
      <ListCate :name="item.name" :key="item.id" v-for="item in subList" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs } from 'vue'
import ListCate from '@/components/sidebar/ListCate.vue'
import { ProjectInfo, projectStore } from '@/store/modules/project'

export default defineComponent({
  name: 'ListDir',
  components: {
    ListCate
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
    }
  },
  setup (props) {
    const { id } = toRefs(props)
    const isOpen = ref(false)
    const subList = ref<ProjectInfo[]>([])

    const toggleDir = () => {
      isOpen.value = !isOpen.value
    }
    const getListByDirId = async (id: string) => {
      const childList = await projectStore.getListByDirIdAction(id)
      subList.value = childList
    }

    onMounted(() => {
      getListByDirId(id.value)
    })

    return {
      isOpen,
      subList,
      toggleDir
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
