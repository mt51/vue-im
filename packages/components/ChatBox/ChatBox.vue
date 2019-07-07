<template>
  <div class="chat-box" v-if="currentChatInfo">
    <div class="chat-box-head" v-drag="target">
      <span class="username">{{ currentChatInfo.username }}</span>
    </div>
    <div class="main-chat-wrap">
      <div class="main-chat-container">
        <div class="main-chat" ref="chat-main">
          <ul class="chat-list" ref="chat-list">
            <li
              class="chat-item clearfix"
              v-for="(item, index) in records"
              :key="index"
              :class="{ mine: item.mine }"
            >
              <div class="time" v-if="handleTimeVisible(item, index)">
                <span>{{ item.time | formatDate }}</span>
              </div>
              <div class="avatar">
                <img :src="getUserAvatar(item.sender)" />
              </div>
              <div
                class="chats chats-image"
                v-if="item.chatlogType === 'image'"
              >
                <img :src="item.content" />
              </div>
              <div
                class="chats chats-file"
                v-else-if="item.chatlogType === 'file'"
              >
                <a class="down-link" :href="item.content.src" download>
                  <i class="fa fa-cloud-download down-link-icon"></i>
                  <span class="down-link-file">
                    {{ item.content.name }}
                  </span>
                </a>
              </div>
              <div class="chats" v-else v-html="item.content"></div>
            </li>
          </ul>
        </div>
        <div class="chat-input" :class="{ focus: focusClass }">
          <Emoji v-show="emojiVisible"></Emoji>
          <div class="tool-bar">
            <span
              class="tool-bar-item fa fa-smile-o emjoi"
              @click="handleEmojiVisible(null)"
            ></span>
            <el-upload
              :action="action"
              v-if="action !== ''"
              :before-upload="handleBeforeUpload"
              :on-success="handleUploadSuccess"
              :on-error="handleUploadError"
              :name="uploadName"
              :show-file-list="false"
              class="file-upload"
            >
              <span class="tool-bar-item fa fa-file-o"></span>
            </el-upload>
            <span class="tool-bar-item history" @click="handleHistoryVisible">
              历史记录
            </span>
          </div>
          <div class="input-box">
            <textarea
              id="textarea"
              @focus="handleFocus"
              @blur="handleBlur"
              @keyup.enter="handleSend"
              ref="textarea"
              v-model="sendMessage"
            ></textarea>
          </div>
          <div class="send">
            <button class="send-btn" @click="handleSend">发送</button>
          </div>
        </div>
      </div>
      <ChatLog v-model="historyVisible" />
    </div>
    <div
      class="image-prev"
      v-show="prevVisible && currentImage"
      @click="handleClosePrev"
    >
      <img :src="currentImage" @click="handleClosePrev" />
    </div>
  </div>
</template>
<script>
import { formatDate } from '../../filters/filters';
import { deepCopy } from '../../util/utils';
import drag from '../../directives/drag';
import Emoji from '../Emoji/Emoji';
import ChatLog from '../ChatLog/ChatLog';

