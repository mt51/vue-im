<template>
  <div class="message-list">
    <message-item v-for="item in messages" :key="item._id" :message="item" />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useMessageInject, useUserInject } from '../../../context';
import MessageItem from './message-item.vue';

export default defineComponent({
  name: 'message-list',

  components: {
    [MessageItem.name]: MessageItem
  },

  setup() {
    const { messages } = useMessageInject();

    return {
      messages,
    }
  }
});
</script>

<style lang="scss" >
  @import './index.scss';
</style>
