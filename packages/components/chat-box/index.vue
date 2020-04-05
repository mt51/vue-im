<template>
  <div class="chat-box">
    <chat-box-header />
    <chat-box-content />
    <chat-input />
  </div>
</template>

<script>
import { defineComponent, watch } from '@vue/composition-api';
import { useChatBoxInject, useMessageInject } from '../../context';
import ChatBoxHeader from './chat-box-header.vue';
import ChatInput from './chat-input.vue';
import ChatBoxContent from './chat-box-content.vue';
import ChatBoxTools from './chat-box-tools.vue'
import './index.scss';

export default defineComponent({
  name: 'chat-box',

  props: {
    sendMessage: {
      type: Function,
    },
  },

  components: {
    [ChatBoxHeader.name]: ChatBoxHeader,
    [ChatInput.name]: ChatInput,
    [ChatBoxContent.name]: ChatBoxContent,
    [ChatInput.name]: ChatInput,
    [ChatBoxTools.name]: ChatBoxTools,
  },

  setup() {
    const { setActiveChatBox, activeChatBox } = useChatBoxInject();
    const { messages } = useMessageInject();

    if (!activeChatBox.value) {
      watch(messages, (messages) => {
        if (messages && messages.length > 0) {
          setActiveChatBox(messages[0]);
        }
      })
    }
  }
})

</script>
