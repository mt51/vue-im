<template>
  <div class="wrapper">
    <div class="container" :class="skin">
      <TheHeader :mine="mine" :store="store"></TheHeader>
      <div class="vue-im" ref="imdrag">
        <Contacts
          v-show="currentTab === 'user'"
          :store="store"
          :friends="friends"
        />

        <div class="im-chat-wrapper" v-show="currentTab === 'chat'">
          <ChatList :store="store" />
          <ChatBox
            :store="store"
            :action="action"
            :uploadName="uploadName"
            :maxSize="maxSize"
            :ext="ext"
          />
        </div>
      </div>
      <audio :src="voice" ref="voice"></audio>
    </div>
  </div>
</template>
<script>
import ChatList from './components/ChatList/ChatList.vue';
import ChatBox from './components/ChatBox/ChatBox.vue';
import Contacts from './components/Contacts/Contacts';
import TheHeader from './components/Header/TheHeader';
// import { device, typeOf, objIsEmpty } from './util/utils'
import { objIsEmpty, deepCopy } from './util/utils';
import storage from './util/storage';
import IMStore from './store/store';

export default {
  name: 'vue-im',
  props: {
    mine: {
      type: Object,
      required: true
    },
    currentChat: {
      type: Object,
      default() {
        return null;
      }
    },
    voice: {
      type: String,
      default: require('./assets/default.mp3')
    },
    friends: {
      type: Array,
      default() {
        return [];
      }
    },
    action: {
      type: String,
      default: ''
    },
    uploadName: {
      type: String,
      default: 'file'
    },
    maxSize: {
      type: Number,
      default: 0
    },
    ext: {
      type: Array,
      default() {
        return [];
      }
    },
    unReadList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    const store = new IMStore(this);
    return {
      miniVisible: this.mini,
      historyVisible: false,
      store
    };
  },
  provide() {
    return {
      handleEmitSendEvent: this.handleEmitSendEvent
    };
  },
  methods: {
    initIM() {
      if (!this.mine.id) {
        throw Error('property id of mine is required');
      }
      this.store.commit('initUserInfoCenter', [this.currentChat, this.mine]);
      this.store.commit('setMine', this.mine);
      this.initStorage();
      if (this.currentChat && !objIsEmpty(this.currentChat)) {
        this.store.commit('setCurrentTab', 'chat');
        this.store.commit('updateChatLog', this.currentChat);
        this.store.commit('setCurrentChat', this.currentChat.id);
      }
      this.$emit('initFinish');
      console.log('IM 初始化成功');
    },
    initStorage() {
      const initStorageData = {
        hostId: this.mine.id,
        currentChatId: this.currentChat ? this.currentChat.id : null,
        history: null
      };
      const localStorageData = JSON.parse(storage.getItem('vue-im'));
      if (localStorageData === null) {
        storage.setItem('vue-im', initStorageData);
      } else {
        if (initStorageData.hostId !== localStorageData.hostId) {
          storage.removeItem('vue-im');
          storage.setItem('vue-im', initStorageData);
        } else {
          const tempObj = Object.assign(initStorageData, localStorageData);
          this.store.commit('setCurrentChat', tempObj.currentChatId);
          this.store.commit('initHistory', tempObj.history);
          this.store.commit('initChatLog', tempObj.chatLog);
          this.store.commit('updateNewMsgList', tempObj.newMsgLists);
          storage.setItem('vue-im', initStorageData);
        }
      }
    },
    handleEmitSendEvent(data) {
      this.$emit('on-send', data);
    }
  },
  components: {
    ChatBox,
    TheHeader,
    ChatList,
    Contacts
  },
  mounted() {
    const skin = storage.getItem('im-skin') || 'red';
    this.store.commit('setSkin', skin);
  },
  computed: {
    skin() {
      return this.store.states.skin;
    },
    currentTab() {
      return this.store.states.currentTab;
    }
  },
  watch: {
    unReadList: {
      handler(nv) {
        if (!nv) return;
        this.$on('initFinish', () => {
          nv.forEach(c => {
            let tempItem = deepCopy(c);
            tempItem.id = tempItem.sender;
            this.store.commit('setHistory', tempItem);
            const tempChat = {
              id: c.sender,
              lastChat: c.content,
              lastChatTime: c.time,
              username: c.sendername,
              avatar: c.avatar,
              chatlogType: c.chatlogType
            };
            this.store.commit('updateChatLog', tempChat);
            this.store.commit('setNewMsgList', tempChat);
          });
        });
      },
      immediate: true
    }
  }
};
</script>
<style></style>
