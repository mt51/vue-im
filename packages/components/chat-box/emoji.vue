<template>
  <div class="emoji-wrapper">
    <p onClick="{this.toggleVisible}">
      表情
    </p>
    <div
      class="emoji-list"
    >
      <img
        class="emoji"
        v-for="(emoji) in emojiList"
        :key="emoji"
        :src="emoji | formatEmojiSrc"
      >
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from '@vue/composition-api';

const emojiList = [
  'angry',
  'anguished',
  'astonished',
  'blush',
  'bowtie',
  'cold_sweat',
  'confounded',
  'confused',
  'disappointed',
  'dizzy_face',
  'expressionless',
  'fearful',
  'flushed',
  'frowning',
  'grimacing',
  'grin',
  'grinning',
  'heart_eyes',
  'hushed',
  'innocent',
  'joy',
  'kissing',
  'kissing_closed_eyes',
  'kissing_heart',
  'kissing_smiling_eyes',
  'laughing',
  'mask',
  'neutral_face',
  'no_mouth',
  'open_mouth',
  'pensive',
  'persevere',
  'rage',
  'relaxed',
  'relieved',
  'satisfied',
  'scream',
  'sleeping',
  'sleepy',
  'smile',
  'smiley',
  'smiling_imp',
  'smirk',
  'stuck_out_tongue',
  'stuck_out_tongue_closed_eyes',
  'stuck_out_tongue_winking_eye',
  'sunglasses',
  'sweat',
  'tired_face',
  'triumph',
  'unamused',
  'weary',
  'wink',
  'worried',
  'yum' ]

export default defineComponent({
  name: 'emoji',
  setup() {
    const visible = ref(false);

    function toggleVisible() {
      visible.value = !visible.value;
    }

    function handleSendEmoji(emoji) {
      console.log(emoji);
    }

    return {
      visible,
      toggleVisible,
      handleSendEmoji,
      emojiList,
    }
  },

  filters: {
    formatEmojiSrc(emoji) {
      return `http://cdn.liuziyang.top/${emoji}.png`;
    }
  }
});
</script>
