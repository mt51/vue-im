<template>
  <vue-im
    :mine="mine"
    action="http://localhost:3000/upload"
    ref="vueim"
    :friends="friends"
    :currentChat="currentChat"
    :un-read-list="newMsg"
    :groups-list="groups"
  ></vue-im>
</template>
<script>
import axios from 'axios'
import SockJS from 'sockjs-client'

export default {
  data() {
    return {
      friends: [],
      mine: {},
      history: {},
      sock: null,
      currentChat: null,
      groups: [],
      membersList: [],
      unReadList: [],
      chat: null,
      userId: '',
      newMsg: []
    }
  },
  created() {
    this.fetchUserList()
    this.fetchGroupList()
  },
  methods: {
    fetchUserList() {
      const self = this
      axios.get('/users').then(function(response) {
        self.friends = response.data.data
      })
    },
    fetchGroupList() {
      axios.get('/groups').then(function(response) {
        self.groups = response.data.data
      })
    },
    handleChange(chat) {
      console.log(chat)
    },
    handleSend(message) {
      setTimeout(() => {
        const self = this
        this.$refs.vueim.getMessage({
          content: `你好呀,我是${self.chat.username}`,
          avatar: self.chat.avatar,
          sender: self.chat.id,
          recver: self.mine.id,
          time: new Date().getTime(),
          sendername: self.chat.username,
          recvername: self.mine.username,
          type: 'friend',
          chatlogType: 'text'
        })
      })
    },
    handlePageChange(page) {
      console.log('----------------历史记录分页变化---------------------')
      console.log(page)
    },
    handleViewHistory(data) {
      console.log('----------------查看历史记录---------------------')
      var self = this
      console.log(data)
      axios
        .post('http://localhost:3000/api/log/lists', {
          sender: this.mine.id,
          recver: this.currentChat.id
        })
        .then(function(response) {
          self.history = {
            records: response.data.data,
            total: 30,
            size: 10
          }
        })
    },
    fetchChatlog() {
      axios.get('/newMsg').then(res => {
        this.newMsg = res.data
      })
    }
  },
  mounted() {
    this.sock = new SockJS('http://localhost:3000/websocket?', null, {
      transports: 'websocket'
    })
    this.sock.onopen = event => {
      console.log('open')
    }

    this.sock.onmessage = event => {
      console.log(event)
      const message = JSON.parse(event.data)
      this.$refs.rsim.getMessage(message)
    }

    this.sock.onclose = event => {
      console.log('close')
    }
  }
}
</script>
