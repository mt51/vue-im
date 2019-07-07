<template>
  <div class="emoji" v-show="emojiVisible">
    <i
      v-for="(item, i) in 56"
      :key="i"
      class="emoji-item"
      :class="'emoji' + item"
      @click="handleSendEmoji(item)"
    ></i>
  </div>
</template>
<script>
export default {
  name: 'emoji',
  data() {
    return {
      emojiVisible: false
    }
  },
  methods: {
    handleSendEmoji(index) {
      this.$parent.handleEmojiVisible(false)
      this.$parent.handleSendEmoji(index)
    }
  }
}
</script>
<style>
@import url('./index.pcss');
</style>
