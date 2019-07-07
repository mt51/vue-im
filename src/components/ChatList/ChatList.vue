<template>
  <div class="middle">
    <ul class="list">
      <template v-if="lists.length > 0">
        <li
          class="list-item"
          v-for="(item, index) in lists"
          :key="index"
          @click="handleChatChange(item)"
          :class="{ current: currentChatId === item.id }"
        >
          <div class="avatar">
            <img :src="item.avatar" />
          </div>
          <div class="user">
            <div class="username">{{ item.username }}</div>
            <div class="message" v-if="item.chatlogType === 'image'">图片</div>
            <div class="message" v-else-if="item.chatlogType === 'file'">
              文件
            </div>
            <div class="message" v-else v-html="item.lastChat"></div>
          </div>
          <div class="newmsg-bubble" v-show="getCount(item.id)">
            {{ getCount(item.id) }}
          </div>
          <div class="time">{{ item.lastChatTime | formatDate }}</div>
          <div class="chat-close" @click.stop="handleChatClose(index)">
            &times;
          </div>
        </li>
      </template>
      <template v-else>
        <li class="empty">暂无历史会话</li>
      </template>
    </ul>
  </div>
</template>
<script>
import { formatDate } from '@/filters/filters'
export default {
  name: 'middle',
  props: {
    store: Object
  },
  data() {
    return {
      clearVisible: false
    }
  },
  methods: {
    handleChatChange(item) {
      this.store.commit('setCurrentChat', item.id)
      if (item.count !== 0) {
        item.count = 0
        this.store.commit('removeNewMsgList', item.id)
      }
    },
    handleClearSearch() {
      if (this.keyword !== '') {
        this.keyword = ''
        this.$parent.handleClearSearch()
      }
      this.clearVisible = false
    },
    handleClearVisible() {
      this.clearVisible = true
    },
    handleChatClose(index) {
      this.store.commit('removeChatLog', index)
    },
    getCount(id) {
      if (this.newMsgLists.hasOwnProperty(id)) {
        return this.store.states.newMsgLists[id].length
      } else {
        return 0
      }
    }
  },
  filters: {
    formatDate
  },
  computed: {
    newMsgLists() {
      return this.store.states.newMsgLists
    },
    lists() {
      return this.store.states.chatLog
    },
    currentChatId() {
      return this.store.states.currentChatId
    },
    userInfoCenter() {
      return this.store.states.userInfoCenter
    }
  }
}
</script>
<style>
@import url('./index.pcss');
</style>
