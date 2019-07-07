<template>
  <ul class="friends">
    <li class="fg-empty" v-if="cloneFriends.length === 0">暂无好友分组</li>
    <li
      class="friends-group"
      v-for="(group, index) in cloneFriends"
      :key="index"
      v-else
    >
      <h5 class="fg-title" @click="toggleListOpen(group)">
        <i
          class="fa fa-caret-right fg-caret"
          :class="{ open: group.isOpen }"
        ></i>
        <span class="fg-group-name">{{ group.groupname }}</span>
      </h5>
      <ul class="fg-list" v-if="group.isOpen">
        <li class="fg-empty" v-if="!group.list || group.list.length === 0">
          该分组下暂无好友
        </li>
        <li
          class="fg-item"
          v-for="(friend, findex) in group.list"
          :key="findex"
          @click="handleUserItemClick(friend)"
        >
          <img class="fg-avatar" :src="friend.avatar" />
          <span class="fg-username">{{ friend.username }}</span>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script>
import { typeOf } from '@/util/utils'
export default {
  name: 'UserList',
  props: {
    friends: Array,
    store: Object
  },
  data() {
    return {
      cloneFriends: [],
      clickCount: 0
    }
  },
  methods: {
    makeCloneFriends() {
      let data = []
      let tempData = {
        groupname: '未命名分组',
        id: 100000000,
        list: []
      }
      this.friends.forEach(item => {
        if (!item.groupname) {
          tempData.list.push(item)
        } else {
          data.push(item)
        }
      })
      data.push(tempData)
      data.map(item => {
        item.isOpen = false
      })
      return data
    },
    toggleListOpen(group) {
      group.isOpen = !group.isOpen
    },
    handleUserItemClick(contact) {
      contact.type = 'friend'
      this.clickCount++
      setTimeout(() => {
        if (this.clickCount >= 2) {
          this.handleOpenChatBox(contact)
        } else {
          this.handleCurrentConcatChange(contact)
        }
        this.clickCount = 0
      }, 200)
    }
  },
  watch: {
    friends: {
      handler: function(nv) {
        if (typeOf(nv) === 'array') {
          this.cloneFriends = this.makeCloneFriends()
          nv.forEach(c => {
            this.store.commit('updateUserInfoCenter', c)
          })
        }
      },
      immediate: true
    }
  },
  inject: ['handleOpenChatBox', 'handleCurrentConcatChange']
}
</script>
<style scoped>
@import url('./index.pcss');
</style>
