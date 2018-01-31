<template>
  <vue-im @page-change="pageChange" :lists="lists" :mine="mine" :history="history" @chat-change="handleChange" @on-send="handleSend" imageUpload url="http://localhost:3000/upload"  :notice="true" ref="vueim"></vue-im>
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
        // let avatar
        // this.lists.forEach(function (item) {
        //   if (item.id === message.recver) {
        //     avatar = item.avatar
        //   }
        // })
        // this.$refs.vueim.getMessage({
        //   content: `你好呀,我是${message.recvername}`,
        //   avatar: avatar,
        //   sender: message.recver,
        //   recver: this.mine.id,
        //   time: new Date().getTime(),
        //   sendername: message.recvername,
        //   recvername: this.mine.username
        // })
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
