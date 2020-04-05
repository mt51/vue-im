import { provide, inject, ref } from '@vue/composition-api';
import { FriendItem, GroupItem } from '../../types';


const chatBoxSymbol = Symbol();

type TActiveChatBox = FriendItem | GroupItem;

interface IChatBoxContext {
  activeChatBox: TActiveChatBox;
  setActiveChatBox: (value: TActiveChatBox) => void;
}

export function useChatBoxProvider() {
  const activeChatBox = ref<TActiveChatBox>(null);

  const setActiveChatBox = (value: TActiveChatBox) => activeChatBox.value = value;

  provide(chatBoxSymbol, {
    activeChatBox,
    setActiveChatBox
  })
}

export function useChatBoxInject() {
  const activeChatBoxContext = inject<IChatBoxContext>(chatBoxSymbol);

  if (!activeChatBoxContext) {
    throw new Error(`useChatBoxInject must be used after useChatBoxProvider`);
  }
  return activeChatBoxContext;
}
