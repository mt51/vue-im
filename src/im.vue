<template>  
  <div class="vueim-wrapper">
    <Alert></Alert>
    <div class="vue-im" ref="imdrag" :class="{'brief': brief}" v-show="!miniVisible">
      <LeftBar :mine="mine" v-if="!brief"></LeftBar>
      <middle :lists="cloneLists" :currentChat="currentChat" v-if="!brief"></middle>
      <ChatBox :imageUpload="imageUpload" :currentChat="currentChat" :lists="cloneLists" :mine="mine" :message="message" :ext="ext" :url="url" :type="type"></ChatBox>
    </div>
    <log :history="cloneHistory" v-if="historyVisible"></log>
    <div class="mini" v-show="miniVisible" @click="handleMini">
      <img :src="miniicon">
    </div>
    <div class="newmsg" v-show="visibleNewMsg" @click="handleOpenNewMsg(null)">
      <span>新消息</span>
    </div>
    <audio v-if="voice" :src="voice" ref="voice"></audio>
  </div>
</template>
<script>
  import LeftBar from '@/components/leftbar.vue'
  import middle from '@/components/middle.vue'
  import ChatBox from '@/components/chatbox.vue'
  import Alert from '@/components/message.vue'
  import log from '@/components/chatlog.vue'
  import { deepCopy, device } from '@/util/utils'
  import localData from '@/util/data.js'

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
      }
    },
    data () {
      return {
        currentChat: this.makeCurrentChat(),
        cloneLists: this.makeCloneLists(),
        cloneHistory: this.makeCloneHistory(),
        message: null,
        miniVisible: this.mini,
        visibleNewMsg: false,
        newMsgLists: [],
        historyVisible: false
      }
    },
    methods: {
      makeCurrentChat () {
        return localData.readData('currentChat')
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
            item.chatlogType = tempLog[tempLog.length - 1].type
            item.time = tempLog[tempLog.length - 1].time
          } else {
            item.chatlog = ''
            item.time = ''
          }
        })
        return cloneLists
      },
      makeCloneHistory () {
        let history = deepCopy(this.history)
        if (!history.records) return
        history.records.forEach(item => {
          item.mine = item.sender === this.mine.id
        })
        return history
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
      handleHistoryVisible () {
        this.historyVisible = !this.historyVisible
        if (status) {
          this.$emit('on-view-history', this.currentChat)
        }
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
      LeftBar,
      middle,
      ChatBox,
      log,
      Alert
    },
    watch: {
      lists: {
        handler () {
          this.cloneLists = this.makeCloneLists()
          this.currentChat = this.cloneLists[0]
        },
        deep: true
      }
    },
    created () {
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
<style lang="scss" scoped>
  .vueim-wrapper {
    .vue-im {
      display: flex;
      justify-content: space-between;
      width: 800px;
      height: 600px;
      position: fixed;
      top: 50%;
      left: 50%;
      margin: -300px 0 0 -400px;
      box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
    }
    .brief{
      width: 600px;
      height: 600px;
      margin: -300px 0 0 -300px;
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
      box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
      border: 1px solid #000;
      z-index: 100;
      cursor: pointer;
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