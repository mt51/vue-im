<template>
  <div class="side-bar__setting">
    <i class="iconfont icon-setting settings__icon"></i>
    <p class="settings__name">设置</p>
  </div>
</template>

<script>
import { createComponent } from '@vue/composition-api';
export default createComponent({
  name: 'settings',
  setup() {}
});
</script>

<style lang="scss" scoped>
.side-bar__setting {
  position: absolute;
  bottom: 20px;
  width: 100%;
  height: 80px;
  text-align: center;
  color: #fff;
  &:hover {
    background-color: #39414c;
    .settings__icon,
    .settings__name {
      transform: translateY(-10px);
    }
  }

  .settings__icon {
    display: inline-block;
    font-size: 24px;
    line-height: 1.5;
    margin-top: 20px;
    transition: all 0.5s;
  }

  .settings__name {
    margin: 0;
    font-size: 12px;
    transition: all 0.5s;
  }
}
</style>
