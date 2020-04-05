import { sending, getAvatarUrl } from '../utils';
import { useUserInject, useContactsInject, ContactItem } from '../../packages';


const token = window.localStorage.getItem('im_token');
const defaultLoginParams = {
  os: 'mac os',
  browser: 'chrome',
  environment: ''
}

const defaultUserInfo = {
  username: '2',
  password: '2'
}

export default function() {
  const { setUserInfo } = useUserInject();
  const { setContacts } = useContactsInject();
  if (!token) {
    return sending('login', {...defaultLoginParams, ...defaultUserInfo}).then(res => {
      const { token, friends = [], groups = [] } = res;
      console.log('friends:::', friends);
      window.localStorage.setItem('im_token', token);
      const userInfo = {
        ...res,
        avatar: getAvatarUrl(res.avatar),
      }

      const contacts: ContactItem[] = groups.concat(friends).map((item: any) => ({
        ...item,
        avatar: getAvatarUrl(item.avatar),
      }))

      setContacts(contacts);
      setUserInfo(userInfo);
      return {
        userInfo,
        contacts
      }
    });
  } else {
    return sending('loginByToken', {
      ...defaultLoginParams,
      token
    }).then(res => {
      const { friends, groups } = res;
      const userInfo = {
        ...res,
        avatar: getAvatarUrl(res.avatar),
      }

      const contacts = [
        ...groups.map((item: any) => ({
          ...item, type: 'group',
        avatar: getAvatarUrl(item.avatar)
      })),
        ...friends.map((item: any) => ({
          ...item,
          type: 'friend',
          avatar: getAvatarUrl(item.to.avatar),
          name: item.to.username
      }))
      ]

      setContacts(contacts);
      setUserInfo(userInfo);
      return {
        userInfo,
        contacts
      }
    });
  }
}