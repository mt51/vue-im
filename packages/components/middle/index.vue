<template>
  <div class="middle-bar">
    <middle-header />
    <contacts v-show="currentTab === 'contact'" />
    <message-list v-show="currentTab === 'message'" />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import MiddleHeader from './middle-header/index.vue';
import MessageList from './messages/index.vue';
import Contacts from './contacts/index.vue';
import { useTabsInject } from '../../context';
import './index.scss';

export default defineComponent({
  name: 'middle',

  components: {
    [MiddleHeader.name]: MiddleHeader,
    [MessageList.name]: MessageList,
    [Contacts.name]: Contacts
  },

  setup() {
    const { currentTab } = useTabsInject();

    return {
      currentTab,
    }
  }
});
</script>