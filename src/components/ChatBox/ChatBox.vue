<template>
  <div class="chat-box" v-if="currentChat && currentChat.id">
    <div class="chat-box-head" v-drag="target">
      <span class="username">{{currentChat.username}}</span>
    </div>
    <div class="main-chat-wrap">
      <div class="main-chat-container">
        <div class="main-chat" ref="chat-main">
          <ul class="chat-list" ref="chat-list">
            <li class="chat-item clearfix" v-for="(item, index) in records" :class="{'mine': item.mine}">
              <div class="time" v-if="handleTimeVisible(item, index)"><span>{{item.time | formatDate }}</span></div>
              <div class="avatar">
                <img :src="item.avatar">
              </div>
              <div class="chats chats-image" v-if="item.chatlogType === 'image'">
                <img :src="item.content">
              </div>
              <div class="chats chats-file" v-else-if="item.chatlogType === 'file'">
                <a class="down-link" :href="item.content.src" download><i class="fa fa-cloud-download down-link-icon"></i><span class="down-link-file">{{item.content.name}}</span></a>
              </div>
              <div class="chats" v-else v-html="item.content"></div>
            </li>
          </ul>
        </div>
        <div class="chat-input" :class="{'focus': focusClass}">
          <Emoji v-show="emojiVisible"></Emoji>
          <div class="tool-bar">
            <span class="tool-bar-item fa fa-smile-o emjoi" @click="handleEmojiVisible(null)"></span>
            <el-upload :action="action" v-if="action !== ''" :before-upload="handleBeforeUpload" :on-success="handleUploadSuccess" :on-error="handleUploadError" :name="uploadName" :show-file-list="false" class="file-upload">
              <span class="tool-bar-item fa fa-file-o"></span>
            </el-upload>
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
      <ChatLog :history="history" v-model="historyVisible" :mine="mine" />
    </div>
    <div class="image-prev" v-show="prevVisible && currentImage" @click="handleClosePrev">
      <img :src="currentImage" @click="handleClosePrev">
    </div>
  </div>
</template>
<script>
  import storage from '@/util/storage'
  import { formatDate } from '@/filters/filters'
  import { deepCopy } from '@/util/utils'
  import drag from '@/directives/drag'
  import Emoji from '@/components/Emoji/Emoji'
  import ChatLog from '@/components/ChatLog/ChatLog'

  export default {
    props: {
      mine: Object,
      action: String,
      type: String,
      ext: Array,
      uploadName: String,
      history: Object,
      store: Object,
      maxSize: Number
    },
    data () {
      return {
        focusClass: false,
        records: [],
        sendMessage: '',
        target: null,
        emojiVisible: false,
        currentImage: '',
        prevVisible: false,
        historyVisible: false,
        maxByte: this.maxSize ? this.maxSize * 1024 * 1024 : 0,
        fileName: ''
      }
    },
    methods: {
      handleMini () {
        this.$parent.handleMini(true)
      },
      makeRecords () {
        const history = storage.readData('iminfo').history
        return this.currentChat && history[this.currentChat.id] ? history[this.currentChat.id] : []
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
      handleSend (e) {
        if (this.sendMessage.replace(/(^\s*)|(\s*$)/g, '').length > 800) {
          this.$message('发送内容长度不能超过300')
          return false
        }
        if (this.sendMessage.replace(/(^\s*)|(\s*$)/g, '') === '') {
          this.$message('消息内容不能为空')
          return
        }
        this.$refs.textarea.focus()
        const sendData = {
          content: this.sendMessage,
          chatlogType: 'text'
        }
        this.afterSend(sendData)
      },
      handleSendEmoji (index) {
        this.$refs.textarea.focus()
        const sendData = {
          content: '<i class="emoji-item emoji' + index + '"></i>',
          chatlogType: 'emoji'
        }
        this.afterSend(sendData)
      },
      handleSendImage (src) {
        this.$refs.textarea.focus()
        const sendData = {
          content: src,
          chatlogType: 'image'
        }
        this.afterSend(sendData)
      },
      handleSendFile (src) {
        this.$refs.textarea.focus()
        const content = {
          src: src,
          name: this.fileName
        }
        const sendData = {
          content: content,
          chatlogType: 'file'
        }
        this.afterSend(sendData)
      },
      handleBeforeUpload (file) {
        const fileSize = file.size
        if (this.maxByte && this.maxByte < fileSize) {
          this.$message({
            type: 'error',
            message: `文件大小不能超过${this.maxSize}M`
          })
          return false
        }
        this.fileName = file.name
      },
      handleUploadSuccess (data) {
        this.$message({
          type: 'success',
          message: '文件发送成功'
        })
        const src = data.src
        const fileNameArr = this.fileName.split('.')
        const ext = fileNameArr[fileNameArr.length - 1].toLowerCase()
        const imgExt = ['bmp', 'jpg', 'jpeg', 'png', 'gif']
        if (imgExt.indexOf(ext) > -1) {
          this.handleSendImage(src)
        } else {
          this.handleSendFile(src)
        }
      },
      handleUploadError () {
        this.$message({
          type: 'error',
          message: '文件发送失败，请重试'
        })
      },
      afterSend (sendData) {
        Object.assign(sendData, {
          mine: true,
          avatar: this.mine.avatar,
          sender: this.mine.id,
          recver: this.currentChat.id,
          time: new Date().getTime(),
          sendername: this.mine.username,
          recvername: this.currentChat.username,
          id: this.currentChat.id
        })
        this.records.push(sendData)
        this.handleScroll()
        this.sendMessage = ''
        this.$parent.emitSend(sendData)
        this.store.commit('updateLocalHistory', sendData)
      },
      handleEmojiVisible (status) {
        this.emojiVisible = status === null ? !this.emojiVisible : status
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
        this.$parent.handleHistoryVisible(this.currentChat)
      },
      chatTypeClass (type) {
        return `chats-${type}`
      }
    },
    mounted () {
      this.target = this.$parent.$refs.imdrag
    },
    computed: {
      currentChat () {
        return this.store.states.currentChat
      },
      newMsgsList () {
        return this.currentChat && this.store.states.localHistory[this.currentChat.id]
      }
    },
    watch: {
      currentChat: {
        handler () {
          if (this.newMsgsList && this.newMsgsList.length > 0) {
            this.records = deepCopy(this.newMsgsList)
          } else {
            this.records = this.makeRecords()
          }
          this.$nextTick(() => {
            this.handleScroll()
          })
        }
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
    justify-content: space-between;
    border-right: 1px solid #e7e7e7;
    .chat-box-head{
      height: 40px;
      line-height: 40px;
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
      box-sizing: border-box;
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
      height: 35%;
      box-sizing: border-box;
      padding: 0 10px;
      .tool-bar {
        height: 20%;
        line-height: 40px;
        .tool-bar-item {
          margin-right: 8px;
          cursor: pointer;
          color: #777;
          vertical-align: middle;
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
        height: 60%;
        textarea {
          width: 100%;
          height: 100%;
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
        height: 20%;
      }
      .send-btn {
        line-height: 26px;
        width: 60px;
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
    .file-upload {
      display: inline-block;
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
  .focus {
    background: #fff;
  }
  .main-chat-wrap {
    display: flex;
    justify-content: space-between;
    height: calc(100% - 40px);
  }
  .main-chat-container {
    flex: 1;
  }
</style>
