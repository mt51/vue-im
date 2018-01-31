<template>
  <div class="chat-box">
    <div class="chat-box-head" v-if="currentChat" v-drag="target">
      <span class="username">{{currentChat.username}}</span>
      <span class="mini-mark" @click="handleMini">-</span>
    </div>
    <div class="main-chat-wrap">
      <div class="main-chat-container">
        <div class="main-chat" ref="chat-main" v-if="currentChat">
          <ul class="chat-list" ref="chat-list">
            <li class="chat-item clearfix" v-for="(item, index) in records" :class="{'mine': item.mine}">
              <div class="time" v-if="handleTimeVisible(item, index)"><span>{{item.time | formatDate }}</span></div>
              <div class="avatar">
                <img :src="item.avatar">
              </div>
              <div class="chats" v-if="item.type === 'text'" v-html="item.content"></div>
              <div class="chats" :class="{'chats-image': item.type === 'image'}" @click="handlePrevImage" v-html="item.content" v-else></div>
            </li>
          </ul>
        </div>
        <div class="chat-input" v-if="currentChat" :class="{'focus': focusClass}">
          <Emoji v-show="emojiVisible"></Emoji>
          <form ref="uploadForm"><input type="file" :name="uploadName" class="image-file" ref="file" @change="handleFileChange"></form>
          <div class="tool-bar">
            <span class="tool-bar-item fa fa-smile-o emjoi" @click="handleEmojiVisible(null)"></span>
            <span class="tool-bar-item fa fa-file-image-o" v-if="imageUpload" @click="handleOpenUpload(null)"></span>
            <span class="tool-bar-item history" @click="handleHistoryVisible">历史记录</span>
          </div>
          <div class="input-box">
            <textarea id="textarea" @focus="handleFocus" @blur="handleBlur" @keydown.enter="handleKeydown" @keyup.enter="handleSend" ref="textarea" v-model="sendMessage"></textarea>
          </div>
          <div class="send">
            <button class="send-btn" @click="handleSend">发送</button>
          </div>
        </div>
      </div>
      <ChatLog :history="cloneHistory" v-model="historyVisible" />
    </div>
    <div class="image-prev" v-show="prevVisible && currentImage" @click="handleClosePrev">
      <img :src="currentImage" @click="handleClosePrev">
    </div>
  </div>
