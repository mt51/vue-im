import { ref, provide, inject } from '@vue/composition-api';
import { tabType } from '../../types';

interface ICurrentContext {
  currentTab: tabType;
  setCurrentTab: (value: tabType) => void;
}

const currentTabSymbol = Symbol();

export function useTabsProvider() {
  const currentTab = ref<tabType>('message');
  const setCurrentTab = (value: tabType) => currentTab.value = value;

  provide(currentTabSymbol, {
    currentTab,
    setCurrentTab,
  })
}

export function useTabsInject(): ICurrentContext {
  const currentTabContext = inject<ICurrentContext>(currentTabSymbol);
  if (!currentTabContext) {
    throw new Error(`useTabsInject must be used after useTabsProvider`);
  }
  return currentTabContext;
}
