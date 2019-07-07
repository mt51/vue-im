<template>
  <div class="im-contacts">
    <div class="contact-left">
      <div class="contact-tab">
        <ul class="contact-list">
          <li
            class="concat-item"
            :class="{ active: contactTab === 'friend' }"
            @click="handleContact('friend')"
          >
            <span>好友</span>
            <span class="line"></span>
          </li>
          <li
            class="concat-item"
            :class="{ active: contactTab === 'group' }"
            @click="handleContact('group')"
          >
            <span>群组</span>
            <span class="line"></span>
          </li>
          <li class="hover_line"></li>
        </ul>
      </div>
      <div class="contact-content">
        <GroupList
          :groups-list="groupsList"
          :lists="friendsList"
          v-show="contactTab === 'group'"
        />
        <FriendList
          :friends="friends"
          :store="store"
          v-show="contactTab === 'friend'"
        />
      </div>
    </div>
    <ContactCard
      :store="store"
      :contact="currentContact"
      :members-list="membersList"
    />
  </div>
</template>
<script>
import GroupList from '../GroupList/GroupList';
import FriendList from '../FriendList/FriendList';
import ContactCard from '../Contacts/ContactCard';
export default {
  name: 'Contacts',
  props: {
    membersList: Array,
    groupsList: {
      type: Array,
      default() {
        return [];
      }
    },
    friends: Array,
    store: Object
  },
  data() {
    return {
      contactTab: 'friend',
      currentContact: null
    };
  },
  methods: {
    handleContact(type) {
      this.contactTab = type;
    },
    handleCurrentConcatChange(contact) {
      this.currentContact = contact;
      if (contact.type === 'group') {
        this.$emit('on-view-members', contact);
      }
    },
    handleCreateNewGroup(data) {
      this.$emit('on-add-group', data);
    },
    handleOpenChatBox(contact) {
      delete contact.key;
      delete contact.label;
      this.store.commit('setCurrentChat', contact.id);
      this.store.commit('setCurrentTab', 'chat');
      this.store.commit('updateChatLog', contact);
    }
  },
  mounted() {
    console.log(this.friends);
  },
  components: {
    GroupList,
    FriendList,
    ContactCard
  },
  provide() {
    return {
      handleOpenChatBox: this.handleOpenChatBox,
      handleCurrentConcatChange: this.handleCurrentConcatChange
    };
  }
};
</script>
<style>
@import url('./index.pcss');
</style>
