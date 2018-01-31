<template>
  <div class="middle">
    <div class="top-search">
      <div class="search-box">
        <button class="search fa fa-search"></button>
        <input type="text" v-model="keyword" placeholder="搜索最近联系人" @keyup="searchContact">
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
  import debounce from 'lodash/debounce'
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
      searchContact: debounce(function () {
        this.$parent.handleSearch(this.keyword)
      }, 200),
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
    height: 530px;
    overflow: hidden;
    width: 230px;
    background: #e6e6e6;
    .top-search {
     background: #e45050;
     padding-bottom: 15px;
     .search-box {
       width: 180px;
       margin: 0 auto;
       border-radius: 20px;
       background: #fff;
       color: #a6b5d7;
       padding: 3px 10px;
     }
      input {
        width: 150px;
        height: 20px;
        outline: none;
        border: none;
        flex: 1;
      }
      button{
        border:none;
        outline: none;
        padding: 0;
        margin: 0;
        background: #fff;
        color: #a6b5d7;
      }
      .show-clear {
        display: block;
      }
    }
    .list{
      overflow-y: auto;
      padding: 0;
      margin: 0;
      height: 485px;
      background: #363e47;
      .list-item{
        display: flex;
        padding: 10px;
        position: relative;
        cursor: pointer;
        &:hover, &.current{
          background: #2f363e;
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
          color: #fff;
        }
        .message{
          width: 155px;
          margin-top: 5px;
          height: 18px;
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
        color: #afa0a8;
      }
    }
  }
</style>