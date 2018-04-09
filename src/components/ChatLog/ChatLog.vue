<template>
  <transition name="collapse">
    <div class="chatlog" v-if="visible">
      <div class="chatlog-wrap">
        <div class="title">
          <span>聊天记录</span>
          <span class="close" @click="handleHistoryVisible">&times;</span>
        </div>
        <ul class="log-list">
          <li class="log-item" v-for="(item, index) in cloneHistory" :class="{'mine': item.mine}">
            <div class="time" v-if="handleTimeVisible(item, index)"><span>{{item.time | formatDate(true) }}</span></div>
            <div class="avatar">
              <img :src="item.avatar">
            </div>
            <div class="message message-image" v-if="item.chatlogType === 'image'">
              <img :src="item.content">
            </div>
            <div class="message message-file" v-else-if="item.chatlogType === 'file'">
              <a class="down-link" :href="item.content.src" download><i class="fa fa-cloud-download down-link-icon"></i><span class="down-link-file">{{item.content.name}}</span></a>
            </div>
            <div class="message" v-else v-html="item.content"></div>
          </li>
        </ul>
        <div class="page" v-show="history.total">
          <el-pagination
            layout="prev, pager, next"
            :total="history.total || 0"
            :page-size="history.size"
            @current-change="handlePageChange">
          </el-pagination>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { formatDate } from '@/filters/filters'
  import { deepCopy } from '@/util/utils.js'
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
        cloneHistory: []
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
        if (this.history && !this.records) return
        let history = deepCopy(this.history)
        history.records.forEach(item => {
          item.mine = item.sender === this.mine.id
        })
        return history.records
      }
    },
    filters: {
      formatDate
    },
    watch: {
      value (newV) {
        this.visible = newV
      },
      history: {
        handler () {
          this.cloneHistory = this.makeCloneHistory()
        },
        deep: true,
        immediate: true
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
    .down-link {
      color: #000;
      text-decoration: none;
      cursor: pointer;
      &:hover .down-link-file {
        text-decoration: underline;
      }
    }
    .down-link-icon {
      font-size: 30px;
    }
    .down-link-file {
      display: inline-block;
      margin-left: 10px;
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
