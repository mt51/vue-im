<template>
  <div class="chat-box-content">
    <chat-record-item v-for="item in chatRecord" :key="item._id" :message="item" />
  </div>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api';
import { useChatBoxInject } from '../../context';
import { dayjs } from '../../utils';
import ChatRecordItem from './chat-record-item.vue';

export default defineComponent({
  name: 'chat-box-content',

  components: {
    [ChatRecordItem.name]: ChatRecordItem
  },

  setup() {
    const { activeChatBox } = useChatBoxInject();

    const chatRecord = computed(() => activeChatBox.value ? activeChatBox.value.messages : [])
    return {
      activeChatBox,
      chatRecord
    }
  },

  filters: {
    formatDate(value) {
      return dayjs.fromNow(dayjs(value))
    }
  }
})

</script>
