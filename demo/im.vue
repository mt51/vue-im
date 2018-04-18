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
    brief
    :chat="chat"
  ></vue-im>
</template>
<script>
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
        unReadList: [],
        chat: null
      }
    },
    created () {
      this.fetchUserList()
      this.fetchMineInfo()
    },
    methods: {
      fetchUserList () {
        const self = this
        axios.get('http://localhost:3000/api/user/lists')
        .then(function (response) {
          const lists = response.data
          self.lists = lists.data
        })
      },
      fetchMineInfo () {
        const self = this
        axios.get('http://localhost:3000/api/user/info/100000')
        .then(function (response) {
          const userInfo = response.data
          self.mine = userInfo.data[0]
          console.log(self.mine)
        })
      },
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
      handleViewHistory (data) {
        console.log('----------------查看历史记录---------------------')
        var self = this
        console.log(data)
        axios.get('http://localhost:3000/api/log/lists')
          .then(function (response) {
            self.history = response.data
          })
      }
    },
    mounted () {
      setTimeout(() => {
        this.chat = this.currentChat
      }, 0)
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
