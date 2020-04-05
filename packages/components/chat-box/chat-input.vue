<template>
  <div class="chat-box-input">
    <chat-box-tools />
    <textarea
      class="input-textarea"
      placeholder="回车发送"
      :value="message"
      @input="handleTextareaOnInput"
      @keydown.enter="handleClickSend"
    />
  </div>
</template>

<script>
import { defineComponent, ref, PropType } from '@vue/composition-api';
import { useEventInject, useChatBoxInject } from '../../context';
import ChatBoxTools from './chat-box-tools.vue';

export default defineComponent({
  name: 'chat-input',
  components: {
    [ChatBoxTools.name]: ChatBoxTools,
  },

  setup(props, context){
    const message = ref('');

    const { handleSendEvent } = useEventInject();
    const { activeChatBox } = useChatBoxInject();

    function handleClickSend(event) {
      event.preventDefault();
      event.cancelBubble = true;
      event.stopPropagation();
      const { type, _id, } = activeChatBox.value;
      handleSendEvent({
        content: event.target.value,
        type: 'text',
        to: _id,
        chatType: type
      });
      message.value = '';
    }

    function handleTextareaOnInput(event) {
      message.value = event.target.value;
    }

    return {
      message,
      handleClickSend,
      handleTextareaOnInput
    };
  },
})

</script>