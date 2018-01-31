<template>  
  <div class="wrapper">
    <div class="container">
      <div class="vue-im" ref="imdrag" :class="{'brief': brief}" v-show="!miniVisible">
        <div>
          <Mine :mine="mine" v-if="!brief" />
          <Middle :lists="cloneLists" :currentChat="currentChat" v-if="!brief" />
        </div>
        <ChatBox :imageUpload="imageUpload" :currentChat="currentChat" :lists="cloneLists" :mine="mine" :message="message" :ext="ext" :url="url" :type="type" :history="history" :upload-name="uploadName"></ChatBox>
      </div>
      <div class="mini" v-show="miniVisible" @click="handleMini">
        <img :src="miniicon">
      </div>
      <div class="newmsg" v-show="visibleNewMsg" @click="handleOpenNewMsg(null)">
        <span>新消息</span>
      </div>
      <audio v-if="voice" :src="voice" ref="voice"></audio>
    </div>
  </div>
</template>
<script>
  import Mine from '@/components/mine.vue'
  import Middle from '@/components/middle.vue'
  import ChatBox from '@/components/chatbox.vue'
  import { deepCopy, device } from '@/util/utils'
  import localData from '@/util/data.js'
  import 'font-awesome/css/font-awesome.min.css'

  export default {
    name: 'vue-im',
    props: {
      history: {
        type: Object,
        default () {
          return {}
        }
      },
      lists: {
        type: Array,
        default () {
          return []
        }
      },
      mine: {
        type: Object,
        required: true
      },
      mini: {
        type: Boolean,
        default: false
      },
      miniicon: {
        type: String,
        default: '//cn.vuejs.org/images/logo.png'
      },
      notice: Boolean,
      brief: {
        type: Boolean,
        default: false
      },
      chatWith: {
        type: Object,
        default: null
      },
      voice: {
        type: String
      },
      imageUpload: {
        type: Boolean,
        default: false
      },
      ext: {
        type: Array,
        default () {
          return []
        }
      },
      url: String,
      type: {
        type: String,
        default: 'POST'
      },
      uploadName: {
        type: String,
        default: 'image'
      }
    },
    data () {
      return {
        currentChat: this.makeCurrentChat(),
        cloneLists: this.makeCloneLists(),
        message: null,
        miniVisible: this.mini,
        visibleNewMsg: false,
        newMsgLists: [],
        historyVisible: false
      }
    },
    methods: {
      makeCurrentChat () {
        const currentChat = localData.readData('currentChat')
        if (currentChat) {
          this.$emit('on-chat-change', currentChat)
        }
        return currentChat
      },
      makeCloneLists () {
        if (!this.mine) return
        const data = localData.readData(this.mine.id)
        let cloneLists = deepCopy(this.lists)
        if (!data) return cloneLists
        cloneLists.forEach(item => {
          item.count = 0
          const tempLog = data.history[item.id]
          if (tempLog && tempLog.length > 0) {
            item.chatlog = tempLog[tempLog.length - 1].content
            item.chatlogType = tempLog[tempLog.length - 1].type || 'text'
            item.time = tempLog[tempLog.length - 1].time
          } else {
            item.chatlog = ''
            item.time = ''
          }
        })
        return cloneLists
      },
      handleChatChange (item) {
        this.currentChat = item
        this.$emit('on-chat-change', item)
        this.currentChat.count = 0
      },
      emitSend (message) {
        this.$emit('on-send', message)
      },
      handleSearch (keyword) {
        this.cloneLists = this.makeCloneLists()
        this.cloneLists = this.cloneLists.filter(item => {
          return item.username.indexOf(keyword) !== -1
        })
      },
      handleClearSearch () {
        this.cloneLists = this.makeCloneLists()
      },
      getMessage (message) {
        this.handleVoice()
        message.mine = false
        if (this.brief) {
          this.message = message
          return
        }
        const current = this.cloneLists.find(item => {
          return item.id === message.sender
        })
        if (!current) {
          message.new = true
          this.visibleNewMsg = true
          this.newMsgLists = message
        } else if (message.sender === this.currentChat.id) {
          this.message = message
        } else {
          this.cloneLists.forEach(item => {
            if (item.id === message.sender) {
              item.count += 1
            }
          })
        }
      },
      updateCloneListsChatlogById (id) {
        const data = localData.readData(this.mine.id)
        const history = data.history[id]
        if (history) {
          this.cloneLists.forEach(item => {
            if (item.id === id) {
              item.chatlog = history[history.length - 1].content
              item.chatlogType = history[history.length - 1].type
              item.time = history[history.length - 1].time
            }
          })
        } else {
          return this.cloneLists
        }
      },
      handleMini (status) {
        this.miniVisible = typeof status === 'boolean' ? status : !this.miniVisible
      },
      newMessageNotice (message) {
        const _this = this
        if (this.notice && this.checkNotification()) {
          const notification = new Notification(`来自${message.sender}的新消息`, {
            body: message.content,
            icon: message.avatar
          })
          notification.onclick = function () {
            notification.close()
            _this.handleOpenNewMsg(message)
          }
        }
      },
      newMessageInlists (messageLists) {
        this.visibleNewMsg = true
      },
      checkNotification () {
        if (!('Notification' in window)) {
          return false
        } else if (Notification.permission === 'granted') {
          return true
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission((permission) => {
            if (permission === 'granted') {
              return true
            }
          })
        }
      },
      handleOpenNewMsg (message) {
        message = message || this.newMsgLists
        const tempData = {
          username: message.username,
          id: message.sender,
          avatar: message.avatar,
          chatlog: message.content
        }
        this.visibleNewMsg = false
        this.cloneLists.unshift(tempData)
        this.currentChat = tempData
        this.message = message
      },
      formatNewMsgLists (message) {
        let messageLists = {}
        if (!messageLists.hasOwnProperty(message.sender)) {
          messageLists[message.sender] = []
        }
        messageLists[message.sender].push(message)
        return messageLists
      },
      handlePageChange (page) {
        this.$emit('on-page-change', page)
      },
      handleVoice () {
        if (!this.voice) return
        const IE = device()
        if (IE && IE < 9) return
        this.$refs.voice.play()
      }
    },
    components: {
      Mine,
      Middle,
      ChatBox
    },
    watch: {
      lists: {
        handler () {
          this.cloneLists = this.makeCloneLists()
          this.currentChat = this.makeCurrentChat()
        },
        deep: true
      }
    },
    created () {
      if (this.brief && !this.chatWith) {
        throw new Error('props chatWith is required when brief is true')
      }
      if (!this.mine) throw new Error('Missing required prop: "mine"')
      const data = localData.readData(this.mine.id)
      const tempData = {
        avatar: this.mine.avatar,
        id: this.mine.id,
        username: this.mine.username,
        history: data ? data.history : {}
      }
      localData.saveData(this.mine.id, tempData)
      if (this.imageUpload && this.url === undefined) {
        throw new Error('props url is required')
      }
    }
  }
