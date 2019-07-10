<template>
  <ul class="im-tab" v-if="!brief">
    <TabItem
      v-for="tab in tabs"
      :key="tab.type"
      :tab="tab"
      :currentTab="currentTab"
      @on-change="onTabChange"
    />
  </ul>
</template>

<script>
import TabItem from './tab-item';
const tabs = [
  {
    type: 'chat',
    title: '会话列表'
  },
  {
    type: 'user',
    title: '联系人列表'
  }
];
export default {
  name: 'tab',
  model: {
    prop: 'value',
    event: 'change'
  },
  inject: ['brief', 'handleTabChange'],
  data() {
    return {
      tabs,
      currentTab: 'user'
    };
  },
  components: {
    TabItem
  },
  computed: {
    count() {
      return this.store.state.count;
    }
  },
  methods: {
    onTabChange(tab) {
      this.currentTab = tab;
      this.handleTabChange(tab);
    }
  }
};
</script>

<style lang="scss" scoped>
.im-tab {
  margin-top: 15px;
}
</style>
