<template>
  <vue-im 
    @page-change="pageChange"
    :lists="lists"
    :mine="mine"
    :history="history"
    @chat-change="handleChange"
    @on-send="handleSend"
    imageUpload
    url="http://localhost:3000/upload"
    :notice="true"
    ref="vueim"
    :groups-list="groups"
    :members-list="membersList"
    @on-view-members="handleViewMembers"
  ></vue-im>
</template>
<script>
  // import lists from './lists.js'
  import { get } from '../src/util/ajax'

  export default {
    data () {
      return {
        lists: [],
        mine: {},
        history: {},
        sock: null,
        currentChat: {},
        groups: [],
        membersList: []
      }
    },
    created () {
      let self = this
      get({
        url: 'http://localhost:3000/lists',
        onSuccess (lists) {
          self.lists = lists.list
          self.mine = lists.mine
          self.history = lists.log
          self.currentChat = {
            'username': '贤心',
            'id': '100001',
            'avatar': '//tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg'
          }
          self.groups = lists.groups
        }
      })
    },
    methods: {
      handleChange () {
        this.history = {}
      },
      handleSend (message) {
        console.log(123)
        // let avatar
        // this.lists.forEach(function (item) {
        //   if (item.id === message.recver) {
        //     avatar = item.avatar
        //   }
        // })
        this.$refs.vueim.getMessage({
          content: `你好呀,我是${this.lists[5].username}`,
          avatar: this.lists[5].avatar,
          sender: this.lists[5].id,
          recver: this.mine.id,
          time: new Date().getTime(),
          sendername: this.lists[5].username,
          recvername: this.mine.username,
          type: 'text'
        })
      },
      pageChange (page) {
        console.log(page)
      },
      handleViewMembers () {
        let self = this
        get({
          url: 'http://localhost:3000/member',
          onSuccess (data) {
            self.membersList = data
          }
        })
      }
    },
    mounted () {
      setTimeout(() => {
        this.handleSend()
      }, 5000)
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