</template>
<script>
  import localData from '@/util/data.js'
  import { deepCopy } from '@/util/utils.js'
  import { formatDate } from '@/filters/filters'
  import ajax from '@/util/ajax'
  import drag from '@/directives/drag'
  import Emoji from './emoji'
  import ChatLog from './chatlog'

  export default {
    props: {
      currentChat: Object,
      mine: Object,
      message: Object,
      lists: Array,
      url: String,
      type: String,
      ext: Array,
      uploadName: String,
      imageUpload: Boolean,
      history: Object
    },
    data () {
      return {
        focusClass: false,
        records: [],
        sendMessage: '',
        localData: [],
        cloneLists: deepCopy(this.lists),
        target: null,
        emojiVisible: false,
        currentImage: '',
        prevVisible: false,
        cloneHistory: this.makeCloneHistory(),
        historyVisible: false
      }
    },
    created () {
      if (this.currentChat) {
        this.records = this.makeRecords()
      }
    },
    methods: {
      handleMini () {
        this.$parent.handleMini(true)
      },
      makeRecords () {
        const history = localData.readData(this.mine.id).history
        return history[this.currentChat.id] ? history[this.currentChat.id] : []
      },
      makeCloneHistory () {
        let history = deepCopy(this.history)
        if (!history.records) return
        history.records.forEach(item => {
          item.mine = item.sender === this.mine.id
        })
        return history
      },
      handleFocus () {
        this.focusClass = true
        this.emojiVisible = false
      },
      handleBlur () {
        this.focusClass = false
      },
      handleKeydown (e) {
        e = e || window.event
        if (this.sendMessage.replace(/(^\s*)|(\s*$)/g, '') === '') {
          this.$message({
            message: '消息内容不能为空',
            type: 'warning'
          })
          e.preventDefault()
        }
      },
      handleSend (e) {
        if (this.sendMessage.replace(/(^\s*)|(\s*$)/g, '') === '') {
          return false
        }
        this.$refs.textarea.focus()
        if (this.sendMessage.replace(/(^\s*)|(\s*$)/g, '') === '') {
          this.$message('消息内容不能为空')
          return
        }
        const sendData = {
          content: this.sendMessage,
          mine: true,
          avatar: this.mine.avatar,
          sender: this.mine.id,
          recver: this.currentChat.id,
          time: new Date().getTime(),
          sendername: this.mine.username,
          recvername: this.currentChat.username,
          type: 'text'
        }
        this.records.push(sendData)
        this.saveRecord(sendData)
        this.handleScroll()
        this.sendMessage = ''
        this.$parent.emitSend(sendData)
        this.$parent.updateCloneListsChatlogById(this.currentChat.id)
      },
      handleScroll () {
        this.$nextTick(() => {
          const chatList = this.$refs['chat-list']
          const chatMain = this.$refs['chat-main']
          if (chatMain) {
            chatMain.scrollTop = chatList.clientHeight
          }
        })
      },
      handleTimeVisible (item, index) {
        if (index === 0) {
          return true
        } else {
          return (this.records[index].time - this.records[index - 1].time > 10 * 60 * 1000)
        }
      },
      saveRecord (message) {
        const data = localData.readData(this.mine.id)
        let records = data.history[this.currentChat.id]
        if (!records) {
          records = []
        } else if (records.length > 10) {
          records.shift(0)
        }
        records.push(message)
        data.history[this.currentChat.id] = records
        localData.saveData(this.mine.id, data)
      },
      handleSendEmoji (index) {
        this.$refs.textarea.focus()
        const sendData = {
          content: '<i class="emoji-item emoji' + index + '"></i>',
          mine: true,
          avatar: this.mine.avatar,
          sender: this.mine.id,
          recver: this.currentChat.id,
          time: new Date().getTime(),
          sendername: this.mine.username,
          recvername: this.currentChat.username,
          type: 'emoji'
        }
        this.records.push(sendData)
        this.saveRecord(sendData)
        this.handleScroll()
        this.sendMessage = ''
        this.$parent.emitSend(sendData)
        this.$parent.updateCloneListsChatlogById(this.currentChat.id)
      },
      handleEmojiVisible (status) {
        this.emojiVisible = status === null ? !this.emojiVisible : status
      },
      handleOpenUpload () {
        this.$refs.file.click()
      },
      handleFileChange (e) {
        const file = e.target.files[0]
        const name = e.target.name
        const temp = file.name.split('.')
        const ext = temp[temp.length - 1]
        if (this.ext.length > 0 && this.ext.indexOf(ext) === -1) {
          this.$message({
            messsage: '文件格式不支持',
            type: 'warning'
          })
          return
        }
        this.$refs.uploadForm.reset()
        this.upload(name, file)
      },
      upload (name, file) {
        const self = this
        ajax({
          filename: name,
          file,
          url: this.url,
          type: this.type,
          onSuccess (response) {
            if (response && response.src) {
              self.handleSendImage(response.src)
              self.$message({
                message: '已发送',
                type: 'success'
              })
            } else {
              self.$message({
                message: '发送失败',
                type: 'danger'
              })
            }
          },
          onError (err) {
            self.$message({
              message: err.statusText || '发送失败',
              type: 'danger'
            })
          }
        })
      },
      handleSendImage (src) {
        this.$refs.textarea.focus()
        const sendData = {
          content: '<img style="max-width: 100%;" src="' + src + '"></img>',
          mine: true,
          avatar: this.mine.avatar,
          sender: this.mine.id,
          recver: this.currentChat.id,
          time: new Date().getTime(),
          sendername: this.mine.username,
          recvername: this.currentChat.username,
          type: 'image'
        }
        this.records.push(sendData)
        this.saveRecord(sendData)
        this.handleScroll()
        this.sendMessage = ''
        this.$parent.emitSend(sendData)
        this.$parent.updateCloneListsChatlogById(this.currentChat.id)
      },
      handlePrevImage (e) {
        this.prevVisible = true
        this.currentImage = e.target.src
      },
      handleClosePrev () {
        this.prevVisible = false
        this.currentImage = ''
      },
      handleHistoryVisible () {
        this.historyVisible = true
        this.$emit('on-view-history', this.currentChat)
      }
    },
    mounted () {
      this.handleScroll()
      this.target = this.$parent.$refs.imdrag
    },
    watch: {
      currentChat: {
        handler () {
          this.records = this.makeRecords()
          this.handleScroll()
        },
        deep: true
      },
      message () {
        let message = deepCopy(this.message)
        message.mine = false
        if (message.new) {
          this.records = this.makeRecords().concat([message])
        } else {
          this.$parent.updateCloneListsChatlogById(message.sender)
          this.records.push(message)
        }
        this.saveRecord(message)
        this.handleScroll()
      }
    },
    filters: {
      formatDate
    },
    directives: {
      drag
    },
    components: {
      Emoji,
      ChatLog
    }
  }
