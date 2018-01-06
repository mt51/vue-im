<template>
  <div>
    <vue-im @page-change="pageChange" :lists="lists" :mine="mine" :history="history" @chat-change="handleChange" @send="handleSend" imageUpload url="123" :notice="true" ref="vueim" brief :chat-with="currentChat"></vue-im>
  </div>
</template>
<script>
  import lists from './lists.js'

  export default {
    data () {
      return {
        lists: [],
        mine: {},
        history: {},
        sock: null,
        currentChat: {}
      }
    },
    created () {
      this.lists = lists.list
      this.mine = lists.mine
      this.history = lists.log
      this.currentChat = {
        'username': '贤心',
        'id': '100001',
        'avatar': '//tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg'
      }
    },
    methods: {
      handleChange () {
        this.history = {}
      },
      handleSend (message) {
        this.$refs.vueim.getMessage({
          content: '你好呀',
          avatar: this.lists[0].avatar,
          sender: this.lists[0].id,
          recver: this.mine.id,
          time: new Date().getTime(),
          sendername: this.lists[0].username,
          recvername: this.mine.username
        })
      },
      pageChange (page) {
        console.log(page)
      }
    },
    mounted () {
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