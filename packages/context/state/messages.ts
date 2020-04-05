import { provide, inject, ref } from '@vue/composition-api';

import { MessageItem } from '../../types'

const messageSymbol = Symbol();

interface MessagesContext {
  messages: MessageItem[];
  setMessages: (value: MessageItem[]) => void;
}

export function useMessageProvider() {
  const messages = ref<MessageItem[]>([]);
  const setMessages = (value: MessageItem[]) => messages.value = value;

  provide(messageSymbol, {
    messages,
    setMessages,
  });
}

export function useMessageInject(): MessagesContext {
  const messagesContext = inject<MessagesContext>(messageSymbol);

  if (!messagesContext) {
    throw new Error('useMessagesInject must be used after useMessagesProvider');
  }

  return messagesContext;
}
