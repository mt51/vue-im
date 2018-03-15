<template>
  <ul class="friends">
    <li class="fg-empty" v-if="cloneFriends.length === 0">暂无好友分组</li>
    <li class="friends-group" v-for="(group, index) in cloneFriends" :key="index" v-else>
      <h5 class="fg-title" @click="toggleListOpen(group)">
        <i class="fa fa-caret-right fg-caret" :class="{'open': group.isOpen}"></i>
        <span class="fg-group-name">{{group.groupname}}</span>
      </h5>
      <ul class="fg-list" v-if="group.isOpen">
        <li class="fg-empty" v-if="!group.list || group.list.length === 0">该分组下暂无好友</li>
        <li class="fg-item" v-for="(friend, findex) in group.list" :key="findex" @click="handleUserItemClick(friend)">
          <img class="fg-avatar" :src="friend.avatar">
          <span class="fg-username">{{friend.username}}</span>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'UserList',
    props: {
      friendsList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        cloneFriends: [],
        clickCount: 0
      }
    },
    methods: {
      makeCloneFriends () {
        let data = []
        let tempData = {
          groupname: '未命名分组',
          id: 100000000,
          list: []
        }
        this.friendsList.forEach(item => {
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
      toggleListOpen (group) {
        group.isOpen = !group.isOpen
      },
      handleUserItemClick (contact) {
        contact.type = 'friend'
        this.clickCount++
        setTimeout(() => {
          if (this.clickCount >= 2) {
            this.$parent.handleOpenChatBox(contact)
          } else {
            this.$parent.handleCurrentConcatChange(contact)
          }
          this.clickCount = 0
        }, 200)
      }
    },
    watch: {
      friendsList: {
        handler: function (newv) {
          this.cloneFriends = this.makeCloneFriends()
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .friends {
    width: 100%;
    margin-top: 10px;
    height: 98%;
    overflow: auto;
    font-size: 14px;
    &-group {
      cursor: pointer;
      .fg-title {
        margin-left: 10px;
        height: 26px;
        line-height: 26px;
      }
    }
    .fg-caret {
      transition: all 0.35s;
      transform: rotate(0);
      margin-right: 5px;
      &.open {
        transform: rotate(90deg)
      }
    }
    .fg-item {
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
    }
    .fg-avatar {
      width: 30px;
      height: 30px;
      margin-right: 10px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .fg-empty {
      text-align: center;
      color: #ccc;
      padding-top: 30px;
    }
  }
</style>
