<template>
  <div class="emoji" v-show="emojiVisible">
    <i v-for="item in 56" class="emoji-item" :class="'emoji' + item" @click="handleSendEmoji(item)"></i>
  </div>
</template>
<script>
  export default {
    name: 'emoji',
    data () {
      return {
        emojiVisible: false
      }
    },
    methods: {
      handleSendEmoji (index) {
        this.$parent.handleEmojiVisible(false)
        this.$parent.handleSendEmoji(index)
      }
    }
  }
</script>
<style lang="scss" scoped>
.emoji {
  position: absolute;
  top: -126%;
  left: -20%;
  width: 80%;
  height: 200px;
  overflow: auto;
  background: #fff;
  padding: 10px;
}
.emoji-item {
  display: inline-block;
  width: 26px;
  height: 26px;
  background-size: 30px!important;
  background-repeat: no-repeat;
  background-position: center;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c5c5c5;
    border-radius: 5px;
  }
}
@for $i from 0 through 55 {
  .emoji#{$i} { background-image: url(./emoji/#{$i}.png) }
}
</style>