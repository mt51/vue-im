export * from './sending';
export * from './socket';

export function getAvatarUrl(avatar: string) {
  return `http://cdn.liuziyang.top${avatar}`;
}