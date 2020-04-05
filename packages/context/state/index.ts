import { useTabsInject, useTabsProvider } from './tabs';
import { useChatBoxInject, useChatBoxProvider } from './chat-box';
import { useUserInject, useUserProvider, IUserInfo } from './user';
import { useContactsInject, useContactsProvider } from './contact';
import { useMessageInject, useMessageProvider } from './messages';

export {
  useContactsInject,
  useTabsInject,
  useChatBoxInject,
  useUserInject,
  useMessageInject
};

export {
  IUserInfo,
}

export function useProvider() {
  useContactsProvider();
  useTabsProvider();
  useUserProvider();
  useChatBoxProvider();
  useMessageProvider();
}
