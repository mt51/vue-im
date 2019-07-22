<template>
  <img class="avatar" :src="avatar" />
</template>

<script>
import get from 'lodash/get';
export default {
  name: 'avatar',
  inject: ['mine'],
  computed: {
    avatar() {
      return get('mine', 'avatar', '');
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  display: block;
  float: left;
  margin: 5px 10px;
  width: 40px;
  height: 40px;
  padding: 3px;
  background: #fff;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
</style>
