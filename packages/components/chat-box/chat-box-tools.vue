<template>
  <div class="tools-list">
    <emoji v-show="currentTools === 'emojis'"/>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api';
import Emoji from './emoji.vue';

export default defineComponent({
  name: 'chat-box-tools',
  components: {
    [Emoji.name]: Emoji,
  },

  setup() {
    const currentTools = ref('');
    return {
      currentTools,
    }
  }
})

</script>
