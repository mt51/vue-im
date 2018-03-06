<template>
  <transition name="collapse">
    <div class="chatlog" v-if="visible">
      <div class="chatlog-wrap">
        <div class="title">
          <span>聊天记录</span>
          <span class="close" @click="handleHistoryVisible">&times;</span>
        </div>
        <ul class="log-list">
          <li class="log-item" v-for="(item, index) in cloneHistory.records" :class="{'mine': item.mine}">
            <div class="time" v-if="handleTimeVisible(item, index)"><span>{{item.time | formatDate(true) }}</span></div>
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
  </transition>
</template>

<script>
  import { formatDate } from '@/filters/filters'
  import { deepCopy } from '@/util/utils.js'
  import Page from '../pagination'
  export default {
    name: 'chatlog',
    props: {
      history: Object,
      value: {
        type: Boolean,
        default: false
      },
      mine: Object
    },
    data () {
      return {
        visible: this.value,
        cloneHistory: null
      }
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
        this.visible = false
        this.$emit('input', this.visible)
      },
      handlePageChange (page) {
        this.$parent.$parent.handlePageChange(page)
      },
      makeCloneHistory () {
        let history = deepCopy(this.history)
        if (!history.records) return
        history.records.forEach(item => {
          item.mine = item.sender === this.mine.id
        })
        return history
      }
    },
    filters: {
      formatDate
    },
    components: {
      Page
    },
    watch: {
      value (newV) {
        this.visible = newV
      },
      history: {
        handler () {
          this.cloneHistory = this.makeCloneHistory()
        },
        deep: true
      }
    }
  }
</script>
<style lang="scss" scoped>
  .chatlog {
    width: 350px;
    overflow: hidden;
    .chatlog-wrap {
      width: 100%;
      height: 100%;
      border-left: 1px solid rgba(0,0,0,.14);
      background: #fff;
      .title {
        height: 40px;
        line-height: 40px;
        background: #fff;
        font-size: 14px;
        padding: 0 15px;
        border-bottom: 1px solid #e7e7e7;
        .close {
          float: right;
          font-size: 24px;
          font-weight: bold;
          cursor: pointer;
          height: 30px;
          line-height: 30px;
        }
      }
    }
    .log-list{
      margin: 0 auto 30px;
      padding: 0 10px;
      height: 100%;
      overflow: auto;
    }
    .log-item{
      box-sizing: border-box;
      width: 100%;
      padding: 5px;
    }
    .avatar{
      float: left;
      width: 30px;
      height: 30px;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .message{
      display: inline-block;
      margin: 4px 15px;
      padding: 3px 5px;
      font-size: 14px;
      background: #fff;
      font-size: 12px;
    }
    .mine {
      overflow: hidden;
      padding-right: 10px;
      text-align: right;
      .avatar{
        float: right;
      }
    }
    .time {
      text-align: center;
      span {
        font-size: 12px;
        display: inline-block;
        padding: 3px 8px;
        color: #000;
        border-radius: 3px;
      }
    }
    .page {
      position: sticky;
      width: 100%;
      background: #fff;
      bottom: 0;
      height: 33px;
      .rs-pagination{
        text-align: right;
      }
      .rs-pagination .pagination{
        margin: 0;
      }
    }
  }
  .collapse-enter-active, .collapse-leave-active {
    transition: all 0.5s;
  }
  .collapse-enter, .collapse-leave-to {
    width: 0;
    transform: translate3d(350px);
  }
</style>