</script>
<style lang="scss" scoped>
  .clearfix::after{
    content: " ";
    display:block;
    height: 0;
    overflow: hidden;
    clear: both;
  }
  .chat-box{
    flex: 1;
    background: #fff;
    min-width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-right: 1px solid #e7e7e7;
    .chat-box-head{
      height: 60px;
      line-height: 60px;
      padding:0 20px;
      font-size: 20px;
      border-bottom: 1px solid #e7e7e7;
    }
    .brief-avater {
      display: inline-block;
      width: 45px;
      height: 45px;
      border-radius: 5px;
      vertical-align: middle;
    }
    .username {
      display: inline-block;
      vertical-align: middle;
    }
    .mini-mark {
      float: right;
      font-size: 30px;
      display: inline-block;
      padding:13px 10px 17px;
      margin-top: 15px;
      line-height: 0;
      cursor: pointer;
      &:hover {
        background: #e7e7e7;
      }
    }
    .main-chat{
      margin: 0;
      padding: 0;
      height: 65%;
      overflow: auto;
      border-bottom: 1px solid #e7e7e7;
      .chat-list{
        margin: 0;
        padding: 0 10px;
      }
      .chat-item{
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
      .chats{
        display: inline-block;
        margin: 4px 15px;
        padding: 5px 10px;
        line-height: 1.5;
        font-size: 14px;
        background: #e8e8e8;
        min-width: 30px;
        text-align: center;
        border-radius: 15px;
      }
      .chats-image {
        height: auto;
        padding: 10px;
        width: 79%;
        cursor: pointer;
      }
      .mine {
        overflow: hidden;
        padding-right: 10px;
        text-align: right;
        .chats {
          background: #d8e8f9;
        }
        .avatar{
          float: right;
        }
      }
    }
    .chat-input {
      position: relative;
      height: 160px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 10px;
      .tool-bar {
        height: 40px;
        line-height: 40px;
        .tool-bar-item {
          margin-right: 5px;
          cursor: pointer;
          color: #777;
          &:hover{
            color: #e45050;
          }
        }
      }
      .emjoi{
        font-size: 20px;
      }
      .history {
        display: inline-block;
        float: right;
        font-size: 14px;
      }
      .input-box {
        flex: 1;
        textarea {
          width: 100%;
          height: 95px;
          line-height: 1.4;
          resize: none;
          border: none;
          outline: none;
          background: #fff;
          overflow: auto;
          &:focus {
            background: #fff;
          }
        }
      }
      .send {
        text-align: right;
        height: 46px;
      }
      .send-btn {
        line-height: 26px;
        width: 60px;
        background: #e45050;
        color: #fff;
        border: 1px solid #e7e7e7;
        font-size: 14px;
        border-radius: 3px;
        margin-right: 10px;
        cursor: pointer;
      }
    }
    .time {
      text-align: center;
      span {
        display: inline-block;
        padding: 3px 8px;
        color: #999;
        border-radius: 3px;
        font-size: 14px;
      }
    }
    .emoji-item {
      margin: 2px 5px 0 5px;
    }
    .image-file {
      position: absolute;
      top: 0;
      opacity: 0;
      z-index: -1;
    }
    .image-prev {
      cursor: pointer;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      z-index: 1000;
      background: rgba(0,0,0,0.5);
      justify-content: center;
      align-items: center;
      img {
        max-width: 80%;
      }
    }
  }
  .focus {
    background: #fff;
  }
  .main-chat-wrap {
    display: flex;
    justify-content: space-between;
    height: 539px;
  }
  .main-chat-container {
    flex: 1;
  }
</style>
