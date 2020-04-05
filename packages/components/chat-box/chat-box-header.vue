<template>
  <div class="chat-box-header">
    <h4
      v-if="activeChatBox"
      class="chat-box-header__nickname"
    >
      {{ activeChatBox.nickname || activeChatBox.name }}
    </h4>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import Avatar from '../avatar/index.vue';
import { useChatBoxInject } from '../../context';
export default defineComponent({
  name: 'chat-box-header',

  components: {
    [Avatar.name]: Avatar
  },

  setup() {
    const { activeChatBox } = useChatBoxInject();
    return {
      activeChatBox
    }
  },
})

</script>
