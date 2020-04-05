<template>
  <div class="app-list">
    <template v-for="app in appList">
      <div
        :key="app.key"
        class="app-item"
        :class="`${currentTab === app.key ? 'app-item-active' : ''}`"
        @click="handleAppChange(app)"
      >
        <i :class="`app-item__icon iconfont icon-${app.key}`" />
        <p class="app-item__name">
          {{ app.name }}
        </p>
      </div>
    </template>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api';
import { useTabsInject } from '../../context';

export default {
  name: 'app-list',

  setup() {
    const appList = ref([
      {
        key: 'message',
        name: '消息'
      },
      {
        key: 'contact',
        name: '通讯录'
      }
    ]);
    const { currentTab, setCurrentTab } = useTabsInject();

    const handleAppChange = app => {
      setCurrentTab(app.key);
    };
    return {
      appList,
      currentTab,
      handleAppChange
    };
  }
};
</script>

<style lang="scss" >
.app-list {
  margin-top: 20px;
  .app-item {
    width: 80px;
    height: 80px;
    text-align: center;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: #39414c;
      .app-item__icon,
      .app-item__name {
        transform: translateY(-10px);
      }
    }
  }

  .app-item-active {
    background-color: #39414c;

    .app-item__icon,
    .app-item__name {
      transform: translateY(-10px);
    }
  }

  .app-item__icon {
    display: inline-block;
    margin-top: 15px;
    font-size: 24px;
    line-height: 1.5;
    opacity: 0.8;
    transition: all 0.5s;
  }

  .app-item__name {
    font-size: 12px;
    margin: 0;
    transition: all 0.5s;
  }
}
</style>