export default {
  props: {
    action: String,
    ext: Array,
    uploadName: String,
    store: Object,
    maxSize: Number
  },
  data() {
    return {
      focusClass: false,
      sendMessage: '',
      target: null,
      emojiVisible: false,
      currentImage: '',
      prevVisible: false,
      historyVisible: false,
      maxByte: this.maxSize ? this.maxSize * 1024 * 1024 : 0,
      fileName: ''
    };
  },
  inject: ['handleEmitSendEvent'],
  methods: {
    handleMini() {
      this.$parent.handleMini(true);
    },
    handleFocus() {
      this.focusClass = true;
      this.emojiVisible = false;
    },
    handleBlur() {
      this.focusClass = false;
    },
    handleScroll() {
      this.$nextTick(() => {
        const chatList = this.$refs['chat-list'];
        const chatMain = this.$refs['chat-main'];
        if (chatMain) {
          chatMain.scrollTop = chatList.clientHeight;
        }
      });
    },
    handleTimeVisible(item, index) {
      if (index === 0) {
        return true;
      } else {
        return (
          this.records[index].time - this.records[index - 1].time >
          10 * 60 * 1000
        );
      }
    },
    handleSend(e) {
      const event = e || window.event;
      if (this.sendMessage.replace(/(^\s*)|(\s*$)/g, '').length > 300) {
        this.$message('发送内容长度不能超过300');
        if (event.keycode === '13') {
          event.preventDefault();
          event.returnValue = false;
        }
        return;
      }
      if (this.sendMessage.replace(/(^\s*)|(\s*$)/g, '') === '') {
        this.$message('消息内容不能为空');
        if (event.keycode === '13') {
          event.preventDefault();
          event.returnValue = false;
        }
        return;
      }
      this.$refs.textarea.focus();
      const sendData = {
        content: this.sendMessage,
        chatlogType: 'text'
      };
      this.afterSend(sendData);
    },
    handleSendEmoji(index) {
      this.$refs.textarea.focus();
      const sendData = {
        content: '<i class="emoji-item emoji' + index + '"></i>',
        chatlogType: 'text'
      };
      this.afterSend(sendData);
    },
    handleSendImage(src) {
      this.$refs.textarea.focus();
      const sendData = {
        content: src,
        chatlogType: 'image'
      };
      this.afterSend(sendData);
    },
    handleSendFile(src) {
      this.$refs.textarea.focus();
      const content = {
        src: src,
        name: this.fileName
      };
      const sendData = {
        content: content,
        chatlogType: 'file'
      };
      this.afterSend(sendData);
    },
    handleBeforeUpload(file) {
      const fileSize = file.size;
      if (this.maxByte && this.maxByte < fileSize) {
        this.$message({
          type: 'error',
          message: `文件大小不能超过${this.maxSize}M`
        });
        return false;
      }
      this.fileName = file.name;
    },
    handleUploadSuccess(data) {
      this.$message({
        type: 'success',
        message: '文件发送成功'
      });
      const src = data.src;
      const fileNameArr = this.fileName.split('.');
      const ext = fileNameArr[fileNameArr.length - 1].toLowerCase();
      const imgExt = ['bmp', 'jpg', 'jpeg', 'png', 'gif'];
      if (imgExt.indexOf(ext) > -1) {
        this.handleSendImage(src);
      } else {
        this.handleSendFile(src);
      }
    },
    handleUploadError() {
      this.$message({
        type: 'error',
        message: '文件发送失败，请重试'
      });
    },
    afterSend(sendData) {
      Object.assign(sendData, {
        mine: true,
        sender: this.mineInfo.id,
        recver: this.currentChatInfo.id,
        time: new Date().getTime()
      });
      this.handleScroll();
      this.sendMessage = '';
      this.handleEmitSendEvent(sendData);
      const tempHistory = deepCopy(sendData);
      tempHistory.id = tempHistory.recver;
      this.store.commit('setHistory', tempHistory);
      const tempData = deepCopy(sendData);
      tempData.id = tempData.recver;
      tempData.lastChat = tempData.content;
      tempData.lastChatTime = tempData.time;
      // tempData.chatlogType = tempData.chatlogType;
      tempData.username = this.userInfoCenter[tempData.id].username;
      tempData.avatar = this.userInfoCenter[tempData.id].avatar;
      this.store.commit('updateChatLog', tempData);
    },
    handleEmojiVisible(status) {
      this.emojiVisible = status === null ? !this.emojiVisible : status;
    },
    handleFileChange(e) {
      const file = e.target.files[0];
      const name = e.target.name;
      const temp = file.name.split('.');
      const ext = temp[temp.length - 1];
      if (this.ext.length > 0 && this.ext.indexOf(ext) === -1) {
        this.$message({
          messsage: '文件格式不支持',
          type: 'warning'
        });
        return;
      }
      this.$refs.uploadForm.reset();
      this.upload(name, file);
    },
    handlePrevImage(e) {
      this.prevVisible = true;
      this.currentImage = e.target.src;
    },
    handleClosePrev() {
      this.prevVisible = false;
      this.currentImage = '';
    },
    handleHistoryVisible() {
      this.historyVisible = true;
      let chat = Object.assign(this.currentChatInfo, this.currentChat);
      this.$parent.handleHistoryVisible(chat);
    },
    chatTypeClass(type) {
      return `chats-${type}`;
    },
    getUserAvatar(userId) {
      if (!this.userInfoCenter[userId]) {
        return '';
      } else {
        return this.userInfoCenter[userId].avatar;
      }
    },
    getUserName(userId) {
      if (!this.userInfoCenter[userId]) {
        return '';
      } else {
        return this.userInfoCenter[userId].username;
      }
    }
  },
  mounted() {
    this.target = this.$parent.$refs.imdrag;
    this.$nextTick(() => {
      this.handleScroll();
    });
  },
  computed: {
    userInfoCenter() {
      return this.store.states.userInfoCenter;
    },
    currentChatId() {
      return this.store.states.currentChatId;
    },
    currentChatInfo() {
      return this.userInfoCenter[this.currentChatId];
    },
    history() {
      return this.store.states.history;
    },
    records() {
      console.log(this.history[this.currentChatId]);
      return this.history[this.currentChatId] || [];
    },
    mineInfo() {
      return this.store.states.mine;
    }
  },
  watch: {
    currentChatId: {
      handler() {
        this.$nextTick(() => {
          this.handleScroll();
        });
      }
    },
    records: {
      handler() {
        this.$nextTick(() => {
          this.handleScroll();
        });
      },
      deep: true
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
};
</script>
<style>
@import url('./index.pcss');
</style>
