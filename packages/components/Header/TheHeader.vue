<template>
  <div class="im-header">
    <div class="current-user">
      <Avatar />
      <SearchBox />
    </div>
    <!--  <div class="search-result-panel" v-show="searchVisible">
      <div class="sr-title-empty" v-show="searchResult.length === 0">好友搜索</div>
      <div class="sr-title" v-show="searchResult.length > 0">好友</div>
      <ul class="sr-list">
        <li class="sr-list-item" v-for="(item, index) in searchResult" :key="index" @click="handleClickSearchItem(item)">
          <img class="avatar" :src="item.avatar">
          <p>{{item.username}}</p>
        </li>
      </ul>
    </div>-->
    <Tabs v-if="!brief" />
    <SkinSwitch />
  </div>
</template>

<script>
import Avatar from './components/avatar';
import SearchBox from './components/search-box';
import Tabs from './components/tab';
import SkinSwitch from './components/skin';
export default {
  name: 'TheHeader',
  props: {
    mine: Object,
    store: Object,
    brief: Boolean,
    lists: Array
  },
  data() {
    return {
      keyword: '',
      skinVisible: false,
      searchVisible: false
    };
  },
  methods: {
    handleCurrentTab(type) {
      if (this.currentTab !== type) {
        this.store.commit('setCurrentTab', type);
      }
    },
    handleSkinVisible() {
      this.skinVisible = !this.skinVisible;
    },
    handleSkinChange(skin) {
      this.handleSkinVisible();
      if (this.skin !== skin) {
        this.store.commit('setSkin', skin);
      }
    },
    handleSRVisible() {
      this.searchVisible = !this.searchVisible;
    },
    handleClickSearchItem(item) {
      this.store.commit('setCurrentChat', item);
      this.store.commit('setCurrentTab', 'chat');
      this.store.commit('updateChatLogsList', item);
      this.searchVisible = !this.searchVisible;
    }
  },
  computed: {
    skin() {
      return this.store.states.skin;
    },
    currentTab() {
      return this.store.states.currentTab;
    },
    count() {
      return this.store.states.count;
    },
    searchResult() {
      if (this.keyword === '') return [];
      return this.lists.filter(
        item => item.username.indexOf(this.keyword) > -1
      );
    }
  },

  components: {
    Avatar,
    SearchBox,
    Tabs,
    SkinSwitch
  }
};
</script>
<style>
.im-header {
  width: 100%;
  min-width: 800px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}
</style>
