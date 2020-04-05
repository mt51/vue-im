<template>
  <div class="contacts">
    <template v-if="contacts.length > 0">
      <contact-item
        v-for="(item, index) in contacts"
        :key="index"
        :contact="item"
        @activeChatBox="handleEvent"
      />
    </template>
    <p
      v-else
      class="groups-empty"
    >
      {{ emptyText }}
    </p>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api';
import ContactItem from './contact-item.vue';
import { useContactsInject } from '../../../context';

export default defineComponent({
  name: 'contacts',
  components: {
    [ContactItem.name]: ContactItem
  },
  setup() {
    function handleEvent(data) {
      console.log(data);
    }

    const emptyText = ref('暂无联系人');
    const { contacts } = useContactsInject();

    return {
      handleEvent,
      emptyText,
      contacts
    }
  }
});
</script>

<style lang="scss" >
@import './index.scss';
</style>