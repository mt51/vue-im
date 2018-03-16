<template>
  <vue-im 
    :lists="lists"
    :mine="mine"
    :history="history"
    @on-chat-change="handleChange"
    @on-send="handleSend"
    action="http://localhost:3000/upload"
    :notice="true"
    ref="vueim"
    :groups-list="groups"
    :members-list="membersList"
    @on-view-members="handleViewMembers"
    @on-add-group="handleAddGroup"
    @on-page-change="handlePageChange"
    @on-view-history="handleViewHistory"
    :max-size="20"
    :un-read-list="unReadList"
    :chat="currentChat"
  ></vue-im>
</template>
<script>
  // import lists from './lists.js'
  import axios from 'axios'

  export default {
    data () {
      return {
        lists: [],
        mine: {},
        history: {},
        sock: null,
        currentChat: {},
        groups: [],
        membersList: [],
        unReadList: []
      }
    },
    created () {
      let self = this
      axios.get('http://localhost:3000/lists')
        .then(function (response) {
          const lists = response.data
          self.lists = lists.list
          self.mine = lists.mine
          self.currentChat = {
            'username': '贤心',
            'id': '100001',
            'avatar': '//tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg'
          }
          self.groups = lists.groups
        })
      // axios.get('http://localhost:3000/new')
      //   .then(function (response) {
      //     self.unReadList = response.data
      //   })
    },
    methods: {
      handleChange (chat) {
        console.log(chat)
      },
      handleSend (message) {
        // let avatar
        // this.lists.forEach(function (item) {
        //   if (item.id === message.recver) {
        //     avatar = item.avatar
        //   }
        // })
        this.$refs.vueim.getMessage({
          content: `你好呀,我是${message.username}`,
          avatar: message.avatar,
          sender: message.id,
          recver: this.mine.id,
          time: new Date().getTime(),
          sendername: message.username,
          recvername: this.mine.username,
          type: 'friend',
          chatlogType: 'text'
        })
      },
      handlePageChange (page) {
        console.log('----------------历史记录分页变化---------------------')
        console.log(page)
      },
      handleViewMembers () {
        let self = this
        axios.get('http://localhost:3000/member')
          .then(function (response) {
            self.membersList = response.data
          })
      },
      handleAddGroup (data) {
        console.log('----------------添加群组---------------------')
        console.log(data)
      },
      handleViewHistory (data) {
        console.log('----------------查看历史记录---------------------')
        var self = this
        axios.get('http://localhost:3000/history')
          .then(function (response) {
            self.history = response.data
          })
      }
    },
    mounted () {
      // setTimeout(() => {
      //   this.handleSend()
      // }, 5000)

      // setInterval(() => {
      //   this.handleSend()
      // }, 3000)

      // this.sock = new SockJS('http://localhost:3000/websock', null, {transports: 'websocket'})
      // this.sock.onopen = event => {
      //   console.log('open')
      // }

      // this.sock.onmessage = event => {
      //   console.log(event)
      //   const message = JSON.parse(event.data)
      //   this.$refs.rsim.getMessage(message)
      // }

      // this.sock.onclose = event => {
      //   console.log('close')
      // }
    }
  }
</script>
