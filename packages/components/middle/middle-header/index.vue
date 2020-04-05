<template>
  <div class="middle-header">
    <div class="middle-header__item">
      <h4 class="middle-header__title">
        通讯录
      </h4>
      <i class="iconfont icon-add-friend middle-header__tools" />
    </div>

    <div class="middle-header__search">
      <i class="iconfont icon-search search-input__icon" />
      <input class="search-input">
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'middle-header',
});
</script>

<style lang="scss" >
  @import './index.scss';
</style>
