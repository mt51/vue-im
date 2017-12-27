<template>
  <div class="middle">
    <div class="top-search">
      <div class="search-box">
        <input type="text" v-model="keyword" @focus="handleClearVisible" @keyup.enter="searchContact">
        <i class="clear" :class="{'show-clear': clearVisible}" @click="handleClearSearch">&times;</i>
        <button class="search fa fa-search" @click="searchContact"></button>
      </div>
    </div>
    <ul class="list">
      <li class="list-item" v-for="item in lists" @click="handleChatChange(item)" :class="{'current': currentChat && currentChat.id === item.id}">
        <div class="avatar">
          <img :src="item.avatar">
        </div>
        <div class="user">
          <div class="username">{{item.username}}</div>
          <div class="message" v-if="item.chatlogType === 'text'">{{item.chatlog}}</div>
          <div class="message" v-else-if="item.chatlogType === 'emoji'" v-html="item.chatlog"></div>
          <div class="message" v-else-if="item.chatlogType === 'image'">图片</div>
        </div>
        <div class="newmsg-bubble" v-show="item.count">{{item.count}}</div>
        <div class="time">{{item.time | formatDate}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
  import localData from '@/util/data.js'
  import { formatDate } from '@/filters/filters'
  
  export default {
    name: 'middle',
    props: {
      lists: Array,
      currentChat: Object
    },
    data () {
      return {
        keyword: '',
        clearVisible: false
      }
    },
    methods: {
      searchContact () {
        this.$parent.handleSearch(this.keyword)
      },
      handleChatChange (item) {
        localData.saveData('currentChat', item)
        this.$parent.handleChatChange(item)
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
      }
    },
    filters: {
      formatDate
    }
  }
</script>
<style lang="scss" scoped>
  .middle{
    height: 100%;
    width: 250px;
    background: #e6e6e6;
    overflow-y: scroll;
    .top-search {
      position: sticky;
      top: 0px;
      background: #e6e6e6;
      padding: 10px;
      z-index: 2;
      .search-box{
        border: 1px solid #d9d7d6;
        display: flex;
      }
      input {
        width: 120px;
        height: 25px;
        outline: none;
        padding: 5px 10px;
        border: none;
        flex: 1;
      }
      button{
        width: 40px;
        border:none;
        outline: none;
        padding: 0;
        margin: 0;
        text-align: center;
        font-size: 12px;
        cursor: pointer;
      }
      .clear {
        font-style: normal;
        display: none;
        position: absolute;
        right: 55px;
        top: 18px;
        font-size: 20px;
        background: #e7e7e7;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 50%;
        cursor: pointer;
      }
      .show-clear {
        display: block;
      }
    }
    .list{
      padding: 0;
      margin: 0;
      .list-item{
        display: flex;
        padding: 10px;
        position: relative;
        cursor: pointer;
        &:hover{
          background: #D9d8d8;
        }
        &.current{
          background: #c3c3c4;
        }
      }
      .avatar {
        width: 40px;
        height: 40px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 5px;
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
          height: 17px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #afa0a8;
          font-size: 12px;
        }
      }
      .newmsg-bubble {
        position: absolute;
        right: 20px;
        bottom: 7px;
        width: 20px;
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
        color: #afa0a8;
      }
    }
  }
</style>