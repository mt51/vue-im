<template>
  <div class="contact-card" v-if="contact">
    <div class="cc-container" :class="`cc-${contact.type}`">
      <button class="cc-send" title="发送消息" @click="handleOpenChatBox">
        <i class="fa fa-comment-o"></i>
      </button>
      <div class="cc-header">
        <template v-if="contact.type === 'friend'">
          <img class="cc-avatar" :src="contact.avatar" />
          <h4 class="cc-username">{{ contact.username }}</h4>
        </template>

        <h4 v-else>{{ contact.groupname }}</h4>
      </div>
      <div class="cc-content">
        <template v-if="contact.type === 'friend'">
          <dl class="cc-info">
            <dt>昵称：</dt>
            <dd>{{ contact.username }}</dd>
          </dl>
        </template>

        <template v-else>
          <h5 class="cc-info-title">成员：</h5>
          <ul class="cc-info gg-member-list">
            <li
              class="cc-info-item"
              v-for="(item, index) in membersList"
              :key="index"
              :title="item.username"
            >
              <img class="cc-avatar" :src="item.avatar" />
              <p class="cc-username">{{ item.username }}</p>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { deepCopy } from '../../util/utils';
export default {
  props: {
    contact: Object,
    membersList: Array
  },
  methods: {
    handleOpenChatBox() {
      const temp = deepCopy(this.contact);
      temp.username = temp.username || temp.groupname;
      this.$parent.handleOpenChatBox(temp);
    }
  }
};
</script>
<style>
@import url('./card.pcss');
</style>
