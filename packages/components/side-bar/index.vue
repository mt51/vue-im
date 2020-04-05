<template>
  <div class="side-bar">
    <avatar
      :src="userInfo.avatar"
      size="large"
      class="side-bar__avatar"
    />
    <app-list />
    <settings />
  </div>
</template>

<script>
import { ref, defineComponent } from '@vue/composition-api';
import { useUserInject, IUserInfo } from '../../context';
import Avatar from '../avatar/index.vue';
import AppList from './app-list.vue';
import Settings from './settings.vue';

export default defineComponent({
  name: 'side-bar',
  components: {
    [Avatar.name]: Avatar,
    [AppList.name]: AppList,
    [Settings.name]: Settings,
  },
  setup() {
    const avatar = ref('./assets/avatar.jpg');
    const { userInfo } = useUserInject();    
    return {
      userInfo
    };
  },
});
</script>
<style lang="scss" >
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
