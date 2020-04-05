<template>
  <vue-im @send="handleSendMessage" />
</template>

<script>
import { computed, watch, ref } from '@vue/composition-api';
import { useProvider, useUserInject, useMessageInject, useContactsInject, MessageItem } from '../packages';
import sending from './utils/sending';
import useLogin from './hooks/useLogin';
import useGetLinkMessage from './hooks/useGetLinkMessage';
import { getAvatarUrl } from './utils';
export default {
  name: 'app',

  setup() {
    useProvider();
    const { setMessages } = useMessageInject();
    const { contacts } = useContactsInject();
    const messagesMap = ref({});

    watch([messagesMap, contacts], ([messagesMap, contacts]) => {
      const messagesList = [];
      Object.keys(messagesMap).forEach(key => {
        const message = messagesMap[key];
        const userInfo = contacts.find(item => item._id === key);
        messagesList.push({
          messages: message,
          ...userInfo,
        });
      });
      setMessages(messagesList);
    })

    useLogin().then(res => {
      const ids = res.contacts.map(item => item._id);
      useGetLinkMessage(ids).then(res => {
        Object.keys(res).forEach(key => {
          let messages = res[key];
          res[key] = messages.map(item => {
            const from = {
              ...item.from,
              avatar: getAvatarUrl(item.from.avatar),
              name: item.from.username,
            }

            return {
              ...item,
              from
            }
          })
        })
        messagesMap.value = res;
      })
    });

    function handleSendMessage(message) {
      console.log(message);
    }

    return  {
      handleSendMessage
    }
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
