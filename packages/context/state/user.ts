import { provide, inject, ref } from '@vue/composition-api';

export declare interface IUserInfo {
  id: string;
  username: string; // {string} 用户名
  avatar: string; // {string} 头像
  groups: any[]; // {[Group]} 群组列表
  friends: any[]; // {[User]} 好友列表
  isAdmin: boolean; // {boolean} 是否为管理员
}

interface IUserContext {
  userInfo: IUserInfo;
  setUserInfo: (value: IUserInfo) => void;
}

const userSymbol = Symbol();

export function useUserProvider() {
  const userInfo = ref<IUserInfo>({});

  const setUserInfo = (value: IUserInfo) => userInfo.value = value;

  provide(userSymbol, {
    userInfo,
    setUserInfo,
  });
}

export function useUserInject() :IUserContext {
  const userContext = inject<IUserContext>(userSymbol);

  if (!userContext) {
    throw new Error(`useUserInject must be used after useUserProvider`);
  }
  return userContext;
}
