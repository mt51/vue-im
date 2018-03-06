<template>
  <div class="im-contacts">
    <div class="contact-left">
      <div class="contact-tab">
        <ul class="contact-list">
          <li class="concat-item" :class="{'active': contactTab === 'friend'}" @click="handleContact('friend')"><span>好友</span><span class="line"></span></li>
          <li class="concat-item" :class="{'active': contactTab === 'group'}" @click="handleContact('group')"><span>群组</span><span class="line"></span></li>
          <li class="hover_line"></li>
        </ul>
      </div>
      <div class="contact-content">
        <GroupList :groups-list="groupsList" v-show="contactTab === 'group'" />
        <FriendList :friends-list="friendsList" v-show="contactTab === 'friend'" />
      </div>
    </div>
    <ContactCard :contact="currentContact" :members-list="membersList" />
  </div>
</template>
<script>
  import GroupList from '@/components/GroupList/GroupList'
  import FriendList from '@/components/FriendList/FriendList'
  import ContactCard from '@/components/Contacts/ContactCard'
  import { deepCopy } from '@/util/utils'
  export default {
    name: 'Contacts',
    props: {
      membersList: Array,
      groupsList: Array,
      friendsList: Array
    },
    data () {
      return {
        contactTab: 'friend',
        currentContact: null
      }
    },
    methods: {
      handleContact (type) {
        this.contactTab = type
      },
      handleCurrentConcatChange (contact) {
        this.currentContact = contact
        if (contact.type === 'group') {
          this.$emit('on-view-members', contact)
        }
      },
      handleOpenChatBox (contact) {
        const tempCotact = deepCopy(contact)
        delete tempCotact.type
        this.$emit('on-open-chatbox', tempCotact)
      }
    },
    components: {
      GroupList,
      FriendList,
      ContactCard
    }
  }
</script>
<style lang="scss" scoped>
  .im-contacts {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    .contact-left {
      width: 230px;
      height: 100%;
    }
    .contact-tab {
      height: 40px;
      line-height: 40px;
      box-sizing: border-box;
    }
    .contact-content {
      height: calc(100% - 40px);
      overflow: hidden;
    }
    .concat-item {
      position: relative;
      display: inline-block;
      width: 48%;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
      .line {
        position: absolute;
        display: block;
        bottom: 1px;
        left: 25px;
        width: 60px;
        text-align: center;
      }
    }
  }
</style>
