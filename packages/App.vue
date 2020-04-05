<template>
  <div class="vue-im-container">
    <side-bar />
    <middle />
    <chat-box />
  </div>
</template>
<script>
import { useContactsInject, useGroupsInject, useProvider, useChatBoxInject, useEventProvider } from './context';
import { noop } from './utils';
import SideBar from './components/side-bar/index.vue';
import Middle from './components/middle/index.vue';
import ChatBox from './components/chat-box/index.vue';
import './index.scss';

export default {
  name: 'vue-im',

  components: {
    [SideBar.name]: SideBar,
    [Middle.name]: Middle,
    [ChatBox.name]: ChatBox,
  },

  props: {
    send: {
      type: Function,
      default: noop
    },
  },

  setup(props, context) {
    const { contacts } = useContactsInject();
    useEventProvider(props, context);
    const { setActiveChatBox, activeChatBox } = useChatBoxInject();

    return {
      contacts,
    };
  },
}

</script>
