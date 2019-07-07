<template>
  <div class="im-header">
    <div class="current-user">
      <img class="avatar" :src="mine.avatar" />
      <div class="top-search" v-if="!brief">
        <div class="search-box">
          <button class="search fa fa-search"></button>
          <input type="text" v-model="keyword" @focus="handleSRVisible" />
          <p
            v-show="searchVisible"
            class="search-close"
            @click="handleSRVisible"
          >
            &times;
          </p>
        </div>
      </div>
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
    </div> -->
    <ul class="im-tab" v-if="!brief">
      <li
        class="im-tab-item tab-chatlist"
        :class="{ active: currentTab === 'chat' }"
        title="会话列表"
        @click="handleCurrentTab('chat')"
      >
        <i class="new-msg" v-show="count !== 0">{{ count }}</i>
        <button class="btn btn-chatlist">
          <i class="fa fa-comment-o"></i>
        </button>
        <p class="ti-arrow"><i class="fa fa-caret-up"></i></p>
      </li>
      <li
        class="im-tab-item tab-userlist"
        :class="{ active: currentTab === 'user' }"
        title="联系人列表"
        @click="handleCurrentTab('user')"
      >
        <button class="btn btn-userlist"><i class="fa fa-users"></i></button>
        <p class="ti-arrow"><i class="fa fa-caret-up"></i></p>
      </li>
    </ul>
    <ul class="im-tools">
      <li class="im-tools-item im-tools-skin">
        <button class="btn btn-skin" title="皮肤" @click="handleSkinVisible">
          <i class="fa fa-bookmark"></i>
        </button>
        <ul class="skin-list" v-show="skinVisible">
          <li class="skin-item" @click="handleSkinChange('red')">
            <i class="fa fa-check" :class="{ active: skin === 'red' }"></i>红色
          </li>
          <li class="skin-item" @click="handleSkinChange('blue')">
            <i class="fa fa-check" :class="{ active: skin === 'blue' }"></i>蓝色
          </li>
          <li class="skin-item" @click="handleSkinChange('white')">
            <i class="fa fa-check" :class="{ active: skin === 'white' }"></i
            >白色
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
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
    }
  },
  methods: {
    handleCurrentTab(type) {
      if (this.currentTab !== type) {
        this.store.commit('setCurrentTab', type)
      }
    },
    handleSkinVisible() {
      this.skinVisible = !this.skinVisible
    },
    handleSkinChange(skin) {
      this.handleSkinVisible()
      if (this.skin !== skin) {
        this.store.commit('setSkin', skin)
      }
    },
    handleSRVisible() {
      this.searchVisible = !this.searchVisible
    },
    handleClickSearchItem(item) {
      this.store.commit('setCurrentChat', item)
      this.store.commit('setCurrentTab', 'chat')
      this.store.commit('updateChatLogsList', item)
      this.searchVisible = !this.searchVisible
    }
  },
  computed: {
    skin() {
      return this.store.states.skin
    },
    currentTab() {
      return this.store.states.currentTab
    },
    count() {
      return this.store.states.count
    },
    searchResult() {
      if (this.keyword === '') return []
      return this.lists.filter(item => item.username.indexOf(this.keyword) > -1)
    }
  }
}
</script>
<style>
@import url('./index.pcss');
</style>
