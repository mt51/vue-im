<template>
  <img src="../../assets/avatar/0.jpg" class="user-avatar" :class="sizeType" />
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api';

export default createComponent({
  name: 'avatar',
  props: {
    src: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'default'
    }
  },

  setup(props) {
    const sizeType = computed(() => {
      return props.size ? `user-avatar__${props.size}` : '';
    });
    return {
      sizeType
    };
  }
});
</script>

<style lang="scss" scoped>
.user-avatar {
  display: inline-block;
  border-radius: 50%;
}

.user-avatar__large {
  width: 60px;
  height: 60px;
}

.user-avatar__default {
  width: 48px;
  height: 48px;
}

.user-avatar__small {
  width: 40px;
  height: 40px;
}

.user-avatar__mini {
  width: 32px;
  height: 32px;
}
</style>
