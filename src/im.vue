<template>  
  <div class="wrapper">
    <div class="container" :class="skin">
      <TheHeader :mine="mine" :tab="currentTab" :skin="skin"></TheHeader>
      <div class="vue-im" ref="imdrag" :class="{'brief': brief}" v-show="!miniVisible">
        
        <Contacts 
          v-show="currentTab === 'user'"
          @on-open-chatbox="handleOpenChatBoxFromContact"
          @on-view-members="handleViewGroupMembers"
          :groups-list="groupsList"
          :friends-list="lists"
          :members-list="membersList"/>

        <div class="im-chat-wrapper" v-show="currentTab === 'chat'">

          <ChatList
          :lists="cloneLists"
          :currentChat="currentChat" v-if="!brief" />
          <ChatBox
            :imageUpload="imageUpload"
            :currentChat="currentChat"
            :lists="cloneLists"
            :mine="mine"
            :message="message"
            :ext="ext"
            :url="url"
            :type="type"
            :history="history"
            :upload-name="uploadName" />

        </div>
      </div>
      <audio v-if="voice" :src="voice" ref="voice"></audio>
    </div>
  </div>
</template>
<script>
  import ChatList from '@/components/ChatList/ChatList.vue'
  import ChatBox from '@/components/ChatBox/ChatBox.vue'
  import Contacts from '@/components/Contacts/Contacts'
  import TheHeader from '@/components/Header/TheHeader'
  import { device } from '@/util/utils'
  import storage from '@/util/storage'

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
      groupsList: {
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
        type: String,
        default: require('./assets/default.mp3')
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
      },
      membersList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        currentChat: null,
        cloneLists: [],
        message: null,
        miniVisible: this.mini,
        visibleNewMsg: false,
        newMsgLists: [],
        historyVisible: false,
        currentTab: 'user',
        skin: 'blue'
      }
    },
    methods: {
      makeCurrentChat () {
        const currentChat = storage.readData('currentChat')
        if (currentChat) {
          this.$emit('on-chat-change', currentChat)
        }
        return currentChat
      },
      makeCloneLists () {
        if (!this.mine) return
        const data = storage.readData(this.mine.id)
        let cloneLists = []
        if (!data) return cloneLists
        cloneLists = data.chatList ? data.chatList : []
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
      getMessage (message) {
        this.handleVoice()
        if (!this.currentChat) {
          this.handleChatChange({
            id: message.sender,
            avatar: message.avatar,
            username: message.sendername
          })
        }
        message.mine = false
        this.message = message
        if (this.brief) {
          return
        }
        const current = this.cloneLists.filter(item => {
          return item.id === message.sender
        })
        if (!current[0]) {
          this.cloneLists.unshift({
            id: message.sender,
            username: message.sendername,
            avatar: message.avatar,
            count: 1,
            new: true,
            chatlog: message.content,
            type: message.type,
            time: message.time
          })
        } else if (current[0].id !== this.currentChat.id) {
          this.cloneLists.forEach(item => {
            if (item.id === message.sender) {
              item.count += 1
            }
          })
        }
        this.updateStorageChatList(message)
      },
      updateCloneListsChatlogById (id) {
        const data = storage.readData(this.mine.id)
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
      },
      /**
       * [handleTabChange 控制面板切换]
       * @param  {[string]} type [面板显示类型： chat: 聊天框, user: 用户和群组列表 ]
       * @return {[null]}
       */
      handleTabChange (type) {
        this.currentTab = type
      },
      handleOpenChatBoxFromContact (contact) {
        this.handleTabChange('chat')
        this.$nextTick(() => {
          this.handleChatChange(contact)
        })
        const tempChat = this.cloneLists.filter(item => item.id === contact.id)
        if (tempChat && tempChat.length) {
          let tempChatIndex
          this.cloneLists.forEach((item, index) => {
            if (item.id === contact.id) {
              tempChatIndex = index
            }
          })
          this.cloneLists.splice(tempChatIndex, 1)
        }
        this.cloneLists.unshift(contact)
        this.updateCloneListsChatlogById(contact.id)
        this.updateStorageChatList(contact)
      },
      handleSkinChange (skin) {
        this.skin = skin
      },
      handleChatClose (index) {
        this.cloneLists.splice(index, 1)
        this.currentChat = this.cloneLists[0] || {}
        storage.saveData('currentChat', this.currentChat)
      },
      handleViewGroupMembers (contact) {
        this.$emit('on-view-members', contact)
      },
      updateStorageChatList (userInfo) {
        let localData = storage.readData(this.mine.id)
        const id = userInfo.id || userInfo.sender
        const name = userInfo.username || userInfo.sendername
        const tempData = localData.chatList.filter(item => item.id === id)
        if (!tempData || tempData.length === 0) {
          localData.chatList.push({
            id: id,
            avatar: userInfo.avatar,
            username: name
          })
          storage.saveData(this.mine.id, localData)
        }
      }
    },
    components: {
      ChatBox,
      TheHeader,
      ChatList,
      Contacts
    },
    watch: {
      mine: {
        handler () {
          this.cloneLists = this.makeCloneLists()
          this.currentChat = this.makeCurrentChat() || this.currentChat
          const data = storage.readData(this.mine.id)
          const tempData = {
            avatar: this.mine.avatar,
            id: this.mine.id,
            username: this.mine.username,
            history: data ? data.history : {},
            chatList: this.cloneLists
          }
          storage.saveData(this.mine.id, tempData)
          if (this.imageUpload && this.url === undefined) {
            throw new Error('props url is required')
          }
        },
        deep: true
      }
    },
    mounted () {
      this.skin = storage.getItem('skin') || this.skin
      this.checkNotification()
      if (this.brief && !this.chatWith) {
        throw new Error('props chatWith is required when brief is true')
      }
      if (!this.mine) throw new Error('Missing required prop: "mine"')
    }
  }
</script>
<style lang="scss">
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
    }
    .vue-im {
      display: flex;
      justify-content: space-between;
      width: 100%;
      min-width: 800px;
      height: calc(100% - 61px);
      min-height: 600px;
      box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
    }
    .im-chat-wrapper {
      display: flex;
      text-justify: space-between;
      width: 100%;
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
  }
  @keyframes twinkle {
    0% {opacity: 1}
    25% {opacity: 0}
    50% {opacity: 1}
    75% {opacity: 0}
    100% {opacity: 1}
  }
</style>
