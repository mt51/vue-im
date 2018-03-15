<template>
  <div class="middle">
    <ul class="list">
      <li class="list-item" v-for="(item, index) in lists" :key="index" @click="handleChatChange(item)" :class="{'current': currentChat && currentChat.id === item.id}">
        <div class="avatar">
          <img :src="item.avatar">
        </div>
        <div class="user">
          <div class="username">{{item.username}}</div>
          <div class="message" v-if="item.chatlogType === 'image'">图片</div>
          <div class="message" v-else-if="item.chatlogType === 'file'">文件</div>
          <div class="message" v-else v-html="item.chatlog"></div>
        </div>
        <div class="newmsg-bubble" v-show="item.count">{{item.count}}</div>
        <div class="time">{{item.time | formatDate}}</div>
        <div class="chat-close" @click.stop="handleChatClose(index)">&times;</div>
      </li>
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
    data () {
      return {
        clearVisible: false
      }
    },
    methods: {
      handleChatChange (item) {
        this.store.commit('setCurrentChat', item)
        if (item.count !== 0) {
          item.count = 0
          this.store.commit('resetItemCount', item)
        }
      },
      handleClearSearch () {
        if (this.keyword !== '') {
          this.keyword = ''
          this.$parent.handleClearSearch()
        }
        this.clearVisible = false
      },
      handleClearVisible () {
        this.clearVisible = true
      },
      handleChatClose (index) {
        this.store.commit('removeChatLog', index)
      }
    },
    filters: {
      formatDate
    },
    computed: {
      lists () {
        return this.store.states.chatLogsList
      },
      currentChat () {
        return this.store.states.currentChat
      }
    }
  }
</script>
<style lang="scss" scoped>
  .middle{
    height: 100%;
    overflow: hidden;
    width: 230px;
    .list{
      overflow-y: auto;
      padding: 0;
      margin: 0;
      height: 100%;
      .list-item{
        display: flex;
        padding: 10px;
        position: relative;
        cursor: pointer;
        &:hover .chat-close {
          display: block;
        }
      }
      .avatar {
        width: 40px;
        height: 40px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .user{
        position: relative;
        margin-left: 15px;
        font-size: 14px;
        .username {
          width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .message{
          width: 155px;
          margin-top: 5px;
          height: 18px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 12px;
        }
      }
      .newmsg-bubble {
        position: absolute;
        right: 20px;
        bottom: 7px;
        width: 30px;
        height: 20px;
        line-height: 20px;
        border-radius: 20px;
        color: #fff;
        background: #ff3b30;
        font-size: 12px;
        text-align: center;
      }
      .time{
        position: absolute;
        right: 10px;;
        font-size: 12px;
      }
    }
    .chat-close {
      display: none;
      position: absolute;
      top: 30px;
      right: 10px;
      width: 20px;
      height: 20px;
      line-height: 18px;
      font-size: 20px;
      text-align: center;
      background: #6a6a6a;
      border-radius: 50%;
      color: #fff;
    }
  }
</style>