<template>  
  <div class="wrapper">
    <div class="container" :class="skin">
      <TheHeader :lists="lists" :mine="mine" :store="store" :brief="brief"></TheHeader>
      <div class="vue-im" ref="imdrag" v-show="!miniVisible">
        
        <Contacts 
          v-show="currentTab === 'user' && !brief"
          @on-view-members="handleViewGroupMembers"
          @on-add-group="handleAddNewGroup"
          :groups-list="groupsList"
          :friends-list="lists"
          :members-list="membersList"
          :store="store"/>

        <div class="im-chat-wrapper" v-show="currentTab === 'chat'">

          <ChatList :store="store"/>
          <ChatBox
            :mine="mine"
            :ext="ext"
            :max-size="maxSize"
            :action="action"
            :history="history"
            :upload-name="uploadName"
            :store="store"/>

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
  import { device, typeOf } from '@/util/utils'
  import storage from '@/util/storage'
  import IMStore from '@/store/store'

  export default {
    name: 'vue-im',
    props: {
      history: {
        type: Object,
        default () {
          return {
            total: 0,
            size: 10,
            records: []
          }
        }
      },
      lists: {
        type: Array,
        default () {
          return []
        }
      },
      unReadList: {
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
      voice: {
        type: String,
        default: require('./assets/default.mp3')
      },
      ext: {
        type: Array,
        default () {
          return []
        }
      },
      action: String,
      uploadName: {
        type: String,
        default: 'image'
      },
      membersList: {
        type: Array,
        default () {
          return []
        }
      },
      maxSize: Number,
      brief: {
        type: Boolean,
        default: false
      },
      chat: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      const store = new IMStore(this)
      return {
        miniVisible: this.mini,
        historyVisible: false,
        store
      }
    },
    methods: {
      initIM () {
        if (!this.mine || !this.mine.id) {
          return
        } else {
          this.store.states.mine = this.mine
          this.store.commit('updateUserInfoCenter', this.mine)
          const localData = storage.readData('iminfo')
          let currentChat = storage.readData('currentChat')
          if (currentChat && currentChat.hostId === this.mine.id) {
            this.store.commit('setCurrentChat', currentChat)
          } else {
            this.store.commit('setCurrentChat', null)
          }
          if (this.brief && this.chat) {
            this.chat.type = this.chat.type || 'friend'
            currentChat = this.chat
            this.store.commit('updateUserInfoCenter', this.chat)
            this.store.commit('setCurrentChat', this.chat)
            this.store.commit('setCurrentTab', 'chat')
          }
          let tempData = {
            avatar: this.mine.avatar,
            id: this.mine.id,
            username: this.mine.username
          }
          if (localData && localData.id === this.mine.id) {
            tempData.history = localData.history
            tempData.chatList = localData.chatList
          } else {
            tempData.history = {}
            tempData.chatList = []
          }
          storage.saveData('iminfo', tempData)
          let chatLogsList = tempData.chatList
          if (currentChat !== null && currentChat !== undefined) {
            const flag = chatLogsList.find(item => {
              return item.id === currentChat.id
            })
            if (!flag) {
              chatLogsList.unshift(currentChat)
            }
          }
          this.store.commit('setLocalHistory', tempData.history)
          this.store.commit('updateChatLogsList', chatLogsList)
        }
      },
      emitSend (message) {
        this.$emit('on-send', message)
      },
      getMessage (message) {
        this.handleVoice()
        this.store.commit('getNewMsg', message)
        message.username = message.sendername
        message.id = message.sender
        message.count = this.store.states.newMsgLists[message.id].length
        if (this.store.states.currentChat === null) {
          this.store.commit('setCurrentChat', message)
        }
        this.store.commit('updateUserInfoCenter', message)
        this.store.commit('updateChatLogsList', message)
        this.store.commit('updateLocalHistory', message)
      },
      // 控制消息提示音
      handleVoice () {
        if (!this.voice) return
        const IE = device()
        if (IE && IE < 9) return
        this.$refs.voice.play()
      },
      handleViewGroupMembers (contact) {
        this.$emit('on-view-members', contact)
      },
      handleAddNewGroup (group) {
        this.$emit('on-add-group', group)
      },
      handleHistoryVisible (chat) {
        this.$emit('on-view-history', chat)
      },
      handlePageChange (page) {
        this.$emit('on-page-change', page)
      },
      handleChatChange (item) {
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
          this.initIM()
        },
        deep: true
      },
      unReadList: {
        handler (newV) {
          if (typeOf(newV) === 'array') {
            newV.forEach(item => {
              this.getMessage(item)
            })
          } else {
            this.getMessage(newV)
          }
        }
      },
      lists: {
        handler (newV) {
          this.store.commit('setUserInfoCenter', newV)
        },
        deep: true
      },
      groupsList: {
        handler (newV) {
          this.store.commit('setUserInfoCenter', newV)
        },
        deep: true
      }
    },
    mounted () {
      this.initIM()
      const skin = storage.getItem('im-skin')
      if (skin && skin !== this.skin) {
        this.store.commit('setSkin', skin)
      }
    },
    computed: {
      skin () {
        return this.store.states.skin
      },
      currentTab () {
        return this.store.states.currentTab
      }
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
      min-height: 540px;
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
