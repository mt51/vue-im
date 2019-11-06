<template>
  <div class="app-container">
    <side-bar />
    <middle />
    <chat-box />
  </div>
</template>

<script lang="ts">
import { createComponent, onMounted } from '@vue/composition-api';
import SideBar from './components/side-bar/index.vue';
import Middle from './components/middle/index.vue';
import ChatBox from './components/chat-box/index.vue';

export default createComponent({
  setup() {
    onMounted(() => {
      console.log('onMounted');
    });
  },

  components: {
    [SideBar.name]: SideBar,
    [Middle.name]: Middle,
    [ChatBox.name]: ChatBox
  }
});
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  // width: 100%;
  // min-width: 800px;
  // height: 100%;
  // min-height: 500px;
  width: 800px;
  height: 700px;
  margin: 20px auto;
}
</style>
