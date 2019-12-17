<template>
  <div class="side-bar">
    <avatar size="large" :src="avatar" class="side-bar__avatar" />
    <app-list />
    <settings />
  </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api';
import Avatar from '../avatar/index.vue';
import AppList from './app-list.vue';
import Settings from './settings.vue';
import '../../vars/colors.scss';

export default createComponent({
  name: 'side-bar',
  components: {
    [Avatar.name]: Avatar,
    [AppList.name]: AppList,
    [Settings.name]: Settings
  },
  setup() {
    const avatar = ref('./assets/avatar.jpg');
    return {
      avatar
    };
  }
});
</script>
<style lang="scss" scoped>
// @import url('../../vars/colors.scss');
@import '../../vars/colors.scss';
$main-color: #48525c;

.side-bar {
  position: relative;
  width: 80px;
  background-color: $main-color;
  text-align: center;

  .side-bar__avatar {
    margin-top: 50px;
  }
}
</style>
