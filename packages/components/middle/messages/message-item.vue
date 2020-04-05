<template>
  <div class="message-item" :class="`${isActive ? 'message-item__active' : ''}`" @click="handleClickMessages">
    <avatar
      size="small"
      :src="message.avatar"
    />
    <div class="message-wrapper">
      <div class="message-user__info">
        <p class="message-nickname">{{ message.name }}</p>
        <span class="message-send__time" v-if="lastMessage">{{ lastMessage.createTime | formatDate }}</span>
      </div>
      <p class="message-info" v-if="lastMessage">
        {{ lastMessage.content }}
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api';
import { useChatBoxInject } from '../../../context';
import dayjs from '../../../utils/date';
import Avatar from '../../avatar/index.vue';

export default defineComponent({
  name: 'message-item',

  components: {
    [Avatar.name]: Avatar
  },

  props: {
    message: {
      type: Object,
      default: null,
    }
  },

  setup(props) {
    const { activeChatBox, setActiveChatBox } = useChatBoxInject();
    const isActive = computed(() => activeChatBox && props.message && activeChatBox.value && activeChatBox.value._id === props.message._id);

    const lastMessage = computed(() => {
      const { messages } = props.message;
      if (messages.length > 0) {
        console.log(messages);
        return messages.slice(-1)[0];
      }
      return null;
    })

    function handleClickMessages() {
      setActiveChatBox(props.message)
    }

    return {
      activeChatBox,
      isActive,
      handleClickMessages,
      lastMessage
    }
  },

  filters: {
    formatDate(value) {
      return dayjs().from(dayjs(value))
    }
  }
});

</script>