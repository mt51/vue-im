<template>
  <div class="chat-record-item" :class="`${isMine ? 'chat-record-item__mine' : ''}`" v-if="message">
    <avatar
      :src="avatar"
      size="small"
      class="record-item__avatar"
    />
    <div class="">
        <p class="record-item__name">{{ name }}</p>
        <p class="record-item__text">{{ message.content }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api';
import { useUserInject } from '../../context';
import Avatar from '../avatar/index.vue';
export default defineComponent({
  name: 'chat-record-item',

  components: {
    [Avatar.name]: Avatar
  },

  props: {
    message: {
      type: Object,
    }
  },

  setup(props) {
    const { userInfo } = useUserInject();
    const avatar = props.message.from.avatar;
    const name = props.message.from.name;
    const isMine = computed(() => props.message.from._id === userInfo.value._id);
    return {
      avatar,
      isMine,
      name,
      userInfo
    }
  }
})

</script>