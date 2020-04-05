export declare interface Message {}

export declare interface RecordConfig {}

export declare interface FriendItem {}


export declare interface GroupItem {}

export declare interface ContactItem {
  type: 'friend' | 'groups';
  name: string;
  created: number;
  avatar: string;
  _id: string;
}

export declare interface MessageItem {
  type: 'text' | 'images' | 'file';
  content: string;
  from: ContactItem;
  to: string;
  _id: string;
}

export declare type tabType = 'contact' | 'message';
