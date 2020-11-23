<template>
  <div class="sidebar-list__container">
    <header class="sidebar-list__header">清单</header>
    <!-- <ListCate name="默认清单" /> -->
    <!-- <ListDir /> -->
    <template v-for="item in list">
      <ListCate
        :name="item.name"
        :key="item.id"
        :id="item.id"
        v-if="item.type === ProjectTypeEnum.LIST"
      />
      <ListDir
        :name="item.name"
        :key="item.id"
        v-if="item.type === ProjectTypeEnum.PROJECT"
        :id="item.id"
        :child="item.children"
        :open="item.open"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
// import { mapState} from 'vuex';
import ListDir from '@/components/sidebar/ListDir.vue'
import ListCate from '@/components/sidebar/ListCate.vue'
import { projectStore } from '@/store/modules/project'
import { ProjectTypeEnum } from '@/enums/projectTypeEnum'

export default defineComponent({
  name: 'ListContainer',
  components: {
    ListDir,
    ListCate
  },
  // 用来规范props的类型
  // props: {
  // },
  setup () {
    const getProjectList = async () => {
      await projectStore.getListAction()
      console.log('methods', projectStore.list)
    }

    onMounted(getProjectList)

    return {
      ProjectTypeEnum,
      list: computed(() => {
        console.log(projectStore.list, '===+++++')
        return projectStore.list
      })
    }
  }

  // computed: mapState({
  //   list:
  // }),
  // created(){
  //   this.getProjectList()
  // },
  // methods:{
  //   async getProjectList() {
  //     console.log(this, '=====')
  //     await projectStore.getListAction()

  //     console.log('methods', projectStore.list)

  //   }
  // }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
