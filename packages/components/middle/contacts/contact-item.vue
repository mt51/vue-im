<template>
  <div class="contact-item" onClick="toggleActiveChatBox" v-if="contact">
    <avatar :src="contact.avatar" size="mini" />
    <span class="nickname">{{ contact.name }}</span>
  </div>
</template>

<script>
import { defineComponent, computed, SetupContext } from '@vue/composition-api';
import Avatar from '../../avatar/index.vue';
import { useChatBoxInject } from '../../../context';

export default {
  name: 'contact-item',

  components: {
    [Avatar.name]: Avatar
  },

  props: {
    contact: Object,
    type: {
      type: String,
      default: '',
    },
    activeChatBox: {
      type: Function
    }
  },

  setup(props, context) {
    const { setActiveChatBox } = useChatBoxInject();

    function toggleActiveChatBox() {
      setActiveChatBox(props.contact);
    }

    return {
      toggleActiveChatBox,
    }
  },
};

</script>
