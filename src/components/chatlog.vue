<template>
  <div class="chatlog">
    <div class="loading" v-show="loading">
      <p>加载中。。。</p>
    </div>
    <div class="chatlog-wrap">
      <div class="title">
        <span>聊天记录</span>
        <span class="close" @click="handleHistoryVisible">&times;</span>
      </div>
      <ul class="log-list">
        <li class="log-item" v-for="(item, index) in history.records" :class="{'mine': item.mine}">
          <div class="time" v-if="handleTimeVisible(item, index)"><span>{{item.time | formatDate }}</span></div>
          <div class="avatar">
            <img :src="item.avatar">
          </div>
          <div class="message">{{item.content}}</div>
        </li>
      </ul>
      <div class="page">
        <Page :total="history.total" :countPage="history.size" @page-change="handlePageChange"></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import { formatDate } from '@/filters/filters'
  import Page from './pagination'
  export default {
    name: 'chatlog',
    props: {
      history: Object,
      loading: Boolean
    },
    methods: {
      handleTimeVisible (item, index) {
        if (index === 0) {
          return true
        } else {
          return (this.history.records[index].time - this.history.records[index - 1].time > 10 * 60 * 1000)
        }
      },
      handleHistoryVisible () {
        this.$parent.handleHistoryVisible()
      },
      handlePageChange (page) {
        this.$parent.handlePageChange(page)
      }
    },
    filters: {
      formatDate
    },
    components: {
      Page
    }
  }
</script>
<style lang="scss" scoped>
  .chatlog {
    position: fixed;
    width: 40%;
    height: 100%;
    top: 0;
    right: 0;
    z-index: 3;
    .chatlog-wrap {
      width: 100%;
      height: 100%;
      box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
      background: #f5f5f5;
      overflow: auto;
      .title {
        position: sticky;
        top: 0;
        padding: 0 30px;
        height: 50px;
        line-height: 50px;
        background: #f5f5f5;
        font-size: 18px;
        border-bottom: 1px solid #e7e7e7;
        .close {
          float: right;
          font-size: 24px;
          font-weight: bold;
          cursor: pointer;
          height: 50px;
          line-height: 50px;
        }
      }
    }
    .log-list{
      margin: 0 auto 30px;
      padding: 0 10px;
    }
    .log-item{
      box-sizing: border-box;
      width: 100%;
      padding: 10px;
    }
    .avatar{
      float: left;
      width: 40px;
      height: 40px;
      img{
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }
    .message{
      display: inline-block;
      margin: 4px 15px;
      padding: 3px 10px;
      font-size: 14px;
      background: #fff;
    }
    .mine {
      overflow: hidden;
      padding-right: 10px;
      text-align: right;
      .avatar{
        float: right;
      }
      .message {
        background: #98e165;
      }
    }
    .time {
      text-align: center;
      span {
        display: inline-block;
        padding: 3px 8px;
        background: #e6e6e6;
        color: #000;
        border-radius: 3px;
      }
    }
    .page {
      position: sticky;
      width: 100%;
      background: #f5f5f5;
      bottom: 0;
      height: 40px;
      .rs-pagination{
        text-align: right;
      }
      .rs-pagination .pagination{
        margin: 0;
      }
    }
  }
</style>