</script>
<style lang="scss">
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
  }
  .wrapper {
    width: 100%;
    height: 100%;
      ::-webkit-scrollbar {
      width: 5px;
      height: 12px;
      -webkit-border-radius: 40%;
    }
    ::-webkit-scrollbar-thumb {
      background: #c3c3c3;
      -webkit-border-radius: 12px;
    }
    .container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .vue-im {
      display: flex;
      justify-content: space-between;
      width: 80%;
      min-width: 996px;
      height: 600px;
      box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
    }
    .brief {
      width: 60%;
    }
    .mini {
      position: fixed;
      bottom: 30px;
      right: 40px;
      cursor: pointer;
      width: 36px;
      height: 36px;
      border-radius: 5px;
      padding: 5px;
      box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .newmsg {
      position: fixed;
      bottom: 20px;
      left: 50%;
      margin-left: -30px;
      animation: twinkle 2s ease infinite;
      width: 60px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      // box-shadow: 0 2px 2px 0 #e45050, 0 3px 1px -2px #e45050, 0 1px 5px 0 #e45050;
      border: 1px solid #e45050;
      z-index: 100;
    }
  }
  @keyframes twinkle {
    0% {opacity: 1}
    25% {opacity: 0}
    50% {opacity: 1}
    75% {opacity: 0}
    100% {opacity: 1}
  }
</style>
