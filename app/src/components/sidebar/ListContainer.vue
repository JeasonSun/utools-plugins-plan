<template>
  <div class="sidebar-list__container">
    <header class="sidebar-list__header">清单</header>
    <ul class="sidebar-list__list">
      <li class="sidebar-list__item">
        <div class="sidebar-list-item__icon iconfont iconrect"></div>
        <div class="sidebar-list-item__name ellipsis">
          重要且紧急
        </div>
        <div class="sidebar-list-item__count">0</div>
      </li>
      <li class="sidebar-list__item">
        <div class="sidebar-list-item__icon iconfont iconrect"></div>
        <div class="sidebar-list-item__name ellipsis">
          重要不紧急
        </div>
        <div class="sidebar-list-item__count">0</div>
      </li>
      <li class="sidebar-list__item">
        <div class="sidebar-list-item__icon iconfont iconrect"></div>
        <div class="sidebar-list-item__name ellipsis">
          不重要但紧急
        </div>
        <div class="sidebar-list-item__count">0</div>
      </li>
      <li class="sidebar-list__item">
        <div class="sidebar-list-item__icon iconfont iconrect"></div>
        <div class="sidebar-list-item__name ellipsis">
          不重要不紧急
        </div>
        <div class="sidebar-list-item__count">0</div>
      </li>
      <li class="sidebar-list__item">
        <div class="sidebar-list-item__icon iconfont iconrect"></div>
        <div class="sidebar-list-item__name ellipsis">
          不重要不紧急不重要不紧急不重要不紧急
        </div>
        <div class="sidebar-list-item__count">0</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListContainer',
  props: {
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
